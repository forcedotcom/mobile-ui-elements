(function($, SFDC) {

    var SObjectInfoManager = (function() {
        var sobjectTypes = {};
        var sobjectViewHelpers = {};

        return {
            getViewHelper: function(sobjectName) {
                sobjectName = sobjectName.toLowerCase();
                var helper = sobjectViewHelpers[sobjectName];

                if (!helper) {
                    helper = new SObjectViewHelper(sobjectName);
                    sobjectViewHelpers[sobjectName] = helper;
                }
                return helper;
            },
            getSObjectType: function(sobjectName) {
                sobjectName = sobjectName.toLowerCase();
                var typeInfo = sobjectTypes[sobjectName];

                if (!typeInfo) {
                    typeInfo = new Force.SObjectType(sobjectName);
                    sobjectTypes[sobjectName] = typeInfo;
                }
                return typeInfo;
            }
        };
    })();

    var SObjectViewHelper = function(type) {
        this.sobjectType = SObjectInfoManager.getSObjectType(type);
        this.initialize();
    }

    _.extend(SObjectViewHelper.prototype, {

        initialize: function() {
            this._detailTemplates = {};
            this._editTemplates = {};
        },

        getLayoutTemplate: function(recordTypeId, type) {
            var templateInfoMap = (type == 'edit') ? this._editTemplates :
                              this._detailTemplates;

            var parse = function(layoutInfo) {
                var sections = (type == 'edit') ? layoutInfo.editLayoutSections :
                               layoutInfo.detailLayoutSections;
                return compileLayout(sections);
            }

            return $.when(templateInfoMap[recordTypeId] ||
                        this.sobjectType.describeLayout(recordTypeId)
                       .then(parse)
                       .then(function(templateInfo) {
                            templateInfoMap[recordTypeId] = templateInfo;
                            return templateInfo;
                       })
                    );
        },

        getDetailTemplate: function(recordTypeId) {
            return this.getLayoutTemplate(recordTypeId, 'detail');
        },

        getEditTemplate: function(recordTypeId) {
            return this.getLayoutTemplate(recordTypeId, 'edit');
        },

        reset: function() {
            this.sobjectType.reset();
            this.initialize();
        }
    });

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
        setupProps(_.keys(model.attributes));
    }

    // FIXME: Need to handle the case where multiple calls to prepareLayout happen and then have to kill older async processes.
    function prepareLayout(view) {

        var fetchTemplateInfo = function(recordTypeId) {
            // Fetch the layout template info using the Sobject View Helper
            var viewHelper = SObjectInfoManager.getViewHelper(view.sobject);
            var templateInfoPromise = (view.foredit) ? viewHelper.getEditTemplate(recordTypeId)
                                        : viewHelper.getDetailTemplate(recordTypeId);

            templateInfoPromise.then(function(templateInfo) {
                // Check if the current view's monitor has been replaced by another promise.
                // If no, continue to resolve. Else reject the old deferred.
                /*if (_self._statusMonitor === statusDeferred.promise())
                    statusDeferred.resolve(templateInfo);
                else statusDeferred.reject();*/
                // Render the layout and set the model
                //TODO: Otimize this. We shouldn't need to always re-create instance and models

                // Perform data fetch for the fieldlist used in template
                view.model.fetch({ fieldlist: templateInfo.fields });

                // Attach the template instance to the view
                var template = templateInfo.template;
                var templateModel = new SObjectViewModel(view.model, templateInfo.fieldInfos);
                $(view.$.viewContainer).empty().append(template.createInstance(templateModel));
                //setTimeout(function() { _self.trigger('afterRender'); }, 0);
            });
        }

        // Check if default layout is overriden. Don't do anything if yes.
        if (!isLayoutOverriden(view) && view.sobject) {
            // Fetch the layout
            if (view.hasrecordtypes) {
                // If record type id is provided then use that.
                if (view.recordtypeid) {
                    fetchTemplateInfo(view.recordtypeid);
                }
                // If record type id not available but the recordid is, then get the recordtype info from sfdc
                else if (view.recordid) {
                    // Fetch the record's recordtypeid
                    view.model.fetch({ fieldlist: ['recordTypeId'] });
                    // Once we get the recordtypeid, fetch the layout
                    view.model.once('change:recordTypeId', function() {
                        // Async step 1
                        // Only do layout fetch if view's model hasn't changed since event was attached
                        if (this == view.model) fetchTemplateInfo(view.model.get('recordTypeId'));
                    });
                }
            }
            // If record types are not present, then fetch layout for default recordtype
            else {
                fetchTemplateInfo('012000000000000AAA');
            }
        }
    }

    function isLayoutOverriden(elem) {
        var shadowRoot = elem.shadowRoot;
        while (shadowRoot.olderShadowRoot) {
            if (shadowRoot.olderShadowRoot.olderShadowRoot)
                shadowRoot = shadowRoot.olderShadowRoot;
            else break;
        }
        return shadowRoot.querySelector('shadow') != null;
    }

    Polymer('force-ui-detail', {
        foredit: false,
        recordtypeid: null,
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        ready: function() {
            this.super();
            this.render();
        },
        render: function() {
            var that = this;
            SFDC.launcher.done(function() { prepareLayout(that); });
        },
        attributeChanged: function(attrName, oldVal, newVal) {
            this.super(arguments);
            this.async(this.render);
        }
    });

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
    var compileLayoutForFields = function(fields, fieldSet, fieldInfoMap) {
        var row = {layoutItems: [], columns: 2},
            column = 1, item,
            section = {heading: '', layoutRows:[]};

        modArray(fields).forEach(function(field) {
            item = {placeholder:"false", editable: "true", label: fieldInfoMap[field].label, layoutComponents: {type: 'Field', value: field}};
            row.layoutItems.push(item);

            if (column++ == 2) {
                section.layoutRows.push(row);
                row = {layoutItems: [], columns: 2};
                column = 1;
            }
        });
        if (row.layoutItems.length) section.layoutRows.push(row);

        return compileLayout({detailLayoutSections: section, editLayoutSections: section}, fieldSet, fieldInfoMap);
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
    var compileLayout = function(layoutSections) {

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
                    html += '{{' + displayField + '}}';
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

            console.log ('layout section template: ' + html);
        });

        // Templatize the markup
        return {
            template: createTemplateFromMarkup(html),
            fields: _.keys(layoutFieldsInfoMap),
            fieldInfos: layoutFieldsInfoMap
        };
    }

})(jQuery, window.SFDC);