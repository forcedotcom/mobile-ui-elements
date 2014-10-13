(function($, SFDC, Path) {

    Polymer('force-ui-detail', {
        foredit: false,
        fieldlist: null,
        fieldlabels: null,
        observe: {
            foredit: "renewTemplate",
            fieldlist: "renewTemplate",
            fieldlabels: "renewTemplate",
            "$.sobject_layout.layout": "renewTemplate",
            "$.force_sobject._model": "renderModel"
        },
        renewTemplate: function() {
            // Clean up older templates
            if (this._templateInfo) {
                this._templateInfo.template.remove();    
                $(this.$.viewContainer).empty();
                this._templateInfo = null;
            }
            // Generate new templates and update view
            SFDC.launcher.then(generateViewTemplate.bind(this))
            .then(function(templateInfo) {
                // TemplateInfo may be null if no layout info has been fetched yet.
                if (templateInfo) {
                    this._templateInfo = templateInfo;
                    // Attach template to the DOM
                    this.$.viewContainer.appendChild(templateInfo.template);
                    // Render model and template
                    this.renderModel();
                }
            }.bind(this));
        },
        renderModel: function() {
            // Template Info may not generated yet
            if (this._templateInfo) this.async(updateViewModel);
        },
        compileTemplate: function(layoutSections) {
            return compileTemplateForLayout(layoutSections);
        },
        get model() {
            return this.$ ? this.$.force_sobject._model : null;
        }
    });

    // Returns whether the current view has an overriden layout.
    // i.e. if someone extends the force-ui-detail but doesn't include the shadow tag.
    var isLayoutOverriden = function(elem) {
        var shadowRoot = elem.shadowRoot;
        while (shadowRoot.olderShadowRoot) {
            if (shadowRoot.olderShadowRoot.olderShadowRoot)
                shadowRoot = shadowRoot.olderShadowRoot;
            else break;
        }
        return elem.shadowRoot.olderShadowRoot && shadowRoot.querySelector('shadow') == null;
    }

    var describeField = function(sobject, fieldname) {
        var sobjectType = SFDC.getSObjectType(sobject);
        // split the field path to get the base reference. eg. for field Owner.Name
        var fieldPathParts = Path.get(fieldname);

        var fieldPicker = function(describeInfo) {
            var fieldInfos = describeInfo.fields;
            // if relationship path, i.e. more than 1 parts after split
            if (fieldPathParts.length > 1) {
                // Find the corresponding relationship field.
                var propFilter = {relationshipName: fieldPathParts[0]};
                var referenceField = _.findWhere(fieldInfos, propFilter);
                // If the referenceField is found, then get the field info for rest of the path
                if (referenceField) {
                    return describeField(referenceField.referenceTo[0],
                        fieldPathParts.slice(1).join('.'));
                }
            } else {
                var propFilter = {name: fieldPathParts[0]};
                return _.findWhere(fieldInfos, propFilter);
            }
        }

        return sobjectType.describe().then(fieldPicker);
    }

    // Given the sobject name and fieldlist, it fetches the field infos for each field.
    // Returns a promise, which on resolution returns a map of fieldnames as keys and the respective field info as value.
    var fetchFieldInfos = function(sobject, fields) {
        var sobjectType = SFDC.getSObjectType(sobject);
        var fieldInfos = {};
        var infoStatus = $.Deferred();
        var describeTracker = [];

        fields.forEach(function(fieldPath) {
            var fieldDescribeStatus = describeField(sobject, fieldPath)
                .then(function(fieldInfo) {
                    if (fieldInfo) fieldInfos[fieldPath] = fieldInfo;
                });
            // Capture the promise in an array to track status
            describeTracker.push(fieldDescribeStatus);
        });
        // When all field describe promises are done, then resolve the infoStatus promise with field infos.
        // This also handles FLS cases where the end user may not be able to see field info on a field.
        $.when.apply($, describeTracker).then(function() {
            infoStatus.resolve(fieldInfos);
        });

        return infoStatus.promise();
    }

    // Returns a promise, which on resolution returns an object with template information for rendering the view.
    // FIXME: Need to handle the case where multiple calls to prepareLayout happen and then have to kill older async processes.
    var generateViewTemplate = function() {

        var view = this;

        // Check if default layout is overriden. Don't do anything if yes.
        if (!isLayoutOverriden(view) && view.sobject) {
            if (view.fieldlist && typeof view.fieldlist === 'string' && view.fieldlist.trim().length) {
                // Parse the labels and generate fieldname to fieldlabel mapping.
                var fieldLabelMap = {};
                var fieldsArray = view.fieldlist.trim().split(/\s+/);
                var fieldLabelsArray = typeof view.fieldlabels === 'string'
                                    ? view.fieldlabels.trim().split(',') : [];
                for (var idx in fieldsArray) {
                    var label = fieldLabelsArray[idx];
                    if (label) fieldLabelMap[fieldsArray[idx]] = label.trim();
                }

                // Fetch field infos and then generate template
                return fetchFieldInfos(view.sobject, fieldsArray)
                    .then(function(fieldInfos) {
                        return view.compileTemplate(compileTemplateForFields(fieldInfos, fieldLabelMap, view.foredit));
                    });
            } else if (view.$.sobject_layout.layout) {
                // Return a promise to keep the return type consistent
                return $.when(view.compileTemplate(
                    view.foredit ? view.$.sobject_layout.layout.editLayoutSections
                                 : view.$.sobject_layout.layout.detailLayoutSections
                ));
            }
        }
    }

    var updateViewModel = function() {
            
        var attachModel = function() {
            //Attach the template to the current view model
            this._templateInfo.template.model = this.viewModel;
        }

        // Fetch only if the current view model is not for same recordid
        if (!this.viewModel || !this.viewModel.Id || this.viewModel.Id != this.recordid) {
            // Update the instance of current view model
            this.viewModel = new SObjectViewModel(this.model, this._templateInfo.fieldInfos);

            if (this.recordid) {
                // Perform data fetch for the fieldlist used in template
                this.$.force_sobject.fetch({
                    fieldlist: this._templateInfo.fields,
                    cacheMode: this.fetchCacheMode,
                    success: attachModel.bind(this)
                });
            } else attachModel.apply(this);
        }
    }

    var SObjectViewModel = function(model, fieldInfos) {
        var _self = this;

        var dateTimeToString = function(type, value) {
            if (type == 'date') value = new Date(value).toDateString();
            else if (type == 'datetime' && value) {
                var a = value.split(/[^0-9]/);
                value = new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5]).toLocaleString();
            }
            return value;
        }

        var setupProps = function(props) {
            props.forEach(function(prop) {
                Object.defineProperty(_self, prop, {
                    get: function() {
                        var fieldInfo = fieldInfos[prop];
                        var value = model.get(prop);

                        if (fieldInfo && fieldInfo.type)
                            return dateTimeToString(fieldInfo.type, value);
                        else return value;
                    },
                    set: function(val) {
                        var fieldInfo = fieldInfos[prop];

                        if (fieldInfo && fieldInfo.type && fieldInfo.type == 'base64') {
                            var reader  = new FileReader();
                            reader.onloadend = function () {
                                model.set(prop, reader.result);
                            }
                            if (file) reader.readAsDataURL(file);
                        }
                        else model.set(prop, val);
                    },
                    enumerable: true
                });
            });
        }
        model.on('change', function() {
            setupProps(_.difference(_.keys(model.attributes), _.keys(_self)));
        });
        // review all fields to pick the first part of the reference fields. eg. for "Owner.Name" pick "Owner"
        var attributes = _.map(_.keys(fieldInfos),
            function(prop) {
                return prop.split('.')[0];
            });
        setupProps(attributes);
    }

    //------------------------- INTERNAL METHODS -------------------------
    var getTemplateFor = function(template){
        if (template) {
            if (_.isString(template)) return document.getElementById(template);
            else if (template instanceof HTMLTemplateElement) return template;
        }
    }

    // Utility method to ensure that input object is an array.
    // If not, wraps the input object into array.
    var modArray = function(obj) {
        if (!(obj instanceof Array))
            if (obj) return [obj];
            else return [];
        else return obj;
    }

    var createTemplateFromMarkup = function (markup, bindingDelegate) {
        // Templatize the markup
        var helperTemplate = document.createElement('template');
        helperTemplate.setAttribute('bind', '')
        helperTemplate.innerHTML = markup;

        HTMLTemplateElement.decorate(helperTemplate);
        if (bindingDelegate) helperTemplate.bindingDelegate = bindingDelegate;

        return helperTemplate;
    }

    //--------------------- DEFAULT TEMPLATES & GENERATION ------------------------

    // Generates layout template for specific fields. Used by the DetailController.
    // TBD: Support the parent look up fields
    var compileTemplateForFields = function(fieldInfoMap, fieldLabelMap, foredit) {
        var row = {layoutItems: [], columns: 2},
            column = 1, item,
            section = {heading: '', columns: 2, layoutRows:[]};

        _.keys(fieldInfoMap).forEach(function(field) {
            item = {
                placeholder: false,
                editable: foredit,
                label: fieldLabelMap[field] || fieldInfoMap[field].label,
                layoutComponents: {
                    type: 'Field',
                    value: field,
                    details: fieldInfoMap[field]
                }
            };
            row.layoutItems.push(item);

            if (column++ == 2) {
                section.layoutRows.push(row);
                row = {layoutItems: [], columns: 2};
                column = 1;
            }
        });
        if (row.layoutItems.length) section.layoutRows.push(row);

        return [section];
    }

    // Generates handlebar template for a layout object, which is returned by describeLayout api call.
    /* Sample template HTML:
        ```html
        <div class="sf-layout-section">
            <h1 class="sf-layout-section-heading">{{Section Heading}}</h1>
            <div class="sf-layout-row">
                <div class="sf-layout-item">
                    <div class="sf-layout-item-label">{{Item Label}}</div>
                    {{#if forEdit}}<div class="sf-layout-item-error">{{Save Error for related fields}}</div>{{/if}}
                    ...
                    <div class="sf-layout-item-value">
                        <span class="{{field type}}" data-field-name="{{field Name}}">
                            {{#if not forEdit}}{{fieldValue}}{{/if}}
                            {{#if forEdit}}{{view Ember.InputView valueBinding="fieldValue"}}{{/if}}
                        </span>
                        ...
                    </div>
                </div>
                ...
            </div>
            ...
        </div>
        ...
        ```
    */
    //TBD: Allow way to hide empty values
    //TBD: Allow way to show selective field types
    var compileTemplateForLayout = function(layoutSections) {

        // Utility method to return input element type for a corresponding salesforce field type.
        var inputType = function(fieldType) {
            switch(fieldType) {
                 case "int": return "number";
                 case "double": return "number";
                 case "percent": return "number";
                 case "phone": return "tel";
                 case "date": return "date";
                 case "datetime": return "datetime";
                 case "time": return "time";
                 case "url": return "url";
                 case "email": return "email";
                 case "base64": return "file";
                 default: return "text";
            }
        }

        // Generates and returns a Handlebar template for a specific field.
        // If forEdit is true and if field is editable, method returns an input type element.
        var generateFieldTemplate = function(fieldName, fieldInfo, displayField, forEdit) {
            var fieldType = fieldInfo.type,
                html = '<span class="' + fieldType + '" data-field-name="' + fieldName + '">';

            if (forEdit) {
                if (fieldType == 'boolean')
                    html += ('<input type="checkbox" checked="{{' + displayField + '}}"/>');
                else if (fieldType == 'picklist') {
                    html += '<select value="{{' + displayField + '}}">';
                    fieldInfo.picklistValues.forEach(function(option){
                        html += ('<option value="' + option.value + '">' + option.label + '</option>');
                    })
                    html += '</select>';
                } else if (fieldType == 'textarea')
                    html += ('<input type="textarea" value="{{' + displayField + '}}"/>');
                else
                    html += ('<input value="{{' + displayField + '}}" type="' + inputType(fieldType) + '" maxlength="' + fieldInfo.length + '"/>');
            }
            else {
                if (fieldType == 'boolean')
                    html += ('<input type="checkbox" checked="{{' + displayField + '}}" disabled="true"/>');
                else if (fieldInfo.htmlFormatted) //TBD: See if we need to do anything for HTML type fields in polymer.
                    html += '<force-html-output value="{{' + displayField + '}}"></force-html-output>';
                else html += ('{{' + displayField + '}}');
            }
            return html + '</span>';
        }

        // Generates and returns the handlebar template for the layout sections.
        var html = '';
        var layoutFieldsInfoMap = {};

        layoutSections.forEach(function(section, sectionIndex) {
            html += '<div class="sf-layout-section">';
            html += ('<h1 class="sf-layout-section-heading">' + section.heading + '</h1>');
            // Iterate over layout rows in each section
            modArray(section.layoutRows).forEach(function(row) {
                html += '<div class="sf-layout-row ui-responsive">';
                // Iterate over layout items in each row
                modArray(row.layoutItems).forEach(function(item) {
                    html += '<div class="sf-layout-item' + ((+section.columns > 1) ? ' ui-block' : '') + '">';
                    if (!item.placeholder) {
                        html += ('<div class="sf-layout-item-label">' + item.label + '</div>');
                        var errorHtml = '';
                        var valueHtml = '<div class="sf-layout-item-value">';
                        // Iterate over layout item component in each item
                        modArray(item.layoutComponents).forEach(function(comp) {
                            var isFieldEditable = false;
                            if (comp.type == 'Separator') valueHtml += comp.value;
                            else if (comp.type == 'Field' && !/__XyzEncoded__s$/.test(comp.value)) { // Add a special case to ingnore weird geo location field which adds internal field to layout (*__XyzEncoded__s)
                                var displayField = comp.value; // Default display field as the field of component
                                var fieldInfo = comp.details; // Fetch the field info to check if it's a relationship
                                layoutFieldsInfoMap[comp.value] = fieldInfo; // Track the field required for this layout
                                if (fieldInfo.type == 'reference') {
                                    displayField = fieldInfo.relationshipName;
                                    displayField += (fieldInfo.referenceTo == 'Case' ? '.CaseNumber' : '.Name');
                                    layoutFieldsInfoMap[displayField] = fieldInfo;
                                }
                                // check if field is editable based on the field type information and the layout settings. Also ignore refrence type fields as we don't currently support the edit for that.
                                isFieldEditable = (item.editable && fieldInfo.type != 'reference' && fieldInfo.updateable);
                                valueHtml += generateFieldTemplate(comp.value, fieldInfo, displayField, isFieldEditable);
                                if (isFieldEditable) errorHtml += '<div class="sf-layout-item-error">{{__errors__.' + comp.value + '}}</div>';
                            }
                        });
                        html += (errorHtml + valueHtml + '</div>');
                    }
                    html += '</div>';
                });
                html += '</div>';
            });
            html += '</div>';
        });

        // Templatize the markup
        return {
            template: createTemplateFromMarkup(html),
            fields: _.keys(layoutFieldsInfoMap),
            fieldInfos: layoutFieldsInfoMap
        };
    }

})(jQuery, window.SFDC, window.Path);
