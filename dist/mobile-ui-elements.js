

  // upgrade polymer-body last so that it can contain other imported elements
  document.addEventListener('polymer-ready', function() {
    
    Polymer('polymer-body', Platform.mixin({

      created: function() {
        this.template = document.createElement('template');
        var body = wrap(document).body;
        var c$ = body.childNodes.array();
        for (var i=0, c; (c=c$[i]); i++) {
          if (c.localName !== 'script') {
            this.template.content.appendChild(c);
          }
        }
        // snarf up user defined model
        window.model = this;
      },

      parseDeclaration: function(elementElement) {
        this.lightFromTemplate(this.template);
      }

    }, window.model));

  });

  ;
/**
 * @license
 * Copyright (c) 2012-2014 The Polymer Authors. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 * 
 *    * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *    * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// @version: 0.2.1
Polymer={},"function"==typeof window.Polymer&&(Polymer={}),function(a){function b(a,b){return a&&b&&Object.getOwnPropertyNames(b).forEach(function(c){var d=Object.getOwnPropertyDescriptor(b,c);d&&(Object.defineProperty(a,c,d),"function"==typeof d.value&&(d.value.nom=c))}),a}a.extend=b}(Polymer),function(a){function b(a,b,d){return a?a.stop():a=new c(this),a.go(b,d),a}var c=function(a){this.context=a,this.boundComplete=this.complete.bind(this)};c.prototype={go:function(a,b){this.callback=a;var c;b?(c=setTimeout(this.boundComplete,b),this.handle=function(){clearTimeout(c)}):(c=requestAnimationFrame(this.boundComplete),this.handle=function(){cancelAnimationFrame(c)})},stop:function(){this.handle&&(this.handle(),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},a.job=b}(Polymer),function(){var a={};HTMLElement.register=function(b,c){a[b]=c},HTMLElement.getPrototypeForTag=function(b){var c=b?a[b]:HTMLElement.prototype;return c||Object.getPrototypeOf(document.createElement(b))};var b=Event.prototype.stopPropagation;Event.prototype.stopPropagation=function(){this.cancelBubble=!0,b.apply(this,arguments)}}(Polymer),function(a){function b(a){var c=b.caller,g=c.nom,h=c._super;if(h||(g||(g=c.nom=e.call(this,c)),g||console.warn("called super() on a method not installed declaratively (has no .nom property)"),h=d(c,g,f(this))),h){var i=h[g];return i._super||d(i,g,h),i.apply(this,a||[])}}function c(a,b,c){for(;a;){if(a[b]!==c&&a[b])return a;a=f(a)}}function d(a,b,d){return a._super=c(d,b,a),a._super&&(a._super[b].nom=b),a._super}function e(a){for(var b=this.__proto__;b&&b!==HTMLElement.prototype;){for(var c,d=Object.getOwnPropertyNames(b),e=0,f=d.length;f>e&&(c=d[e]);e++){var g=Object.getOwnPropertyDescriptor(b,c);if("function"==typeof g.value&&g.value===a)return c}b=b.__proto__}}function f(a){return a.__proto__}a.super=b}(Polymer),function(a){function b(a,b){var d=typeof b;return b instanceof Date&&(d="date"),c[d](a,b)}var c={string:function(a){return a},date:function(a){return new Date(Date.parse(a)||Date.now())},"boolean":function(a){return""===a?!0:"false"===a?!1:!!a},number:function(a){var b=parseFloat(a);return 0===b&&(b=parseInt(a)),isNaN(b)?a:b},object:function(a,b){if(null===b)return a;try{return JSON.parse(a.replace(/'/g,'"'))}catch(c){return a}},"function":function(a,b){return b}};a.deserializeValue=b}(Polymer),function(a){var b=a.extend,c={};c.declaration={},c.instance={},c.publish=function(a,c){for(var d in a)b(c,a[d])},a.api=c}(Polymer),function(a){var b={async:function(a,b,c){Platform.flush(),b=b&&b.length?b:[b];var d=function(){(this[a]||a).apply(this,b)}.bind(this),e=c?setTimeout(d,c):requestAnimationFrame(d);return c?e:1/e},cancelAsync:function(a){1>a?cancelAnimationFrame(Math.round(1/a)):clearTimeout(a)},fire:function(a,b,c,d,e){var f=c||this,b=b||{},g=new CustomEvent(a,{bubbles:void 0!==d?d:!0,cancelable:void 0!==e?e:!0,detail:b});return f.dispatchEvent(g),g},asyncFire:function(){this.async("fire",arguments)},classFollows:function(a,b,c){b&&b.classList.remove(c),a&&a.classList.add(c)}},c=function(){},d={};b.asyncMethod=b.async,a.api.instance.utils=b,a.nop=c,a.nob=d}(Polymer),function(a){var b=window.logFlags||{},c="on-",d={EVENT_PREFIX:c,addHostListeners:function(){var a=this.eventDelegates;b.events&&Object.keys(a).length>0&&console.log("[%s] addHostListeners:",this.localName,a);var d,e,f=this;for(var g in a)e=c+g,(d=PolymerExpressions.prepareEventBinding(Path.get(a[g]),e,{resolveEventHandler:function(a,b){var c=b.getValueFrom(f);return c?c.bind(f):void 0}}))(this,this,!1)},dispatchMethod:function(a,c,d){if(a){b.events&&console.group("[%s] dispatch [%s]",a.localName,c);var e="function"==typeof c?c:a[c];e&&e[d?"apply":"call"](a,d),b.events&&console.groupEnd(),Platform.flush()}}};a.api.instance.events=d}(Polymer),function(a){var b={copyInstanceAttributes:function(){var a=this._instanceAttributes;for(var b in a)this.hasAttribute(b)||this.setAttribute(b,a[b])},takeAttributes:function(){if(this._publishLC)for(var a,b=0,c=this.attributes,d=c.length;(a=c[b])&&d>b;b++)this.attributeToProperty(a.name,a.value)},attributeToProperty:function(b,c){var b=this.propertyForAttribute(b);if(b){if(c&&c.search(a.bindPattern)>=0)return;var d=this[b],c=this.deserializeValue(c,d);c!==d&&(this[b]=c)}},propertyForAttribute:function(a){var b=this._publishLC&&this._publishLC[a];return b},deserializeValue:function(b,c){return a.deserializeValue(b,c)},serializeValue:function(a,b){return"boolean"===b?a?"":void 0:"object"!==b&&"function"!==b&&void 0!==a?a:void 0},reflectPropertyToAttribute:function(a){var b=typeof this[a],c=this.serializeValue(this[a],b);void 0!==c?this.setAttribute(a,c):"boolean"===b&&this.removeAttribute(a)}};a.api.instance.attributes=b}(Polymer),function(a){function b(a,b,d){c.bind&&console.log(e,inB.localName||"object",inPath,a.localName,b);var f=d.discardChanges();return(null===f||void 0===f)&&d.setValue(a[b]),Observer.defineComputedProperty(a,b,d)}var c=window.logFlags||{},d={observeProperties:function(){var a=this._observeNames,b=this._publishNames;if(a&&a.length||b&&b.length){for(var c,d=this._propertyObserver=new CompoundObserver,e=0,f=a.length;f>e&&(c=a[e]);e++){d.addPath(this,c);var g=Object.getOwnPropertyDescriptor(this.__proto__,c);g&&g.value&&this.observeArrayValue(c,g.value,null)}for(var c,e=0,f=b.length;f>e&&(c=b[e]);e++)this.observe&&void 0!==this.observe[c]||d.addPath(this,c);d.open(this.notifyPropertyChanges,this)}},notifyPropertyChanges:function(a,b,c){var d,e,f={};for(var g in b)d=c[2*g+1],void 0!==this.publish[d]&&this.reflectPropertyToAttribute(d),e=this.observe[d],e&&(this.observeArrayValue(d,a[g],b[g]),f[e]||(f[e]=!0,this.invokeMethod(e,[b[g],a[g],arguments])))},observeArrayValue:function(a,b,d){var e=this.observe[a];if(e&&(Array.isArray(d)&&(c.observe&&console.log("[%s] observeArrayValue: unregister observer [%s]",this.localName,a),this.unregisterObserver(a+"__array")),Array.isArray(b))){c.observe&&console.log("[%s] observeArrayValue: register observer [%s]",this.localName,a,b);var f=new ArrayObserver(b);f.open(function(a,b){this.invokeMethod(e,[b])},this),this.registerObserver(a+"__array",f)}},bindProperty:function(a,c){return b(this,a,c)},unbindAllProperties:function(){this._propertyObserver&&this._propertyObserver.close(),this.unregisterObservers()},unbindProperty:function(a){return this.unregisterObserver(a)},invokeMethod:function(a,b){var c=this[a]||a;"function"==typeof c&&c.apply(this,b)},registerObserver:function(a,b){var c=this._observers||(this._observers={});c[a]=b},unregisterObserver:function(a){var b=this._observers;return b&&b[a]?(b[a].close(),b[a]=null,!0):void 0},unregisterObservers:function(){if(this._observers){for(var a,b,c=Object.keys(this._observers),d=0,e=c.length;e>d&&(a=c[d]);d++)b=this._observers[a],b.close();this._observers={}}}},e="[%s]: bindProperties: [%s] to [%s].[%s]";a.api.instance.properties=d}(Polymer),function(a){function b(a){for(;a.parentNode;){if(a.lightDomController)return a;a=a.parentNode}return a.host}function c(a){e(a,d)}function d(a){a.unbindAll()}function e(a,b){if(a){b(a);for(var c=a.firstChild;c;c=c.nextSibling)e(c,b)}}var f=window.logFlags||0,g=(a.api.instance.events,new PolymerExpressions);g.resolveEventHandler=function(a,c,d){var e=b(d);if(e){var f=c.getValueFrom(e);if(f)return f.bind(e)}};var h={syntax:g,instanceTemplate:function(a){return a.createInstance(this,this.syntax)},bind:function(a,b){this._elementPrepared||this.prepareElement();var c=this.propertyForAttribute(a);if(c){this.unbind(a);var d=this.bindProperty(c,b);return d.path=b.path_,this.reflectPropertyToAttribute(c),this.bindings[a]=d}return this.mixinSuper(arguments)},asyncUnbindAll:function(){this._unbound||(f.unbind&&console.log("[%s] asyncUnbindAll",this.localName),this._unbindAllJob=this.job(this._unbindAllJob,this.unbindAll,0))},unbindAll:function(){if(!this._unbound){this.unbindAllProperties(),this.super();for(var a=this.shadowRoot;a;)c(a),a=a.olderShadowRoot;this._unbound=!0}},cancelUnbindAll:function(a){return this._unbound?void(f.unbind&&console.warn("[%s] already unbound, cannot cancel unbindAll",this.localName)):(f.unbind&&console.log("[%s] cancelUnbindAll",this.localName),this._unbindAllJob&&(this._unbindAllJob=this._unbindAllJob.stop()),void(a||e(this.shadowRoot,function(a){a.cancelUnbindAll&&a.cancelUnbindAll()})))}},i=/\{\{([^{}]*)}}/;a.bindPattern=i,a.api.instance.mdv=h}(Polymer),function(a){function b(a){return a.hasOwnProperty("PolymerBase")}function c(){}var d=0,e={PolymerBase:!0,job:Polymer.job,"super":Polymer.super,created:function(){},ready:function(){},createdCallback:function(){this.created(),(this.ownerDocument.defaultView||this.alwaysPrepare||d>0)&&this.prepareElement()},prepareElement:function(){this._elementPrepared=!0,this.shadowRoots={},this.observeProperties(),this.copyInstanceAttributes(),this.takeAttributes(),this.addHostListeners(),d++,this.parseDeclarations(this.__proto__),d--,this.removeAttribute("unresolved"),this.ready()},attachedCallback:function(){this._elementPrepared||this.prepareElement(),this.cancelUnbindAll(!0),this.attached&&this.attached(),this.enteredView&&this.enteredView(),this.hasBeenAttached||(this.hasBeenAttached=!0,this.domReady&&this.async("domReady"))},detachedCallback:function(){this.preventDispose||this.asyncUnbindAll(),this.detached&&this.detached(),this.leftView&&this.leftView()},enteredViewCallback:function(){this.attachedCallback()},leftViewCallback:function(){this.detachedCallback()},enteredDocumentCallback:function(){this.attachedCallback()},leftDocumentCallback:function(){this.detachedCallback()},parseDeclarations:function(a){a&&a.element&&(this.parseDeclarations(a.__proto__),a.parseDeclaration.call(this,a.element))},parseDeclaration:function(a){var b=this.fetchTemplate(a);if(b){var c=this.shadowFromTemplate(b);this.shadowRoots[a.name]=c}},fetchTemplate:function(a){return a.querySelector("template")},shadowFromTemplate:function(a){if(a){var b=this.createShadowRoot();b.resetStyleInheritance=this.resetStyleInheritance;var c=this.instanceTemplate(a);return b.appendChild(c),this.shadowRootReady(b,a),b}},lightFromTemplate:function(a){if(a){this.lightDomController=!0;var b=this.instanceTemplate(a);return this.appendChild(b),this.shadowRootReady(this,a),b}},shadowRootReady:function(a){this.marshalNodeReferences(a),PointerGestures.register(a)},marshalNodeReferences:function(a){var b=this.$=this.$||{};if(a)for(var c,d=a.querySelectorAll("[id]"),e=0,f=d.length;f>e&&(c=d[e]);e++)b[c.id]=c},attributeChangedCallback:function(a){"class"!==a&&"style"!==a&&this.attributeToProperty(a,this.getAttribute(a)),this.attributeChanged&&this.attributeChanged.apply(this,arguments)},onMutation:function(a,b){var c=new MutationObserver(function(a){b.call(this,c,a),c.disconnect()}.bind(this));c.observe(a,{childList:!0,subtree:!0})}};c.prototype=e,e.constructor=c,a.Base=c,a.isBase=b,a.api.instance.base=e}(Polymer),function(a){function b(a){return a.__proto__}function c(a,b){var c="",d=!1;b&&(c=b.localName,d=b.hasAttribute("is"));var e=Platform.ShadowCSS.makeScopeSelector(c,d);return Platform.ShadowCSS.shimCssText(a,e)}var d=(window.logFlags||{},"element"),e="controller",f={STYLE_SCOPE_ATTRIBUTE:d,installControllerStyles:function(){var a=this.findStyleScope();if(a&&!this.scopeHasNamedStyle(a,this.localName)){for(var c=b(this),d="";c&&c.element;)d+=c.element.cssTextForScope(e),c=b(c);d&&this.installScopeCssText(d,a)}},installScopeStyle:function(a,b){var c=this.findStyleScope(),b=b||"";if(c&&!this.scopeHasNamedStyle(c,this.localName+b)){var d="";if(a instanceof Array)for(var e,f=0,g=a.length;g>f&&(e=a[f]);f++)d+=e.textContent+"\n\n";else d=a.textContent;this.installScopeCssText(d,c,b)}},installScopeCssText:function(a,b,d){if(b=b||this.findStyleScope(),d=d||"",b){window.ShadowDOMPolyfill&&(a=c(a,b.host));var f=this.element.cssTextToScopeStyle(a,e);Polymer.applyStyleToScope(f,b),b._scopeStyles[this.localName+d]=!0}},findStyleScope:function(){for(var a=this;a.parentNode;)a=a.parentNode;return a},scopeHasNamedStyle:function(a,b){return a._scopeStyles=a._scopeStyles||{},a._scopeStyles[b]}};a.api.instance.styles=f}(Polymer),function(a){function b(a,b){if(f[a])throw"Already registered (Polymer) prototype for element "+a;e(a,b),d(a)}function c(a,b){h[a]=b}function d(a){h[a]&&(h[a].registerWhenReady(),delete h[a])}function e(a,b){return i[a]=b||{}}function f(a){return i[a]}var g=a.extend,h=(a.api,{}),i={};a.getRegisteredPrototype=f,a.waitingForPrototype=c,window.Polymer=b,g(Polymer,a);var j=Platform.deliverDeclarations();if(j)for(var k,l=0,m=j.length;m>l&&(k=j[l]);l++)b.apply(null,k)}(Polymer),function(a){var b={resolveElementPaths:function(a){Platform.urlResolver.resolveDom(a)},addResolvePathApi:function(){var a=this.getAttribute("assetpath")||"",b=new URL(a,this.ownerDocument.baseURI);this.prototype.resolvePath=function(a,c){var d=new URL(a,c||b);return d.href}}};a.api.declaration.path=b}(Polymer),function(a){function b(a,b){var c=new URL(a.getAttribute("href"),b).href;return"@import '"+c+"';"}function c(a,b){if(a){b===document&&(b=document.head),window.ShadowDOMPolyfill&&(b=document.head);var c=d(a.textContent),e=a.getAttribute(h);e&&c.setAttribute(h,e),b.appendChild(c)}}function d(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function e(a){return a&&a.__resource||""}function f(a,b){return p?p.call(a,b):void 0}var g=(window.logFlags||{},a.api.instance.styles),h=g.STYLE_SCOPE_ATTRIBUTE,i="style",j="@import",k="link[rel=stylesheet]",l="global",m="polymer-scope",n={loadStyles:function(a){var b=this.templateContent();b&&this.convertSheetsToStyles(b);var c=this.findLoadableStyles(b);c.length?Platform.styleResolver.loadStyles(c,a):a&&a()},convertSheetsToStyles:function(a){for(var c,e,f=a.querySelectorAll(k),g=0,h=f.length;h>g&&(c=f[g]);g++)e=d(b(c,this.ownerDocument.baseURI),this.ownerDocument),this.copySheetAttributes(e,c),c.parentNode.replaceChild(e,c)},copySheetAttributes:function(a,b){for(var c,d=0,e=b.attributes,f=e.length;(c=e[d])&&f>d;d++)"rel"!==c.name&&"href"!==c.name&&a.setAttribute(c.name,c.value)},findLoadableStyles:function(a){var b=[];if(a)for(var c,d=a.querySelectorAll(i),e=0,f=d.length;f>e&&(c=d[e]);e++)c.textContent.match(j)&&b.push(c);return b},installSheets:function(){this.cacheSheets(),this.cacheStyles(),this.installLocalSheets(),this.installGlobalStyles()},cacheSheets:function(){this.sheets=this.findNodes(k),this.sheets.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},cacheStyles:function(){this.styles=this.findNodes(i+"["+m+"]"),this.styles.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},installLocalSheets:function(){var a=this.sheets.filter(function(a){return!a.hasAttribute(m)}),b=this.templateContent();if(b){var c="";if(a.forEach(function(a){c+=e(a)+"\n"}),c){var f=d(c,this.ownerDocument);b.insertBefore(f,b.firstChild)}}},findNodes:function(a,b){var c=this.querySelectorAll(a).array(),d=this.templateContent();if(d){var e=d.querySelectorAll(a).array();c=c.concat(e)}return b?c.filter(b):c},templateContent:function(){var a=this.querySelector("template");return a&&templateContent(a)},installGlobalStyles:function(){var a=this.styleForScope(l);c(a,document.head)},cssTextForScope:function(a){var b="",c="["+m+"="+a+"]",d=function(a){return f(a,c)},g=this.sheets.filter(d);g.forEach(function(a){b+=e(a)+"\n\n"});var h=this.styles.filter(d);return h.forEach(function(a){b+=a.textContent+"\n\n"}),b},styleForScope:function(a){var b=this.cssTextForScope(a);return this.cssTextToScopeStyle(b,a)},cssTextToScopeStyle:function(a,b){if(a){var c=d(a);return c.setAttribute(h,this.getAttribute("name")+"-"+b),c}}},o=HTMLElement.prototype,p=o.matches||o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector;a.api.declaration.styles=n,a.applyStyleToScope=c}(Polymer),function(a){var b=(window.logFlags||{},a.api.instance.events),c=b.EVENT_PREFIX,d={parseHostEvents:function(){var a=this.prototype.eventDelegates;this.addAttributeDelegates(a)},addAttributeDelegates:function(a){for(var b,c=0;b=this.attributes[c];c++)this.hasEventPrefix(b.name)&&(a[this.removeEventPrefix(b.name)]=b.value.replace("{{","").replace("}}","").trim())},hasEventPrefix:function(a){return a&&"o"===a[0]&&"n"===a[1]&&"-"===a[2]},removeEventPrefix:function(a){return a.slice(e)}},e=c.length;a.api.declaration.events=d}(Polymer),function(a){var b={inferObservers:function(a){var b,c=a.observe;for(var d in a)"Changed"===d.slice(-7)&&(c||(c=a.observe={}),b=d.slice(0,-7),c[b]=c[b]||d)},explodeObservers:function(a){var b=a.observe;if(b){var c={};for(var d in b)for(var e,f=d.split(" "),g=0;e=f[g];g++)c[e]=b[d];a.observe=c}},optimizePropertyMaps:function(a){if(a.observe){var b=a._observeNames=[];for(var c in a.observe)for(var d,e=c.split(" "),f=0;d=e[f];f++)b.push(d)}if(a.publish){var b=a._publishNames=[];for(var c in a.publish)b.push(c)}},publishProperties:function(a,b){var c=a.publish;c&&(this.requireProperties(c,a,b),a._publishLC=this.lowerCaseMap(c))},requireProperties:function(a,b,c){for(var d in a)void 0===b[d]&&void 0===c[d]&&(b[d]=a[d])},lowerCaseMap:function(a){var b={};for(var c in a)b[c.toLowerCase()]=c;return b}};a.api.declaration.properties=b}(Polymer),function(a){var b="attributes",c=/\s|,/,d={inheritAttributesObjects:function(a){this.inheritObject(a,"publishLC"),this.inheritObject(a,"_instanceAttributes")},publishAttributes:function(a,d){var e=this.getAttribute(b);if(e)for(var f,g=a.publish||(a.publish={}),h=e.split(c),i=0,j=h.length;j>i;i++)f=h[i].trim(),f&&void 0===g[f]&&void 0===d[f]&&(g[f]=null)},accumulateInstanceAttributes:function(){for(var a,b=this.prototype._instanceAttributes,c=this.attributes,d=0,e=c.length;e>d&&(a=c[d]);d++)this.isInstanceAttribute(a.name)&&(b[a.name]=a.value)},isInstanceAttribute:function(a){return!this.blackList[a]&&"on-"!==a.slice(0,3)},blackList:{name:1,"extends":1,constructor:1,noscript:1,assetpath:1,"cache-csstext":1}};d.blackList[b]=1,a.api.declaration.attributes=d}(Polymer),function(a){function b(a){if(!Object.__proto__){var b=Object.getPrototypeOf(a);a.__proto__=b,d(b)&&(b.__proto__=Object.getPrototypeOf(b))}}var c=a.api,d=a.isBase,e=a.extend,f={register:function(a,b){this.buildPrototype(a,b),this.registerPrototype(a,b),this.publishConstructor()},buildPrototype:function(b,c){var d=a.getRegisteredPrototype(b),e=this.generateBasePrototype(c);this.desugarBeforeChaining(d,e),this.prototype=this.chainPrototypes(d,e),this.desugarAfterChaining(b,c)},desugarBeforeChaining:function(a,b){a.element=this,this.publishAttributes(a,b),this.publishProperties(a,b),this.inferObservers(a),this.explodeObservers(a)},chainPrototypes:function(a,c){this.inheritMetaData(a,c);var d=this.chainObject(a,c);return b(d),d},inheritMetaData:function(a,b){this.inheritObject("observe",a,b),this.inheritObject("publish",a,b),this.inheritObject("_publishLC",a,b),this.inheritObject("_instanceAttributes",a,b),this.inheritObject("eventDelegates",a,b)},desugarAfterChaining:function(a,b){this.optimizePropertyMaps(this.prototype),this.installSheets(),this.resolveElementPaths(this),this.accumulateInstanceAttributes(),this.parseHostEvents(),this.addResolvePathApi(),window.ShadowDOMPolyfill&&Platform.ShadowCSS.shimStyling(this.templateContent(),a,b),this.prototype.registerCallback&&this.prototype.registerCallback(this)},publishConstructor:function(){var a=this.getAttribute("constructor");a&&(window[a]=this.ctor)},generateBasePrototype:function(a){var b=this.findBasePrototype(a);if(!b){var b=HTMLElement.getPrototypeForTag(a);b=this.ensureBaseApi(b),g[a]=b}return b},findBasePrototype:function(a){return g[a]},ensureBaseApi:function(a){if(a.PolymerBase)return a;var b=Object.create(a);return c.publish(c.instance,b),this.mixinMethod(b,a,c.instance.mdv,"bind"),b},mixinMethod:function(a,b,c,d){var e=function(a){return b[d].apply(this,a)};a[d]=function(){return this.mixinSuper=e,c[d].apply(this,arguments)}},inheritObject:function(a,b,c){var d=b[a]||{};b[a]=this.chainObject(d,c[a])},registerPrototype:function(a,b){var c={prototype:this.prototype},d=this.findTypeExtension(b);d&&(c.extends=d),HTMLElement.register(a,this.prototype),this.ctor=document.registerElement(a,c)},findTypeExtension:function(a){if(a&&a.indexOf("-")<0)return a;var b=this.findBasePrototype(a);return b.element?this.findTypeExtension(b.element.extends):void 0}},g={};f.chainObject=Object.__proto__?function(a,b){return a&&b&&a!==b&&(a.__proto__=b),a}:function(a,b){if(a&&b&&a!==b){var c=Object.create(b);a=e(c,a)}return a},c.declaration.prototype=f}(Polymer),function(a){function b(a){return document.contains(a)?g:f}function c(){return f.length?f[0]:g[0]}function d(a){e.waitToReady=!0,CustomElements.ready=!1,HTMLImports.whenImportsReady(function(){e.addReadyCallback(a),e.waitToReady=!1,e.check()})}var e={wait:function(a,b,c){return-1===this.indexOf(a)&&(this.add(a),a.__check=b,a.__go=c),0!==this.indexOf(a)},add:function(a){b(a).push(a)},indexOf:function(a){var c=b(a).indexOf(a);return c>=0&&document.contains(a)&&(c+=HTMLImports.useNative||HTMLImports.ready?f.length:1e9),c},go:function(a){var b=this.remove(a);b&&(b.__go.call(b),b.__check=b.__go=null,this.check())},remove:function(a){var c=this.indexOf(a);if(0===c)return b(a).shift()},check:function(){var a=this.nextElement();return a&&a.__check.call(a),this.canReady()?(this.ready(),!0):void 0},nextElement:function(){return c()},canReady:function(){return!this.waitToReady&&this.isEmpty()},isEmpty:function(){return!f.length&&!g.length},ready:function(){if(CustomElements.ready===!1&&(CustomElements.upgradeDocumentTree(document),CustomElements.ready=!0),h)for(var a;h.length;)(a=h.shift())()},addReadyCallback:function(a){a&&h.push(a)},waitToReady:!0},f=[],g=[],h=[];document.addEventListener("WebComponentsReady",function(){CustomElements.ready=!1}),a.queue=e,a.whenPolymerReady=d}(Polymer),function(a){function b(a,b){a?(document.head.appendChild(a),d(b)):b&&b()}function c(a,c){if(a&&a.length){for(var d,e,f=document.createDocumentFragment(),g=0,h=a.length;h>g&&(d=a[g]);g++)e=document.createElement("link"),e.rel="import",e.href=d,f.appendChild(e);b(f,c)}else c&&c()}var d=a.whenPolymerReady;a.import=c,a.importElements=b}(Polymer),function(a){function b(a){return Boolean(HTMLElement.getPrototypeForTag(a))}function c(a){return a&&a.indexOf("-")>=0}var d=a.extend,e=a.api,f=a.queue,g=a.whenPolymerReady,h=a.getRegisteredPrototype,i=a.waitingForPrototype,j=d(Object.create(HTMLElement.prototype),{createdCallback:function(){this.getAttribute("name")&&this.init()},init:function(){this.name=this.getAttribute("name"),this.extends=this.getAttribute("extends"),this.loadResources(),this.registerWhenReady()},registerWhenReady:function(){this.registered||this.waitingForPrototype(this.name)||this.waitingForQueue()||this.waitingForResources()||f.go(this)},_register:function(){c(this.extends)&&!b(this.extends)&&console.warn("%s is attempting to extend %s, an unregistered element or one that was not registered with Polymer.",this.name,this.extends),this.register(this.name,this.extends),this.registered=!0},waitingForPrototype:function(a){return h(a)?void 0:(i(a,this),this.handleNoScript(a),!0)},handleNoScript:function(a){if(this.hasAttribute("noscript")&&!this.noscript)if(this.noscript=!0,window.CustomElements&&!CustomElements.useNative)Polymer(a);else{var b=document.createElement("script");b.textContent="Polymer('"+a+"');",this.appendChild(b)}},waitingForResources:function(){return this._needsResources},waitingForQueue:function(){return f.wait(this,this.registerWhenReady,this._register)},loadResources:function(){this._needsResources=!0,this.loadStyles(function(){this._needsResources=!1,this.registerWhenReady()}.bind(this))}});e.publish(e.declaration,j),a.getRegisteredPrototype=h,g(function(){document.body.removeAttribute("unresolved"),document.dispatchEvent(new CustomEvent("polymer-ready",{bubbles:!0}))}),document.registerElement("polymer-element",{prototype:j})}(Polymer);
//# sourceMappingURL=polymer.js.map;
/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});
//# sourceMappingURL=jquery.min.map;
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
;
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));
;
/*
 * Copyright (c) 2013, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

(function($j) {

// Version this js was shipped with
this.SALESFORCE_MOBILE_SDK_VERSION = "2.1.0";

/*
 * JavaScript library to wrap REST API on Visualforce. Leverages Ajax Proxy
 * (see http://bit.ly/sforce_ajax_proxy for details). Based on forcetk.js,
 * but customized for consumption from within the Mobile SDK.
 *
 * Note that you must add the REST endpoint hostname for your instance (i.e.
 * https://na1.salesforce.com/ or similar) as a remote site - in the admin
 * console, go to Your Name | Setup | Security Controls | Remote Site Settings
 */

var forcetk = this.forcetk;

if (forcetk === undefined) {
    forcetk = this.forcetk = {};
}

if (forcetk.Client === undefined) {

    /**
     * The Client provides a convenient wrapper for the Force.com REST API,
     * allowing JavaScript in Visualforce pages to use the API via the Ajax
     * Proxy.
     * @param [clientId=null] 'Consumer Key' in the Remote Access app settings
     * @param [loginUrl='https://login.salesforce.com/'] Login endpoint
     * @param [proxyUrl=null] Proxy URL. Omit if running on Visualforce or
     *                  Cordova etc
     * @constructor
     */
    forcetk.Client = function(clientId, loginUrl, proxyUrl) {
        forcetk.Client(clientId, loginUrl, proxyUrl, null);
    }

    /**
     * The Client provides a convenient wrapper for the Force.com REST API,
     * allowing JavaScript in Visualforce pages to use the API via the Ajax
     * Proxy.
     * @param [clientId=null] 'Consumer Key' in the Remote Access app settings
     * @param [loginUrl='https://login.salesforce.com/'] Login endpoint
     * @param [proxyUrl=null] Proxy URL. Omit if running on Visualforce or
     *                  Cordova etc
     * @param authCallback Callback method to perform authentication when 401 is received.
     * @constructor
     */
    forcetk.Client = function(clientId, loginUrl, proxyUrl, authCallback) {
        this.clientId = clientId;
        this.loginUrl = loginUrl || 'https://login.salesforce.com/';
        if (typeof proxyUrl === 'undefined' || proxyUrl === null) {
            this.proxyUrl = null;
            this.authzHeader = "Authorization";
        } else {
            // On an external proxy service
            this.proxyUrl = proxyUrl;
            this.authzHeader = "X-Authorization";
        }
        this.refreshToken = null;
        this.sessionId = null;
        this.apiVersion = null;
        this.instanceUrl = null;
        this.asyncAjax = true;
        this.userAgentString = this.computeWebAppSdkAgent(navigator.userAgent);
        this.authCallback = authCallback;
    }

    /**
    * Set a User-Agent to use in the client.
    * @param uaString A User-Agent string to use for all requests.
    */
    forcetk.Client.prototype.setUserAgentString = function(uaString) {
        this.userAgentString = uaString;
    }

    /**
    * Get User-Agent used by this client.
    */
    forcetk.Client.prototype.getUserAgentString = function() {
        return this.userAgentString;
    }


    /**
    * Compute SalesforceMobileSDK for web app
    */
    forcetk.Client.prototype.computeWebAppSdkAgent = function(navigatorUserAgent) {
        var sdkVersion = SALESFORCE_MOBILE_SDK_VERSION;
        var model = "Unknown"
        var platform = "Unknown";
        var platformVersion = "Unknown";
        var appName = window.location.pathname.split("/").pop();
        var appVersion = "1.0";

        var getIPadVersion = function() {
            var match = /CPU OS ([0-9_]*) like Mac OS X/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1].replace(/_/g, ".") : "Unknown");
        };

        var getIPhoneVersion = function() {
            var match = /CPU iPhone OS ([0-9_]*) like Mac OS X/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1].replace(/_/g, ".") : "Unknown");
        };

        var getIOSModel = function() {
            var match = /(iPad|iPhone|iPod)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1] : "Unknown");
        };

        var getAndroidVersion = function() {
            var match = /Android ([0-9\.]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1] : "Unknown");
        };

        var getAndroidModel = function() {
            var match = /Android[^\)]*; ([^;\)]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1].replace(/[\/ ]/g, "_") : "Unknown");
        };

        var getWindowsPhoneVersion = function() {
            var match = /Windows Phone OS ([0-9\.]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1] : "Unknown");
        };

        var getWindowsPhoneModel = function() {
            var match = /Windows Phone OS [^\)]*; ([^;\)]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1].replace(/[\/ ]/g, "_") : "Unknown");
        };

        var getMacOSVersion = function() {
            var match = /Mac OS X ([0-9_]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1].replace(/_/g, ".") : "Unknown");
        };

        var getWindowsVersion = function() {
            var match = /Windows NT ([0-9\.]*)/.exec(navigatorUserAgent);
            return (match != null && match.length == 2 ? match[1] : "Unknown");
        };

        var match = /(iPhone|iPad|iPod|Android|Windows Phone|Macintosh|Windows)/.exec(navigatorUserAgent);
        if (match != null && match.length == 2) {
            switch(match[1]) {
            case "iPad":
                platform = "iPhone OS";
                platformVersion = getIPadVersion();
                model = "iPad";
                break;

            case "iPhone":
            case "iPod":
                platform = "iPhone OS";
                platformVersion = getIPhoneVersion();
                model = match[1];
                break;

            case "Android":
                platform = "android mobile";
                platformVersion = getAndroidVersion();
                model = getAndroidModel();
                break;

            case "Windows Phone":
                platform = "Windows Phone";
                platformVersion = getWindowsPhoneVersion();
                model = getWindowsPhoneModel();
                break;

            case "Macintosh":
                platform = "Mac OS";
                platformVersion = getMacOSVersion();
                break;

            case "Windows":
                platform = "Windows";
                platformVersion = getWindowsVersion();
                break;
            }
        }

        return "SalesforceMobileSDK/" + sdkVersion + " " + platform + "/" + platformVersion + " (" + model + ") " + appName + "/" + appVersion + " Web " + navigatorUserAgent;
    }

    /**
     * Set a refresh token in the client.
     * @param refreshToken an OAuth refresh token
     */
    forcetk.Client.prototype.setRefreshToken = function(refreshToken) {
        this.refreshToken = refreshToken;
    }

    /**
     * Refresh the access token.
     * @param callback function to call on success
     * @param error function to call on failure
     */
    forcetk.Client.prototype.refreshAccessToken = function(callback, error) {
        var that = this;
        if (this.authCallback == null && this.refreshToken) {
            var url = this.loginUrl + '/services/oauth2/token';
            return $j.ajax({
                type: 'POST',
                url: (this.proxyUrl !== null) ? this.proxyUrl: url,
                cache: false,
                processData: false,
                data: 'grant_type=refresh_token&client_id=' + this.clientId + '&refresh_token=' + this.refreshToken,
                success: function(response) {
                    that.setSessionToken(response.access_token, null, response.instance_url);
                    callback();
                },
                error: error,
                dataType: "json",
                beforeSend: function(xhr) {
                    if (that.proxyUrl !== null) {
                        xhr.setRequestHeader('SalesforceProxy-Endpoint', url);
                    }
                }
            });
        } else {
            this.authCallback(that, callback, error);
        }
    }

    /**
     * Set a session token and the associated metadata in the client.
     * @param sessionId a salesforce.com session ID. In a Visualforce page,
     *                   use '{!$Api.sessionId}' to obtain a session ID.
     * @param [apiVersion="28.0"] Force.com API version
     * @param [instanceUrl] Omit this if running on Visualforce; otherwise
     *                   use the value from the OAuth token.
     */
    forcetk.Client.prototype.setSessionToken = function(sessionId, apiVersion, instanceUrl) {
        this.sessionId = sessionId;
        this.apiVersion = (typeof apiVersion === 'undefined' || apiVersion === null)
        ? 'v28.0': apiVersion;
        if (typeof instanceUrl === 'undefined' || instanceUrl == null) {
            // location.hostname can be of the form 'abc.na1.visual.force.com',
            // 'na1.salesforce.com' or 'abc.my.salesforce.com' (custom domains).
            // Split on '.', and take the [1] or [0] element as appropriate
            var elements = location.hostname.split(".");
            var instance = null;
            if(elements.length == 4 && elements[1] === 'my') {
                instance = elements[0] + '.' + elements[1];
            } else if(elements.length == 3){
                instance = elements[0];
            } else {
                instance = elements[1];
            }
            this.instanceUrl = "https://" + instance + ".salesforce.com";
        } else {
            this.instanceUrl = instanceUrl;
        }
    }

    // Internal method to generate the key/value pairs of all the required headers for xhr.
    var getRequestHeaders = function(client) {
        var headers = {};

        headers[client.authzHeader] = "Bearer " + client.sessionId;
        headers['Cache-Control'] = 'no-store';
        // See http://www.salesforce.com/us/developer/docs/chatterapi/Content/intro_requesting_bearer_token_url.htm#kanchor36
        headers["X-Connect-Bearer-Urls"] = true;
        if (client.userAgentString !== null) {
            headers['User-Agent'] = client.userAgentString;
            headers['X-User-Agent'] = client.userAgentString;
        }
        return headers;
    }

    /*
     * Low level utility function to call the Salesforce endpoint.
     * @param path resource path relative to /services/data or fully qualified url (to Salesforce)
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     * @param [method="GET"] HTTP method for call
     * @param [payload=null] payload for POST/PATCH etc
     * @param [headerParams={headerName:"headerValue",...}] parameters to send as header values for POST/PATCH etc
     */
    forcetk.Client.prototype.ajax = function(path, callback, error, method, payload, headerParams) {
        var that = this;
        var retryCount = 0;
        var url = (path.indexOf(this.instanceUrl) == 0 ? path : this.instanceUrl + '/services/data' + path);
        return $j.ajax({
            type: method || "GET",
            async: this.asyncAjax,
            url: (this.proxyUrl !== null) ? this.proxyUrl: url,
            contentType: method == "DELETE" || method == "GET" ? null : 'application/json',
            cache: false,
            processData: false,
            dataType: "json",
            data: payload,
            headers: getRequestHeaders(this),
            success: callback,
            error: function(jqXHR, textStatus, errorThrown) {
                var xhr = this;
                var errorCallback = function() {
                    if (typeof error == 'function') {
                        error(jqXHR, textStatus, errorThrown);
                    }
                }
                if (jqXHR.status === 401 && retryCount++ == 0) {
                    that.refreshAccessToken(function() {
                        that.replay(xhr);
                    },
                    errorCallback);
                } else errorCallback();
            },
            beforeSend: function(xhr) {
                if (that.proxyUrl !== null) {
                    xhr.setRequestHeader('SalesforceProxy-Endpoint', url);
                }
                //Add any custom headers
                for (paramName in (headerParams || {})) {
                    xhr.setRequestHeader(paramName, headerParams[paramName]);
                }
            }
        });
    }

    /*
     * Low level utility function to replay an ajax request.
     * The utility function updates the session id before replaying the request.
     * @param xhr xhr request to be replayed.
     */
    forcetk.Client.prototype.replay = function(xhr) {
        xhr.headers = getRequestHeaders(this);
        $j.ajax(xhr);
    }

    /**
     * Utility function to query the Chatter API and download a file
     * Note, raw XMLHttpRequest because JQuery mangles the arraybuffer
     * This should work on any browser that supports XMLHttpRequest 2 because arraybuffer is required.
     * For mobile, that means iOS >= 5 and Android >= Honeycomb
     * @author Tom Gersic
     * @param path resource path relative to /services/data
     * @param mimetype of the file
     * @param callback function to which response will be passed
     * @param [error=null] function to which request will be passed in case of error
     * @param retry true if we've already tried refresh token flow once
     **/
    forcetk.Client.prototype.getChatterFile = function(path,mimeType,callback,error,retry) {
        var that = this;
        var url = this.instanceUrl + '/services/data' + path;
        var request = new XMLHttpRequest();
        request.open("GET",  (this.proxyUrl !== null) ? this.proxyUrl: url, true);
        request.responseType = "arraybuffer";
        request.setRequestHeader(that.authzHeader, "Bearer " + that.sessionId);
        if (that.userAgentString !== null) {
            request.setRequestHeader('User-Agent', that.userAgentString);
            request.setRequestHeader('X-User-Agent', that.userAgentString);
        }
        if (this.proxyUrl !== null) {
            request.setRequestHeader('SalesforceProxy-Endpoint', url);
        }
        request.setRequestHeader('Cache-Control', 'no-store');
        request.onreadystatechange = function() {
            // continue if the process is completed
            if (request.readyState == 4) {
                // continue only if HTTP status is "OK"
                if (request.status == 200) {
                    try {
                        // retrieve the response
                        callback(request.response);
                    } catch(e) {
                        // display error message
                        alert("Error reading the response: " + e.toString());
                    }
                }
                //refresh token in 401
                else if(request.status == 401 && !retry) {
                    that.refreshAccessToken(function() {
                        that.getChatterFile(path, mimeType, callback, error, true);
                    },
                    error);
                } else {
                    // display status message
                    error(request,request.statusText,request.response);
                }
            }
        }
        request.send();
    }

    /*
     * Low level utility function to call the Salesforce endpoint specific for Apex REST API.
     * @param path resource path relative to /services/apexrest
     * @param [method="GET"] HTTP method for call
     * @param [payload=null] payload for POST/PATCH etc
     * @param [headerParams={headerName:"headerValue",...}] parameters to send as header values for POST/PATCH etc
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.apexrest = function(path, method, payload, headerParams, callback, error) {
        return this.ajax(this.instanceUrl + '/services/apexrest' + path, callback, error, method, payload, headerParams);
    }

    /*
     * Lists summary information about each Salesforce.com version currently
     * available, including the version, label, and a link to each version's
     * root.
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.versions = function(callback, error) {
        return this.ajax('/', callback, error);
    }

    /*
     * Lists available resources for the client's API version, including
     * resource name and URI.
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.resources = function(callback, error) {
        return this.ajax('/' + this.apiVersion + '/', callback, error);
    }

    /*
     * Lists the available objects and their metadata for your organization's
     * data.
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.describeGlobal = function(callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/', callback, error);
    }

    /*
     * Describes the individual metadata for the specified object.
     * @param objtype object type; e.g. "Account"
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.metadata = function(objtype, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/'
        , callback, error);
    }

    /*
     * Completely describes the individual metadata at all levels for the
     * specified object.
     * @param objtype object type; e.g. "Account"
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.describe = function(objtype, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype
        + '/describe/', callback, error);
    }

    /*
     * Fetches the layout configuration for a particular sobject type and record type id.
     * @param objtype object type; e.g. "Account"
     * @param (Optional) recordTypeId Id of the layout's associated record type
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.describeLayout = function(objtype, recordTypeId, callback, error) {
        recordTypeId = recordTypeId ? recordTypeId : '';
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype
        + '/describe/layouts/' + recordTypeId, callback, error);
    }

    /*
     * Creates a new record of the given type.
     * @param objtype object type; e.g. "Account"
     * @param fields an object containing initial field names and values for
     *               the record, e.g. {:Name "salesforce.com", :TickerSymbol
     *               "CRM"}
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.create = function(objtype, fields, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/'
        , callback, error, "POST", JSON.stringify(fields));
    }

    /*
     * Retrieves field values for a record of the given type.
     * @param objtype object type; e.g. "Account"
     * @param id the record's object ID
     * @param [fields=null] optional comma-separated list of fields for which
     *               to return values; e.g. Name,Industry,TickerSymbol
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.retrieve = function(objtype, id, fieldlist, callback, error) {
        if (arguments.length == 4) {
            error = callback;
            callback = fieldlist;
            fieldlist = null;
        }
        var fields = fieldlist ? '?fields=' + fieldlist : '';
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/' + id
        + fields, callback, error);
    }

    /*
     * Upsert - creates or updates record of the given type, based on the
     * given external Id.
     * @param objtype object type; e.g. "Account"
     * @param externalIdField external ID field name; e.g. "accountMaster__c"
     * @param externalId the record's external ID value
     * @param fields an object containing field names and values for
     *               the record, e.g. {:Name "salesforce.com", :TickerSymbol
     *               "CRM"}
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.upsert = function(objtype, externalIdField, externalId, fields, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/' + externalIdField + '/' + externalId
        + '?_HttpMethod=PATCH', callback, error, "POST", JSON.stringify(fields));
    }

    /*
     * Updates field values on a record of the given type.
     * @param objtype object type; e.g. "Account"
     * @param id the record's object ID
     * @param fields an object containing initial field names and values for
     *               the record, e.g. {:Name "salesforce.com", :TickerSymbol
     *               "CRM"}
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.update = function(objtype, id, fields, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/' + id
        + '?_HttpMethod=PATCH', callback, error, "POST", JSON.stringify(fields));
    }

    /*
     * Deletes a record of the given type. Unfortunately, 'delete' is a
     * reserved word in JavaScript.
     * @param objtype object type; e.g. "Account"
     * @param id the record's object ID
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.del = function(objtype, id, callback, error) {
        return this.ajax('/' + this.apiVersion + '/sobjects/' + objtype + '/' + id
        , callback, error, "DELETE");
    }

    /*
     * Executes the specified SOQL query.
     * @param soql a string containing the query to execute - e.g. "SELECT Id,
     *             Name from Account ORDER BY Name LIMIT 20"
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.query = function(soql, callback, error) {
        return this.ajax('/' + this.apiVersion + '/query?q=' + encodeURI(soql)
        , callback, error);
    }

    /*
     * Queries the next set of records based on pagination.
     * <p>This should be used if performing a query that retrieves more than can be returned
     * in accordance with http://www.salesforce.com/us/developer/docs/api_rest/Content/dome_query.htm</p>
     * <p>Ex: forcetkClient.queryMore( successResponse.nextRecordsUrl, successHandler, failureHandler )</p>
     *
     * @param url - the url retrieved from nextRecordsUrl or prevRecordsUrl
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.queryMore = function( url, callback, error ){
        return this.ajax( url, callback, error );
    }

    /*
     * Executes the specified SOSL search.
     * @param sosl a string containing the search to execute - e.g. "FIND
     *             {needle}"
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.search = function(sosl, callback, error) {
        return this.ajax('/' + this.apiVersion + '/search?q=' + encodeURI(sosl)
        , callback, error);
    }

    /*
     * Returns a page from the list of files owned by the specified user
     * @param userId a user id or 'me' - when null uses current user
     * @param page page number - when null fetches first page
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.ownedFilesList = function(userId, page, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/users/' + (userId == null ? 'me' : userId) +  '/files' + (page != null ? '?page=' + page : '')
        , callback, error);
    }

    /*
     * Returns a page from the list of files from groups that the specified user is a member of
     * @param userId a user id or 'me' - when null uses current user
     * @param page page number - when null fetches first page
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.filesInUsersGroups = function(userId, page, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/users/' + (userId == null ? 'me' : userId) +  '/files/filter/groups' + (page != null ? '?page=' + page : '')
        , callback, error);
    }

    /*
     * Returns a page from the list of files shared with the specified user
     * @param userId a user id or 'me' - when null uses current user
     * @param page page number - when null fetches first page
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.filesSharedWithUser = function(userId, page, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/users/' + (userId == null ? 'me' : userId) +  '/files/filter/sharedwithme' + (page != null ? '?page=' + page : '')
        , callback, error);
    }

    /*
     * Returns file details
     * @param fileId file's Id
     * @param version - when null fetches details of most recent version
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.fileDetails = function(fileId, version, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/files/' + fileId + (version != null ? '?versionNumber=' + version : '')
        , callback, error);
    }

    /*
     * Returns file details for multiple files
     * @param fileIds file ids
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.batchFileDetails = function(fileIds, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/files/batch/' + fileIds.join(',')
        , callback, error);
    }

    /*
     * Returns file rendition
     * @param fileId file's Id
     * @param version - when null fetches details of most recent version
     * @param rentidionType - FLASH, PDF, THUMB120BY90, THUMB240BY180, THUMB720BY480
     * @param page page number - when null fetches first page
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.fileRendition = function(fileId, version, renditionType, page, callback, error) {
        var mimeType = (renditionType == "FLASH" ? "application/x-shockwave-flash" : (renditionType == "PDF" ? "application/pdf" : "image/jpeg"));
        return this.getChatterFile(this.fileRenditionPath(fileId, version, renditionType, page)
                                   , mimeType , callback, error);
    }

    /*
     * Returns file rendition path (relative to service/data) - from html (e.g. img tag), use the bearer token url instead
     * @param fileId file's Id
     * @param version - when null fetches details of most recent version
     * @param rentidionType - FLASH, PDF, THUMB120BY90, THUMB240BY180, THUMB720BY480
     * @param page page number - when null fetches first page
     */
    forcetk.Client.prototype.fileRenditionPath = function(fileId, version, renditionType, page) {
        return '/' + this.apiVersion + '/chatter/files/' + fileId + '/rendition?type=' + renditionType + (version != null ? '&versionNumber=' + version : '') + (page != null ? '&page=' + page : '');
    }

    /*
     * Returns file content
     * @param fileId file's Id
     * @param version - when null fetches details of most recent version
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.fileContents = function(fileId, version, callback, error) {
        var mimeType = null; // we don't know
        return this.getChatterFile(this.fileContentsPath(fileId, version)
                                   , mimeType , callback, error);
    }

    /*
     * Returns file content path (relative to service/data) - from html (e.g. img tag), use the bearer token url instead
     * @param fileId file's Id
     * @param version - when null fetches details of most recent version
     */
    forcetk.Client.prototype.fileContentsPath = function(fileId, version) {
        return '/' + this.apiVersion + '/chatter/files/' + fileId + '/content' + (version != null ? '?versionNumber=' + version : '');
    }


    /**
     * Returns a page from the list of entities that this file is shared to
     *
     * @param fileId file's Id
     * @param page page number - when null fetches first page
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.fileShares = function(fileId, page, callback, error) {
        return this.ajax('/' + this.apiVersion + '/chatter/files/' + fileId + '/file-shares' + (page != null ? '?page=' + page : '')
        , callback, error);
    }

    /**
     * Adds a file share for the specified fileId to the specified entityId
     *
     * @param fileId file's Id
     * @param entityId Id of the entity to share the file to (e.g. a user or a group)
     * @param shareType the type of share (V - View, C - Collaboration)
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.addFileShare = function(fileId, entityId, shareType, callback, error) {
        return this.create("ContentDocumentLink", {ContentDocumentId:fileId, LinkedEntityId:entityId, ShareType:shareType}, callback, error);
    }

    /**
     * Deletes the specified file share.
     * @param shareId Id of the file share record (aka ContentDocumentLink)
     * @param callback function to which response will be passed
     * @param [error=null] function to which jqXHR will be passed in case of error
     */
    forcetk.Client.prototype.deleteFileShare = function(sharedId, callback, error) {
        return this.del("ContentDocumentLink", sharedId, callback, error);
    }
}})
.call(this, jQuery);
;
(function($, _, Backbone, forcetk) {

    "use strict";

    // Save a reference to the global object (`window` in the browser).
    var root = this;

    // Save the previous value of the `Force` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousForce = root.Force;

    // The top-level namespace.
    var Force = this.Force = {};

    // Runs in *noConflict* mode, returning the `Force` variable
    // to its previous owner. Returns a reference to this Force object.
    Force.noConflict = function() {
        root.Force = previousForce;
        return this;
    };

    // Utility Function to turn methods with callbacks into jQuery promises
    var promiser = function(object, methodName, objectName) {
        var retfn = function () {
            var args = $.makeArray(arguments);
            var d = $.Deferred();
            args.push(function() {
                console.log("------> Calling successCB for " + objectName + ":" + methodName);
                try {
                    d.resolve.apply(d, arguments);
                }
                catch (err) {
                    console.error("------> Error when calling successCB for " + objectName + ":" + methodName);
                    console.error(err.stack);
                }
            });
            args.push(function() {
                console.log("------> Calling errorCB for " + objectName + ":" + methodName);
                try {
                    d.reject.apply(d, arguments);
                }
                catch (err) {
                    console.error("------> Error when calling errorCB for " + objectName + ":" + methodName);
                    console.error(err.stack);
                }
            });
            console.log("-----> Calling " + objectName + ":" + methodName);
            object[methodName].apply(object, args);
            return d.promise();
        };
        return retfn;
    };

    // Private forcetk client with promise-wrapped methods
    var forcetkClient = null;

    // Private smartstore client with promise-wrapped methods
    var smartstoreClient = null;

    // Helper function to patch user agent
    var patchUserAgent = function(userAgent) {
        var match = /^(SalesforceMobileSDK\/[^\ ]* [^\/]*\/[^\ ]* \([^\)]*\) [^\/]*\/[^ ]* )(Hybrid|Web)(.*$)/.exec(userAgent);
        if (match != null && match.length == 4) {
            return match[1] + match[2] + "SmartSync" + match[3];
        }
        else {
            // Not a SalesforceMobileSDK user agent, we leave it unchanged
            return userAgent;
        }
    };

    // Init function
    // * creds: credentials returned by authenticate call
    // * apiVersion: apiVersion to use, when null, v28.0 (Summer '13) is used
    // * innerForcetkClient: [Optional] A fully initialized forcetkClient to be re-used internally in the SmartSync library
    // * reauth: auth module for the refresh flow
    Force.init = function(creds, apiVersion, innerForcetkClient, reauth) {
        if (!apiVersion || apiVersion == null) {
            apiVersion = "v28.0";
        }

        if(!innerForcetkClient || innerForcetkClient == null) {
            innerForcetkClient = new forcetk.Client(creds.clientId, creds.loginUrl, creds.proxyUrl, reauth);
            innerForcetkClient.setSessionToken(creds.accessToken, apiVersion, creds.instanceUrl);
            innerForcetkClient.setRefreshToken(creds.refreshToken);
            innerForcetkClient.setUserAgentString(patchUserAgent(creds.userAgent || innerForcetkClient.getUserAgentString()));
        }

        forcetkClient = new Object();
        forcetkClient.impl = innerForcetkClient;
        forcetkClient.create = promiser(innerForcetkClient, "create", "forcetkClient");
        forcetkClient.retrieve = promiser(innerForcetkClient, "retrieve", "forcetkClient");
        forcetkClient.update = promiser(innerForcetkClient, "update", "forcetkClient");
        forcetkClient.del = promiser(innerForcetkClient, "del", "forcetkClient");
        forcetkClient.query = promiser(innerForcetkClient, "query", "forcetkClient");
        forcetkClient.queryMore = promiser(innerForcetkClient, "queryMore", "forcetkClient");
        forcetkClient.search = promiser(innerForcetkClient, "search", "forcetkClient");
        forcetkClient.metadata = promiser(innerForcetkClient, "metadata", "forcetkClient");
        forcetkClient.describe = promiser(innerForcetkClient, "describe", "forcetkClient");
        forcetkClient.describeLayout = promiser(innerForcetkClient, "describeLayout", "forcetkClient");
        forcetkClient.ownedFilesList = promiser(innerForcetkClient, "ownedFilesList", "forcetkClient");
        forcetkClient.filesInUsersGroups = promiser(innerForcetkClient, "filesInUsersGroups", "forcetkClient");
        forcetkClient.filesSharedWithUser = promiser(innerForcetkClient, "filesSharedWithUser", "forcetkClient");
        forcetkClient.fileDetails = promiser(innerForcetkClient, "fileDetails", "forcetkClient");
        forcetkClient.apexrest = promiser(innerForcetkClient, "apexrest", "forcetkClient");

        // Exposing outside
        Force.forcetkClient = forcetkClient;

        if (navigator.smartstore)
        {
            smartstoreClient = new Object();
            smartstoreClient.registerSoup = promiser(navigator.smartstore, "registerSoup", "smartstoreClient");
            smartstoreClient.upsertSoupEntriesWithExternalId = promiser(navigator.smartstore, "upsertSoupEntriesWithExternalId", "smartstoreClient");
            smartstoreClient.querySoup = promiser(navigator.smartstore, "querySoup", "smartstoreClient");
            smartstoreClient.runSmartQuery = promiser(navigator.smartstore, "runSmartQuery", "smartstoreClient");
            smartstoreClient.moveCursorToNextPage = promiser(navigator.smartstore, "moveCursorToNextPage", "smartstoreClient");
            smartstoreClient.removeFromSoup = promiser(navigator.smartstore, "removeFromSoup", "smartstoreClient");
            smartstoreClient.closeCursor = promiser(navigator.smartstore, "closeCursor", "smartstoreClient");
            smartstoreClient.soupExists = promiser(navigator.smartstore, "soupExists", "smartstoreClient");
            smartstoreClient.removeSoup = promiser(navigator.smartstore, "removeSoup", "smartstoreClient");
            smartstoreClient.retrieveSoupEntries = promiser(navigator.smartstore, "retrieveSoupEntries", "smartstoreClient");

            // Exposing outside
            Force.smartstoreClient = smartstoreClient;
        }
    };

    // Force.Error
    // -----------
    // Wrapper around rest errors or conflict errors
    // For rest errors, has fields: type with value RestError, xhr, status and details
    // For conflict errors, has fields: type with value ConflictError, base, theirs, yours, remoteChanges, localChanges, conflictingChanges (see syncRemoteObjectDetectConflict for details)
    //
    Force.Error = function(rawError) {
        // Rest error
        if (_.has(rawError, "responseText")) {
            // 200  “OK” success code, for GET or HEAD request.
            // 201  “Created” success code, for POST request.
            // 204  “No Content” success code, for DELETE request.
            // 300  The value returned when an external ID exists in more than one record. The response body contains the list of matching records.
            // 400  The request couldn’t be understood, usually because the JSON or XML body contains an error.
            // 401  The session ID or OAuth token used has expired or is invalid. The response body contains the message and errorCode.
            // 403  The request has been refused. Verify that the logged-in user has appropriate permissions.
            // 404  The requested resource couldn’t be found. Check the URI for errors, and verify that there are no sharing issues.
            // 405  The method specified in the Request-Line isn’t allowed for the resource specified in the URI.
            // 415  The entity in the request is in a format that’s not supported by the specified method.
            // 500  An error has occurred within Force.com, so the request couldn’t be completed. Contact salesforce.com Customer Support.
            this.type = "RestError";
            this.xhr = rawError;
            this.status = rawError.status;
            try {
                this.details = JSON.parse(rawError.responseText);
            }
            catch (e) {
                console.log("Could not parse responseText:" + e);
            }

        }
        // Conflict error
        else if (_.has(rawError, "remoteChanges")) {
            this.type = "ConflictError";
            _.extend(this, rawError);
        }
    };

    // Force.StoreCache
    // ----------------
    // SmartStore-backed cache
    // Soup elements are expected to have the boolean fields __locally_created__, __locally_updated__ and __locally_deleted__
    // A __local__ boolean field is added automatically on save
    // Index are created for keyField and __local__
    //
    Force.StoreCache = function(soupName, additionalIndexSpecs, keyField) {
        this.soupName = soupName;
        this.keyField = keyField || "Id";
        this.additionalIndexSpecs = additionalIndexSpecs || [];
    };

    _.extend(Force.StoreCache.prototype, {
        // Return promise which initializes backing soup
        init: function() {
            if (smartstoreClient == null) return;
            var indexSpecs = _.union([{path:this.keyField, type:"string"}, {path:"__local__", type:"string"}],
                                     this.additionalIndexSpecs);
            return smartstoreClient.registerSoup(this.soupName, indexSpecs);
        },

        // Return promise which retrieves cached value for the given key
        // When fieldlist is not null, the cached value is only returned when it has all the fields specified in fieldlist
        retrieve: function(key, fieldlist) {
            if (this.soupName == null) return;
            var that = this;
            var querySpec = navigator.smartstore.buildExactQuerySpec(this.keyField, key);
            var record = null;

            var hasFieldPath = function(soupElt, path) {
                var pathElements = path.split(".");
                var o = soupElt;
                for (var i = 0; i<pathElements.length; i++) {
                    var pathElement = pathElements[i];
                    if (!_.has(o, pathElement)) {
                        return false;
                    }
                    o = o[pathElement];
                }
                return true;
            };

            return smartstoreClient.querySoup(this.soupName, querySpec)
                .then(function(cursor) {
                    if (cursor.currentPageOrderedEntries.length == 1) record = cursor.currentPageOrderedEntries[0];
                    return smartstoreClient.closeCursor(cursor);
                })
                .then(function() {
                    // if the cached record doesn't have all the field we are interested in the return null
                    if (record != null && fieldlist != null && _.any(fieldlist, function(field) {
                        return !hasFieldPath(record, field);
                    })) {
                        console.log("----> In StoreCache:retrieve " + that.soupName + ":" + key + ":in cache but missing some fields");
                        record = null;
                    }
                    console.log("----> In StoreCache:retrieve " + that.soupName + ":" + key + ":" + (record == null ? "miss" : "hit"));
                    return record;
                });
        },

        // Return promise which stores a record in cache
        save: function(record, noMerge) {
            if (this.soupName == null) return;
            console.log("----> In StoreCache:save " + this.soupName + ":" + record[this.keyField] + " noMerge:" + (noMerge == true));

            var that = this;

            var mergeIfRequested = function() {
                if (noMerge) {
                    return $.when(record);
                }
                else {
                    return that.retrieve(record[that.keyField])
                        .then(function(oldRecord) {
                            return _.extend(oldRecord || {}, record);
                        });
                }
            };

            return mergeIfRequested()
                .then(function(record) {
                    record = that.addLocalFields(record);
                    return smartstoreClient.upsertSoupEntriesWithExternalId(that.soupName, [ record ], that.keyField)
                })
                .then(function(records) {
                    return records[0];
                });
        },

        // Return promise which stores several records in cache (NB: records are merged with existing records if any)
        saveAll: function(records, noMerge) {
            if (this.soupName == null) return;
            console.log("----> In StoreCache:saveAll records.length=" + records.length + " noMerge:" + (noMerge == true));

            var that = this;

            var mergeIfRequested = function() {
                if (noMerge) {
                    return $.when(records);
                }
                else {
                    if (_.any(records, function(record) { return !_.has(record, that.keyField); })) {
                        throw new Error("Can't merge without " + that.keyField);
                    }

                    var oldRecords = {};
                    var smartSql = "SELECT {" + that.soupName + ":_soup} "
                        + "FROM {" + that.soupName + "} "
                        + "WHERE {" + that.soupName + ":" + that.keyField + "} "
                        + "IN ('" + _.pluck(records, that.keyField).join("','") + "')";

                    var querySpec = navigator.smartstore.buildSmartQuerySpec(smartSql, records.length);

                    return smartstoreClient.runSmartQuery(querySpec)
                        .then(function(cursor) {
                            // smart query result will look like [[soupElt1], ...]
                            cursor.currentPageOrderedEntries = _.flatten(cursor.currentPageOrderedEntries);
                            _.each(cursor.currentPageOrderedEntries, function(oldRecord) {
                                oldRecords[oldRecord[that.keyField]] = oldRecord;
                            });
                            return smartstoreClient.closeCursor(cursor);
                        })
                        .then(function() {
                            return _.map(records, function(record) {
                                var oldRecord = oldRecords[record[that.keyField]];
                                return _.extend(oldRecord || {}, record)
                            });
                        });
                }
            };

            return mergeIfRequested()
                .then(function(records) {
                    records = _.map(records, function(record) {
                        return that.addLocalFields(record);
                    });

                    return smartstoreClient.upsertSoupEntriesWithExternalId(that.soupName, records, that.keyField);
                });
        },


        // Return promise On resolve the promise returns the object
        // {
        //   records: "all the fetched records",
        //   hasMore: "function to check if more records could be retrieved",
        //   getMore: "function to fetch more records",
        //   closeCursor: "function to close the open cursor and disable further fetch"
        // }
        // XXX we don't have totalSize
        find: function(querySpec) {
            var closeCursorIfNeeded = function(cursor) {
                if ((cursor.currentPageIndex + 1) == cursor.totalPages) {
                    return smartstoreClient.closeCursor(cursor).then(function() {
                        return cursor;
                    });
                }
                else {
                    return cursor;
                }
            }

            var buildQueryResponse = function(cursor) {
                return {
                    records: cursor.currentPageOrderedEntries,
                    hasMore: function() {
                        return cursor != null &&
                            (cursor.currentPageIndex + 1) < cursor.totalPages;
                    },

                    getMore: function() {
                        var that = this;
                        if (that.hasMore()) {
                            // Move cursor to the next page and update records property
                            return smartstoreClient.moveCursorToNextPage(cursor)
                            .then(closeCursorIfNeeded)
                            .then(function(c) {
                                cursor = c;
                                that.records = _.union(that.records, cursor.currentPageOrderedEntries);
                                return cursor.currentPageOrderedEntries;
                            });
                        }
                    },

                    closeCursor: function() {
                        return smartstoreClient.closeCursor(cursor)
                            .then(function() { cursor = null; });
                    }
                }
            };

            var runQuery = function(soupName, querySpec) {
                if (querySpec.queryType === "smart") {
                    return smartstoreClient.runSmartQuery(querySpec).then(function(cursor) {
                        // smart query result will look like [[soupElt1], ...]
                        cursor.currentPageOrderedEntries = _.flatten(cursor.currentPageOrderedEntries);
                        return cursor;
                    })
                }
                else {
                    return smartstoreClient.querySoup(soupName, querySpec)
                }
            }

            return runQuery(this.soupName, querySpec)
                .then(closeCursorIfNeeded)
                .then(buildQueryResponse);
        },

        // Return promise which deletes record from cache
        remove: function(key) {
            if (this.soupName == null) return;
            console.log("----> In StoreCache:remove " + this.soupName + ":" + key);
            var that = this;
            var querySpec = navigator.smartstore.buildExactQuerySpec(this.keyField, key);
            var soupEntryId = null;
            return smartstoreClient.querySoup(this.soupName, querySpec)
                .then(function(cursor) {
                    if (cursor.currentPageOrderedEntries.length == 1) {
                        soupEntryId = cursor.currentPageOrderedEntries[0]._soupEntryId;
                    }
                    return smartstoreClient.closeCursor(cursor);
                })
                .then(function() {
                    if (soupEntryId != null) {
                        return smartstoreClient.removeFromSoup(that.soupName, [ soupEntryId ])
                    }
                    return null;
                })
                .then(function() {
                    return null;
                });
        },

        // Return uuid for locally created entry
        makeLocalId: function() {
            return _.uniqueId("local_" + (new Date()).getTime());
        },

        // Return true if id was a locally made id
        isLocalId: function(id) {
            return id != null && id.indexOf("local_") == 0;
        },

        // Add __locally_*__ fields if missing and computed field __local__
        addLocalFields: function(record) {
            record = _.extend({__locally_created__: false, __locally_updated__: false, __locally_deleted__: false}, record);
            record.__local__ =  (record.__locally_created__ || record.__locally_updated__ || record.__locally_deleted__);
            return record;
        }
    });

    // Force.SObjectType
    // -----------------
    // Represent the meta-data of a SObject type on the client
    //
    Force.SObjectType = function (sobjectType, cache) {
        this.sobjectType = sobjectType;
        this.cache = cache;
        this._data = {};
        this._cacheSynced = false;
    };

    _.extend(Force.SObjectType.prototype, (function() {
        //TBD: Should we support cache modes here too.

        /*----- INTERNAL METHODS ------*/
        // Cache actions helper
        // Check first if cache exists and if data exists in cache.
        // Then update the current instance with data from cache.
        var cacheRetrieve = function(that) {
            // Always fetch from the cache again so as to obtain the
            // changes done to the cache by other instances of this SObjectType.
            if (that.cache) {
                return that.cache.retrieve(that.sobjectType)
                        .then(function(data) {
                            if (data) {
                                that._cacheSynced = (data != null);
                                that._data = data;
                            }
                            return that;
                        });
            } else return that;
        };

        // Check first if cache exists.
        // Then save the current instance data to cache.
        var cacheSave = function(that) {
            if (!that._cacheSynced && that.cache) {
                that._data[that.cache.keyField] = that.sobjectType;
                return that.cache.save(that._data).then(function(){
                    that._cacheSynced = true;
                    return that;
                });
            } else return that;
        };

        // Check first if cache exists. If yes, then
        // clear any data from the cache for this sobject type.
        var cacheClear = function(that) {
            if (that.cache) {
                return that.cache.remove(that.sobjectType)
                            .then(function() { return that; });
            } else return that;
        };

        // Server action helper
        // If no describe data exists on the instance, get it from server.
        var serverDescribeUnlessCached = function(that) {
            if(!that._data.describeResult) {
                return forcetkClient.describe(that.sobjectType)
                        .then(function(describeResult) {
                            that._data.describeResult = describeResult;
                            that._cacheSynced = false;
                            return that;
                        });
            } else return that;
        };

        // If no metadata data exists on the instance, get it from server.
        var serverMetadataUnlessCached = function(that) {
            if(!that._data.metadataResult) {
                return forcetkClient.metadata(that.sobjectType)
                        .then(function(metadataResult) {
                            that._data.metadataResult = metadataResult;
                            that._cacheSynced = false;
                            return that;
                        });
            } else return that;
        };

        // If no layout data exists for this record type on the instance,
        // get it from server.
        var serverDescribeLayoutUnlessCached = function(that, recordTypeId) {
            if(!that._data["layoutInfo_" + recordTypeId]) {
                return forcetkClient.describeLayout(that.sobjectType, recordTypeId)
                        .then(function(layoutResult) {
                            that._data["layoutInfo_" + recordTypeId] = layoutResult;
                            that._cacheSynced = false;
                            return that;
                        });
            } else return that;
        };

        /*----- EXTERNAL METHODS ------*/
        return {
            // Returns a promise, which once resolved
            // returns describe data of the sobject.
            describe: function() {
                var that = this;
                if (that._data.describeResult) return $.when(that._data.describeResult);
                else return $.when(cacheRetrieve(that))
                        .then(serverDescribeUnlessCached)
                        .then(cacheSave)
                        .then(function() {
                            return that._data.describeResult;
                        });
            },
            // Returns a promise, which once resolved
            // returns metadata of the sobject.
            getMetadata: function() {
                var that = this;
                if (that._data.metadataResult) return $.when(that._data.metadataResult);
                else return $.when(cacheRetrieve(that))
                        .then(serverMetadataUnlessCached)
                        .then(cacheSave)
                        .then(function() {
                            return that._data.metadataResult;
                        });
            },
            // Returns a promise, which once resolved
            // returns layout information associated
            // to a particular record type.
            // @param recordTypeId (Default: 012000000000000AAA)
            describeLayout: function(recordTypeId) {
                var that = this;
                // Defaults to Record type id of Master
                if (!recordTypeId) recordTypeId = '012000000000000AAA';
                if (that._data["layoutInfo_" + recordTypeId]) {
                    return $.when(that._data["layoutInfo_" + recordTypeId]);
                }

                return $.when(cacheRetrieve(that), recordTypeId)
                        .then(serverDescribeLayoutUnlessCached)
                        .then(cacheSave)
                        .then(function() {
                            return that._data["layoutInfo_" + recordTypeId];
                        });
            },
            // Returns a promise, which once resolved clears
            // the cached data for the current sobject type.
            reset: function() {
                var that = this;
                that._cacheSynced = false;
                that._data = {};
                return $.when(cacheClear(that));
            }
        }
    })());


    // Force.syncRemoteObjectWithCache
    // -------------------------------
    // Helper method to do any single record CRUD operation against cache
    // * method:<create, read, delete or update>
    // * id:<record id or null during create>
    // * attributes:<map field name to value>  record attributes given by a map of field name to value
    // * fieldlist:<fields>                    fields to fetch for read  otherwise full record is fetched, fields to save for update or create (required)
    // * cache:<cache object>                  cache into which  created/read/updated/deleted record are cached
    // * localAction:true|false                pass true if the change is done against the cache only (and has not been done against the server)
    //
    // Returns a promise
    //
    Force.syncRemoteObjectWithCache = function(method, id, attributes, fieldlist, cache, localAction) {
        console.log("---> In Force.syncRemoteObjectWithCache:method=" + method + " id=" + id);

        localAction = localAction || false;
        var isLocalId = cache.isLocalId(id);
        var targetedAttributes = (fieldlist == null ? attributes : (attributes == null ? null : _.pick(attributes, fieldlist)));

        // Cache actions helper
        var cacheCreate = function() {
            var data = _.extend(targetedAttributes,
                                {__locally_created__:localAction,
                                 __locally_updated__:false,
                                 __locally_deleted__:false});
            data[cache.keyField] = (localAction ? cache.makeLocalId() : id);
            return cache.save(data);
        };

        var cacheRead = function() {
            return cache.retrieve(id, fieldlist)
                .then(function(data) {
                    return data;
                });
        };

        var cacheUpdate = function() {
            var data = _.extend(targetedAttributes,
                                {__locally_created__: isLocalId,
                                 __locally_updated__: localAction,
                                 __locally_deleted__: false});
            data[cache.keyField] = id;
            return cache.save(data);
        };

        var cacheDelete = function() {
            if (!localAction || isLocalId) {
                return cache.remove(id);
            }
            else {
                var data = {__locally_deleted__:true};
                data[cache.keyField] = id;
                return cache.save(data)
                    .then(function() {
                        return null;
                    });
            }
        };

        // Chaining promises that return either a promise or created/upated/reda model attributes or null in the case of delete
        var promise = null;
        switch(method) {
        case "create": promise = cacheCreate(); break;
        case "read":   promise = cacheRead();   break;
        case "update": promise = cacheUpdate(); break;
        case "delete": promise = cacheDelete(); break;
        }

        return promise;
    };


    // Force.syncSObjectWithServer
    // ---------------------------
    // Helper method to do any single record CRUD operation against Salesforce server via REST API
    // * method:<create, read, delete or update>
    // * sobjectType:<record type>
    // * id:<record id or null during create>
    // * attributes:<map field name to value>  record attributes given by a map of field name to value
    // * fieldlist:<fields>                    fields to fetch for read, fields to save for update or create (required)
    //
    // Returns a promise
    //
    Force.syncSObjectWithServer = function(method, sobjectType, id, attributes, fieldlist) {
        console.log("---> In Force.syncSObjectWithServer:method=" + method + " id=" + id);

        // Server actions helper
        var serverCreate   = function() {
            var attributesToSave = _.pick(attributes, fieldlist);
            return forcetkClient.create(sobjectType, _.omit(attributesToSave, "Id"))
                .then(function(resp) {
                    return _.extend(attributes, {Id: resp.id});
                })
        };

        var serverRetrieve = function() {
            return forcetkClient.retrieve(sobjectType, id, fieldlist);
        };

        var serverUpdate   = function() {
            var attributesToSave = _.pick(attributes, fieldlist);
            return forcetkClient.update(sobjectType, id, _.omit(attributesToSave, "Id"))
                .then(function(resp) {
                    return attributes;
                })
        };

        var serverDelete   = function() {
            return forcetkClient.del(sobjectType, id)
                .then(function(resp) {
                    return null;
                })
        };

        // Chaining promises that return either a promise or created/upated/read model attributes or null in the case of delete
        var promise = null;
        switch(method) {
        case "create": promise = serverCreate(); break;
        case "read":   promise = serverRetrieve(); break;
        case "update": promise = serverUpdate(); break;
        case "delete": promise = serverDelete(); break; /* XXX on 404 (record already deleted) we should not fail otherwise cache won't get cleaned up */
        }

        return promise;

    };

    // Force.syncApexRestObjectWithServer
    // ----------------------------------
    // Helper method to do any single Apex Rest object CRUD operation against Salesforce server
    // * method:<create, read, delete or update>
    // * path:<apex rest resource path relative to /services/apexrest>
    // * idField:<id field>
    // * id:<record id or null during create>
    // * attributes:<map field name to value>  record attributes given by a map of field name to value
    // * fieldlist:<fields>                    fields to fetch for read, fields to save for update or create (required)
    //
    // Returns a promise
    //
    Force.syncApexRestObjectWithServer = function(method, path, id, idField, attributes, fieldlist) {
        console.log("---> In Force.syncApexRestObjectWithServer:method=" + method + " id=" + id);

        // Server actions helper
        var serverCreate   = function() {
            var attributesToSave = _.pick(attributes, fieldlist);
            return forcetkClient.apexrest(path, "POST", JSON.stringify(_.omit(attributesToSave, idField)), null)
                .then(function(resp) {
                    var idMap = {};
                    idMap[idField] = resp[idField];
                    return _.extend(attributes, idMap);
                })
        };

        var serverRetrieve = function() {
            var fields = fieldlist ? '?fields=' + fieldlist : '';
            return forcetkClient.apexrest(path + "/" + id + fields, "GET", null, null);
        };

        var serverUpdate   = function() {
            var attributesToSave = _.pick(attributes, fieldlist);
            return forcetkClient.apexrest(path + "/" + id, "PATCH", JSON.stringify(attributesToSave), null)
                .then(function(resp) {
                    return attributes;
                })
        };

        var serverDelete   = function() {
            return forcetkClient.apexrest(path + "/" + id, "DELETE", null, null)
                .then(function(resp) {
                    return null;
                })
        };

        // Chaining promises that return either a promise or created/upated/read model attributes or null in the case of delete
        var promise = null;
        switch(method) {
        case "create": promise = serverCreate(); break;
        case "read":   promise = serverRetrieve(); break;
        case "update": promise = serverUpdate(); break;
        case "delete": promise = serverDelete(); break;
        }

        return promise;

    };

    // Force.CACHE_MODE
    // -----------------
    // - SERVER_ONLY:  don't involve cache
    // - CACHE_FIRST:  don't involve server
    // - SERVER_ONLY:  during a read, the cache is queried first, and the server is only queried if the cache misses
    // - SERVER_FIRST: then the server is queried first and the cache is updated afterwards
    //
    Force.CACHE_MODE = {
        CACHE_ONLY: "cache-only",
        CACHE_FIRST: "cache-first",
        SERVER_ONLY: "server-only",
        SERVER_FIRST: "server-first"
    };

    // Force.syncRemoteObject
    // ---------------------
    // Combines syncWithServer (passed as argument) and Force.syncRemoteObjectWithCache
    // * cache:<cache object>
    // * cacheMode:<any Force.CACHE_MODE values>
    // * syncWithServer: function taking method, id, attributes, fieldlist arguments to do CRUD operation against a server (see Force.syncSObjectWithServer for an example)
    //
    // If cache is null, it simply syncWithServer
    // Otherwise behaves according to the cacheMode
    //
    // Returns a promise
    //
    //
    Force.syncRemoteObject = function(method, id, attributes, fieldlist, cache, cacheMode, info, syncWithServer) {
        console.log("--> In Force.syncRemoteObject:method=" + method + " id=" + id + " cacheMode=" + cacheMode);

        var cacheSync = function(method, id, attributes, fieldlist, localAction) {
            return Force.syncRemoteObjectWithCache(method, id, attributes, fieldlist, cache, localAction);
        };

        var serverSync = function(method, id) {
            return syncWithServer(method, id, attributes, fieldlist);
        };

        // Server only
        if (cache == null || cacheMode == Force.CACHE_MODE.SERVER_ONLY) {
            return serverSync(method, id);
        }

        // Cache only
        if (cache != null && cacheMode == Force.CACHE_MODE.CACHE_ONLY) {
            return cacheSync(method, id, attributes, null, true);
        }

        // Chaining promises that return either a promise or created/upated/reda model attributes or null in the case of delete
        var promise = null;

        // To keep track of whether data was read from cache or not
        info = info || {};
        info.wasReadFromCache = false;

        // Go to cache first
        if (cacheMode == Force.CACHE_MODE.CACHE_FIRST) {
            if (method == "create" || method == "update" || method == "delete") {
                throw new Error("Can't " + method + " with cacheMode " + cacheMode);
            }
            promise = cacheSync(method, id, attributes, fieldlist)
                .then(function(data) {
                    info.wasReadFromCache = (data != null);
                    if (!info.wasReadFromCache) {
                        // Not found in cache, go to server
                        return serverSync(method, id);
                    }
                    return data;
                });
        }
        // Go to server first
        else if (cacheMode == Force.CACHE_MODE.SERVER_FIRST || cacheMode == null /* no cacheMode specified means server-first */) {
            if (cache.isLocalId(id)) {
                if (method == "read" || method == "delete") {
                    throw new Error("Can't " + method + " on server for a locally created record");
                }

                // For locally created record, we need to do a create on the server
                var createdData;
                promise = serverSync("create", null)
                .then(function(data) {
                    createdData = data;
                    // Then we need to get rid of the local record with locally created id
                    return cacheSync("delete", id);
                })
                .then(function() {
                    return createdData;
                });
            }
            else {
                promise = serverSync(method, id);
            }
        }

        // Write back to cache if not read from cache
        promise = promise.then(function(data) {
            if (!info.wasReadFromCache) {
                var targetId = (method == "create" || cache.isLocalId(id) /* create as far as the server goes but update as far as the cache goes*/ ? data.Id : id);
                var targetMethod = (method == "read" ? "update" /* we want to write to the cache what was read from the server */: method);
                return cacheSync(targetMethod, targetId, data);
            }
            return data;
        });

        // Done
        return promise;
    };

    // Force.syncSObject
    // -----------------
    // Calls Force.syncRemoteObject using Force.syncSObjectWithServer to get the data from the server
    //
    // Returns a promise
    //
    //
    Force.syncSObject = function(method, sobjectType, id, attributes, fieldlist, cache, cacheMode, info) {
        console.log("--> In Force.syncSObject:method=" + method + " id=" + id + " cacheMode=" + cacheMode);

        var syncWithServer = function(method, id, attributes, fieldlist) {
            return Force.syncSObjectWithServer(method, sobjectType, id, attributes, fieldlist);
        };

        return Force.syncRemoteObject(method, id, attributes, fieldlist, cache, cacheMode, info, syncWithServer);
    };

    // Force.MERGE_MODE
    // -----------------
    //   If we call "theirs" the current server record, "yours" the locally modified record, "base" the server record that was originally fetched:
    //   - OVERWRITE               write "yours" back to server -- not checking "theirs" or "base"
    //   - MERGE_ACCEPT_YOURS      merge "theirs" and "yours" -- if the same field were changed locally and remotely, the local value is kept
    //   - MERGE_FAIL_IF_CONFLICT  merge "theirs" and "yours" -- if the same field were changed locally and remotely, the operation fails
    //   - MERGE_FAIL_IF_CHANGED   merge "theirs" and "yours" -- if any field were changed remotely, the operation fails
    //
    Force.MERGE_MODE = {
        OVERWRITE: "overwrite",
        MERGE_ACCEPT_YOURS: "merge-accept-yours",
        MERGE_FAIL_IF_CONFLICT: "merge-fail-if-conflict",
        MERGE_FAIL_IF_CHANGED: "merge-fail-if-changed"
    };

    // Force.syncRemoteObjectDetectConflict
    // ------------------------------------
    //
    // Helper method that adds conflict detection to syncRemoteObject
    // * cacheForOriginals:<cache object> cache where originally fetched SObject are stored
    // * mergeMode:<any Force.MERGE_MODE values>
    // * syncWithServer: function taking method, id, attributes, fieldlist arguments to do CRUD operation against a server (see Force.syncSObjectWithServer for an example)
    //
    // If cacheForOriginals is null, it simply calls syncRemoteObject
    // If cacheForOriginals is not null,
    // * on create, it calls Force.syncRemoteObject then stores a copy of the newly created record in cacheForOriginals
    // * on retrieve, it calls Force.syncRemoteObject then stores a copy of retrieved record in cacheForOriginals
    // * on update, it gets the current server record and compares it with the original cached locally, it then proceeds according to the merge mode
    // * on delete, it gets the current server record and compares it with the original cached locally, it then proceeds according to the merge mode
    //
    // Returns a promise
    // A rejected promise is returned if the server record has changed
    // {
    //   base: <originally fetched attributes>,
    //   theirs: <latest server attributes>,
    //   yours:<locally modified attributes>,
    //   remoteChanges:<fields changed between base and theirs>,
    //   localChanges:<fields changed between base and yours>
    //   conflictingChanges:<fields changed both in theirs and yours with different values>
    // }
    //
    Force.syncRemoteObjectDetectConflict = function(method, id, attributes, fieldlist, cache, cacheMode, cacheForOriginals, mergeMode, syncWithServer) {
        console.log("--> In Force.syncRemoteObjectDetectConflict:method=" + method + " id=" + id + " cacheMode=" + cacheMode + " mergeMode=" + mergeMode);

        // To keep track of whether data was read from cache or not
        var info = {};


        var syncRemoteObject = function(attributes) {
            return Force.syncRemoteObject(method, id, attributes, fieldlist, cache, cacheMode, info, syncWithServer);
        };

        var serverRetrieve = function() {
            return syncWithServer("read", id, null, fieldlist);
        };

        // Original cache required for conflict detection
        if (cacheForOriginals == null) {
            return syncRemoteObject(attributes);
        }

        // Original cache actions -- does nothing for local actions
        var cacheForOriginalsRetrieve = function(data) {
            return cacheForOriginals.retrieve(id);
        };

        var cacheForOriginalsSave = function(data) {
            return (cacheMode == Force.CACHE_MODE.CACHE_ONLY || data.__local__ /* locally changed: don't write to cacheForOriginals */
                    || (method == "read" && cacheMode == Force.CACHE_MODE.CACHE_FIRST && info.wasReadFromCache) /* read from cache: don't write to cacheForOriginals */)
                ? data
                : cacheForOriginals.save(data);
        };

        var cacheForOriginalsRemove = function() {
            return (cacheMode == Force.CACHE_MODE.CACHE_ONLY
                    ? null : cacheForOriginals.remove(id));
        };

        // Given two maps, return keys that are different
        var identifyChanges = function(attrs, otherAttrs) {
            return _.filter(_.intersection(fieldlist, _.union(_.keys(attrs), _.keys(otherAttrs))),
                            function(key) {
                                return (attrs[key] || "") != (otherAttrs[key] || ""); // treat "", undefined and null the same way
                            });
        };

        // When conflict is detected (according to mergeMode), the promise is failed, otherwise syncRemoteObject() is invoked
        var checkConflictAndSync = function() {
            var originalAttributes;

            // Merge mode is overwrite or local action or locally created -- no conflict check needed
            if (mergeMode == Force.MERGE_MODE.OVERWRITE || mergeMode == null /* no mergeMode specified means overwrite */
                || cacheMode == Force.CACHE_MODE.CACHE_ONLY
                || (cache != null && cache.isLocalId(id)))
            {
                return syncRemoteObject(attributes);
            }

            // Otherwise get original copy, get latest server and compare
            return cacheForOriginalsRetrieve()
                .then(function(data) {
                    originalAttributes = data;
                    return (originalAttributes == null ? null /* don't waste time going to server */: serverRetrieve());
                })
                .then(function(remoteAttributes) {
                    var shouldFail = false;

                    if (remoteAttributes == null || originalAttributes == null) {
                        return syncRemoteObject(attributes);
                    }
                    else {
                        var localChanges = identifyChanges(originalAttributes, attributes);
                        var localVsRemoteChanges = identifyChanges(attributes, remoteAttributes);
                        var remoteChanges = identifyChanges(originalAttributes, remoteAttributes);
                        var conflictingChanges = _.intersection(remoteChanges, localChanges, localVsRemoteChanges);
                        var nonConflictingRemoteChanges = _.difference(remoteChanges, conflictingChanges);

                        switch(mergeMode) {
                        case Force.MERGE_MODE.MERGE_ACCEPT_YOURS:     shouldFail = false; break;
                        case Force.MERGE_MODE.MERGE_FAIL_IF_CONFLICT: shouldFail = conflictingChanges.length > 0; break;
                        case Force.MERGE_MODE.MERGE_FAIL_IF_CHANGED:  shouldFail = remoteChanges.length > 0; break;
                        }
                        if (shouldFail) {
                            var conflictDetails = {base: originalAttributes, theirs: remoteAttributes, yours:attributes, remoteChanges:remoteChanges, localChanges:localChanges, conflictingChanges:conflictingChanges};
                            return $.Deferred().reject(conflictDetails);
                        }
                        else {
                            var mergedAttributes = _.extend(attributes, _.pick(remoteAttributes, nonConflictingRemoteChanges));
                            return syncRemoteObject(mergedAttributes);
                        }
                    }
                });
        };

        var promise = null;
        switch(method) {
        case "create": promise = syncRemoteObject(attributes).then(cacheForOriginalsSave); break;
        case "read":   promise = syncRemoteObject(attributes).then(cacheForOriginalsSave); break;
        case "update": promise = checkConflictAndSync().then(cacheForOriginalsSave); break;
        case "delete": promise = checkConflictAndSync().then(cacheForOriginalsRemove); break;
        }

        // Done
        return promise;
    };

    // Force.syncSObjectDetectConflict
    // -------------------------------
    // Calls Force.syncRemoteObjectDetectConflict using Force.syncSObjectWithServer to get the data from the server
    //
    // Returns a promise
    //
    //
    Force.syncSObjectDetectConflict = function(method, sobjectType, id, attributes, fieldlist, cache, cacheMode, cacheForOriginals, mergeMode) {
        console.log("--> In Force.syncSyncSObjectDetectConflict:method=" + method + " id=" + id + " cacheMode=" + cacheMode + " mergeMode=" + mergeMode);

        var syncWithServer = function(method, id, attributes, fieldlist) {
            return Force.syncSObjectWithServer(method, sobjectType, id, attributes, fieldlist);
        };

        return Force.syncRemoteObjectDetectConflict(method, id, attributes, fieldlist, cache, cacheMode, cacheForOriginals, mergeMode, syncWithServer);
    };

    // Force.fetchSObjectsFromServer
    // -----------------------------
    // Helper method to fetch a collection of SObjects from server, using SOQL, SOSL or MRU
    // * config: {type:"soql", query:"<soql query>"}
    //   or {type:"sosl", query:"<sosl query>"}
    //   or {type:"mru", sobjectType:"<sobject type>", fieldlist:"<fields to fetch>"[, orderBy:"<field to sort by>", orderDirection:"<ASC|DESC>"]}
    //
    // Return promise On resolve the promise returns the object
    // {
    //   totalSize: "total size of matched records",
    //   records: "all the fetched records",
    //   hasMore: "function to check if more records could be retrieved",
    //   getMore: "function to fetch more records",
    //   closeCursor: "function to close the open cursor and disable further fetch"
    // }
    //
    Force.fetchSObjectsFromServer = function(config) {
        console.log("---> In Force.fetchSObjectsFromServer:config=" + JSON.stringify(config));

        // Server actions helper
        var serverSoql = function(soql) {
            return forcetkClient.query(soql)
                .then(function(resp) {
                    var nextRecordsUrl = resp.nextRecordsUrl;
                    return {
                        totalSize: resp.totalSize,
                        records: resp.records,
                        hasMore: function() { return nextRecordsUrl != null; },
                        getMore: function() {
                            var that = this;
                            if (!nextRecordsUrl) return null;
                            return forcetkClient.queryMore(nextRecordsUrl).then(function(resp) {
                                nextRecordsUrl = resp.nextRecordsUrl;
                                that.records.pushObjects(resp.records);
                                return resp.records;
                            });
                        },
                        closeCursor: function() {
                            return $.when(function() { nextRecordsUrl = null; });
                        }
                    };
                });
        };

        var serverSosl = function(sosl) {
            return forcetkClient.search(sosl).then(function(resp) {
                return {
                    records: resp,
                    totalSize: resp.length,
                    hasMore: function() { return false; }
                }
            })
        };

        var serverMru = function(sobjectType, fieldlist, orderBy, orderDirection) {
            return forcetkClient.metadata(sobjectType)
                .then(function(resp) {
                    //Only do query if the fieldList is provided.
                    if (fieldlist) {
                        var soql = "SELECT " + fieldlist.join(",")
                            + " FROM " + sobjectType
                            + " WHERE Id IN ('" + _.pluck(resp.recentItems, "Id").join("','") + "')"
                            + (orderBy ? " ORDER BY " + orderBy : "")
                            + (orderDirection ? " " + orderDirection : "");
                        return serverSoql(soql);
                    } else return {
                        records: resp.recentItems,
                        totalSize: resp.recentItems.length,
                        hasMore: function() { return false; }
                    };
                });
        };

        var promise = null;
        switch(config.type) {
        case "soql": promise = serverSoql(config.query); break;
        case "sosl": promise = serverSosl(config.query); break;
        case "mru":  promise = serverMru(config.sobjectType, config.fieldlist, config.orderBy, config.orderDirection); break;
        // XXX what if we fall through the switch
        }

        return promise;
    };

    // Force.fetchApexRestObjectsFromServer
    // ------------------------------------
    // Helper method to fetch a collection of Apex Rest objects from server
    // * config: {apexRestPath:"<apex rest path>", params:<map of parameters for the query string>}
    //
    // The Apex Rest endpoint is expected to return a response of the form
    // {
    //   totalSize: <number of records returned>
    //   records: <all fetched records>
    //   nextRecordsUrl: <url to get next records or null>
    //
    // }
    //
    // Return promise On resolve the promise returns the object
    // {
    //   totalSize: "total size of matched records",
    //   records: "all the fetched records",
    //   hasMore: "function to check if more records could be retrieved",
    //   getMore: "function to fetch more records",
    //   closeCursor: "function to close the open cursor and disable further fetch"
    // }
    //
    Force.fetchApexRestObjectsFromServer = function(config) {
        console.log("---> In Force.fetchApexRestObjectsFromServer:config=" + JSON.stringify(config));

        // Server actions helper
        var serverFetch = function(apexRestPath) {
            var path = apexRestPath + "?" + $.param(config.params);
            return forcetkClient.apexrest(path, "GET", null, null)
                .then(function(resp) {
                    var nextRecordsUrl = resp.nextRecordsUrl;
                    return {
                        totalSize: resp.totalSize,
                        records: resp.records,
                        hasMore: function() { return nextRecordsUrl != null; },
                        getMore: function() {
                            var that = this;
                            if (!nextRecordsUrl) return null;
                            return forcetkClient.queryMore(nextRecordsUrl).then(function(resp) {
                                nextRecordsUrl = resp.nextRecordsUrl;
                                that.records.pushObjects(resp.records);
                                return resp.records;
                            });
                        },
                        closeCursor: function() {
                            return $.when(function() { nextRecordsUrl = null; });
                        }
                    };
                });
        };

        return serverFetch(config.apexRestPath, config.params);
    };

    // Force.fetchRemoteObjects
    // ------------------------
    // Helper method combining fetchFromServer and fetchFromCache (both passed in as arguments)
    // If cache is null, it simply calls fetchFromServer
    // If cache is not null and cacheMode is Force.CACHE_MODE.CACHE_ONLY then it simply calls fetchFromCache
    // Otherwise, the server is queried first and the cache is updated afterwards
    //
    // * fetchFromServer: function taking no arguments and fetching the remote objects from the server (see Force.fetchSObjectsFromServer for an example)
    // * fetchFromCache: function taking no arguments and fetching the remote objects from the cache
    //
    // Returns a promise
    //
    Force.fetchRemoteObjects = function(fetchFromServer, fetchFromCache, cacheMode, cache, cacheForOriginals) {
        console.log("--> In Force.fetchRemoteObjects:cacheMode=" + cacheMode);

        var promise;

        if (cache != null && cacheMode == Force.CACHE_MODE.CACHE_ONLY) {
            promise = fetchFromCache();

        } else {

            promise = fetchFromServer();

            if (cache != null) {

                var fetchResult;
                var processResult = function(resp) {
                    fetchResult = resp;
                    return resp.records;
                };

                var cacheSaveAll = function(records) {
                    return cache.saveAll(records);
                };

                var cacheForOriginalsSaveAll = function(records) {
                    return cacheForOriginals != null ? cacheForOriginals.saveAll(records) : records;
                };

                var setupGetMore = function(records) {
                    return _.extend(fetchResult,
                                    {
                                        records: records,
                                        getMore: function() {
                                            return fetchResult.getMore().then(cacheSaveAll).then(cacheForOriginalsSaveAll);
                                        }
                                    });
                };

                promise = promise
                    .then(processResult)
                    .then(cacheSaveAll)
                    .then(cacheForOriginalsSaveAll)
                    .then(setupGetMore);
            }
        }

        return promise;
    };


    // Force.fetchSObjects
    // -------------------
    // Calls Force.fetchRemoteObjects using Force.fetchSObjectsFromServer to get the data from the server
    //
    // Returns a promise
    //
    Force.fetchSObjects = function(config, cache, cacheForOriginals) {
        console.log("--> In Force.fetchSObjects:config.type=" + config.type);

        var fetchFromServer = function() {
            return Force.fetchSObjectsFromServer(config);
        };

        var fetchFromCache = function() {
            return cache.find(config.cacheQuery);
        };

        var cacheMode = (config.type == "cache" ? Force.CACHE_MODE.CACHE_ONLY : Force.CACHE_MODE.SERVER_FIRST);

        return Force.fetchRemoteObjects(fetchFromServer, fetchFromCache, cacheMode, cache, cacheForOriginals);
    };

    if (!_.isUndefined(Backbone)) {


        // Force.RemoteObject
        // ------------------
        // Abstract subclass of Backbone.Model to represent a remote object on the client
        //
        Force.RemoteObject = Backbone.Model.extend({
            // Used if none is passed during sync call - can be a string or a function taking the method and returning a string
            fieldlist:null,

            // Used if none is passed during sync call - can be a string or a function taking the method and returning a string
            cacheMode:null,

            // Used if none is passed during sync call - can be a string or a function taking the method and returning a string
            mergeMode:null,

            // Used if none is passed during sync call - can be a cache object or a function returning a cache object
            cache: null,

            // Used if none is passed during sync call - can be a cache object or a function returning a cache object
            cacheForOriginals: null,

            // To be defined in concrete subclass
            syncRemoteObjectWithServer: function(method, id, attributes, fieldlist) {
                return $.when([]);
            },

            // Overriding Backbone sync method (responsible for all server interactions)
            //
            // Extra options (can also be defined as properties of the model object)
            // * fieldlist:<array of fields> during read if you don't want to fetch the whole record, during save fields to save
            // * cache:<cache object>
            // * cacheMode:<any Force.CACHE_MODE values>
            // * cacheForOriginals:<cache object>
            // * mergeMode:<any Force.MERGE_MODE values>
            //
            sync: function(method, model, options) {
                var that = this;
                var resolveOption = function(optionName) {
                    return options[optionName] || (_.isFunction(that[optionName]) ? that[optionName](method) : that[optionName]);
                };

                console.log("-> In Force.RemoteObject:sync method=" + method + " model.id=" + model.id);

                var fieldlist         = resolveOption("fieldlist");
                var cacheMode         = resolveOption("cacheMode");
                var mergeMode         = resolveOption("mergeMode");
                var cache             = resolveOption("cache");
                var cacheForOriginals = resolveOption("cacheForOriginals");

                var syncWithServer = function(method, id, attributes, fieldlist) {
                    return that.syncRemoteObjectWithServer(method, id, attributes, fieldlist);
                };

                Force.syncRemoteObjectDetectConflict(method, model.id, model.attributes, fieldlist, cache, cacheMode, cacheForOriginals, mergeMode, syncWithServer)
                    .done(options.success)
                    .fail(options.error);
            }
        });


        // Force.SObject
        // --------------
        // Subclass of Force.RemoteObject to represent a SObject on the client (fetch/save/delete update server through the REST API and or cache)
        //
        Force.SObject = Force.RemoteObject.extend({
            // sobjectType is expected on every instance
            sobjectType:null,

            // Id is the id attribute
            idAttribute: 'Id',

            syncRemoteObjectWithServer: function(method, id, attributes, fieldlist) {
                return Force.syncSObjectWithServer(method, this.sobjectType, id, attributes, fieldlist);
            }
        });

        // Force.ApexRestObject
        // --------------------
        // Subclass of Force.RemoteObject to represent a Apex Rest object on the client (fetch/save/delete update server through the Apex Rest API and or cache)
        //
        Force.ApexRestObject = Force.RemoteObject.extend({
            // apexRestPath is expected on every instance
            apexRestPath:null,

            // Id is the id attribute
            idAttribute: 'Id',

            syncRemoteObjectWithServer: function(method, id, attributes, fieldlist) {
                return Force.syncApexRestObjectWithServer(method, this.apexRestPath, id, this.idAttribute, attributes, fieldlist);
            }
        });


        // Force.RemoteObjectCollection
        // ----------------------------
        // Abstract subclass of Backbone.Collection to represent a collection of remote objects on the client.
        // Only fetch is supported (no create/update or delete).
        // To define the set of remote object to fetch, provide a implementation for the method fetchRemoteObjectFromServer
        // Where the config is
        // config: {type:"cache", cacheQuery:<cache query>[, closeCursorImmediate:<true|false(default)>]} or something else understood by the fetchRemoteObjectFromServer method of your subclass
        Force.RemoteObjectCollection = Backbone.Collection.extend({
            // To be defined in concrete subclass
            model: null,

            // Used if none is passed during sync call - can be a cache object or a function returning a cache object
            cache: null,

            // Used if none is passed during sync call - can be a cache object or a function returning a cache object
            cacheForOriginals: null,

            // To be defined in concrete subclass
            fetchRemoteObjectFromServer: function(config) {
                return $.when([]);
            },

            // Method to fetch remote objects from cache
            fetchRemoteObjectsFromCache: function(cache, cacheQuery) {
                return cache.find(cacheQuery);
            },

            // Method to check if the current collection has more data to fetch
            hasMore: function() {
                return this._fetchResponse ? this._fetchResponse.hasMore() : false;
            },

            // Method to fetch more records if there's an open cursor
            getMore: function() {
                var that = this;
                if (that.hasMore())
                    return that._fetchResponse.getMore()
                        .then(function(records) {
                            that.add(records);
                            return records;
                        });
                else return $.when([]);
            },

            // Close any open cursors to fetch more records.
            closeCursor: function() {
                return $.when(!this.hasMore() || that._fetchResponse.closeCursor());
            },

            // Overriding Backbone sync method (responsible for all server interactions)
            // Extra options (can also be defined as properties of the model object)
            // * config:<see above for details>
            // * cache:<cache object>
            sync: function(method, model, options) {
                console.log("-> In Force.RemoteObjectCollection:sync method=" + method);
                var that = this;

                if (method != "read") {
                    throw new Error("Method " + method  + " not supported");
                }

                var config = options.config || _.result(this, "config");
                var cache = options.cache   || _.result(this, "cache");
                var cacheForOriginals = options.cacheForOriginals || _.result(this, "cacheForOriginals");

                if (config == null) {
                    options.success([]);
                    return;
                }

                var fetchFromServer = function() {
                    return that.fetchRemoteObjectsFromServer(config);
                };

                var fetchFromCache = function() {
                    return that.fetchRemoteObjectsFromCache(cache, config.cacheQuery);
                };

                var cacheMode = (config.type == "cache" ? Force.CACHE_MODE.CACHE_ONLY : Force.CACHE_MODE.SERVER_FIRST);

                options.reset = true;
                Force.fetchRemoteObjects(fetchFromServer, fetchFromCache, cacheMode, cache, cacheForOriginals)
                    .then(function(resp) {
                        that._fetchResponse = resp;
                        if (config.closeCursorImmediate) that.closeCursor();
                        return resp.records;
                    })
                    .done(options.success)
                    .fail(options.error);
            },

            // Overriding Backbone parse method (responsible for parsing server response)
            parse: function(resp, options) {
                var that = this;
                return _.map(resp, function(result) {
                    var remoteObject = new that.model(result);
                    return remoteObject;
                });
            }
        });

        // Force.SObjectCollection
        // -----------------------
        // Subclass of Force.RemoteObjectCollection to represent a collection of SObject's on the client.
        // Only fetch is supported (no create/update or delete).
        // To define the set of SObject's to fetch pass an options.config or set the config property on this collection object.
        // Where the config is
        // config: {type:"soql", query:"<soql query>"}
        //   or {type:"sosl", query:"<sosl query>"}
        //   or {type:"mru", sobjectType:"<sobject type>", fieldlist:"<fields to fetch>"[, orderBy:"<field to sort by>", orderDirection:"<ASC|DESC>"]}
        //   or {type:"cache", cacheQuery:<cache query>[, closeCursorImmediate:<true|false(default)>]}
        //
        Force.SObjectCollection = Force.RemoteObjectCollection.extend({
            model: Force.SObject,

            fetchRemoteObjectsFromServer: function(config) {
                return Force.fetchSObjectsFromServer(config);
            },

            // Overriding Backbone parse method (responsible for parsing server response)
            parse: function(resp, options) {
                var that = this;
                return _.map(resp, function(result) {
                    var sobjectType = result.attributes.type;
                    var sobject = new that.model(result);
                    sobject.sobjectType = sobjectType;
                    return sobject;
                });
            }
        });


        // Force.ApexRestObjectCollection
        // ------------------------------
        // Subclass of Force.RemoteObjectCollection to represent a collection of Apex Rest object's on the client.
        // Only fetch is supported (no create/update or delete).
        // To define the set of Apex rRest's to fetch pass an options.config or set the config property on this collection object.
        // Where the config is
        // config: {apexRestPath:"<apex rest path>", params:<map of parameters for the query string>}
        //   or {type:"cache", cacheQuery:<cache query>[, closeCursorImmediate:<true|false(default)>]}
        //
        // The Apex Rest endpoint is expected to return a response of the form
        // {
        //   totalSize: <number of records returned>
        //   records: <all fetched records>
        //   nextRecordsUrl: <url to get next records or null>
        //
        // }
        //
        Force.ApexRestObjectCollection = Force.RemoteObjectCollection.extend({
            model: Force.ApexRestObject,

            fetchRemoteObjectsFromServer: function(config) {
                return Force.fetchApexRestObjectsFromServer(config);
            }
        });


    } // if (!_.isUndefined(Backbone)) {
})
.call(this, jQuery, _, Backbone, forcetk);
;
(function($) {

    "use strict";

    // The top level namespace
    var SFDC = window.SFDC || {};
    var initialized = false;
    var readyDeferred = $.Deferred();

    var authenticator = function(client, callback, error) {
        if (readyDeferred.state() != 'pending') {
            readyDeferred = $.Deferred();
            SFDC.launcher = readyDeferred.promise();
        }
        SFDC.launcher.done(callback).fail(error);
    }

    // Global Events Dispatcher to loosely couple all the views
    SFDC.eventDispatcher = _.extend({}, Backbone.Events);
    SFDC.launcher = readyDeferred.promise();

    SFDC.isOnline = function() {
        return navigator.onLine ||
               (typeof navigator.connection != 'undefined' &&
               navigator.connection.type !== Connection.UNKNOWN &&
               navigator.connection.type !== Connection.NONE);
    }

    //SFDC.launch
    SFDC.launch = function(options) {
        var opts = {apiVersion: 'v29.0', userAgent: 'SalesforceMobileUI/alpha'};
        options = _.extend(opts, options);
        if (!initialized) {

            initialized = true;
            Force.init(options, options.apiVersion, null, authenticator);

            if (navigator.smartstore) {
                SFDC.metadataStore = new Force.StoreCache('sobjectTypes', [], 'type');
                SFDC.metadataStore.init()
                .done(function() {
                    readyDeferred.resolve();
                });
            } else {
                readyDeferred.resolve();
            }
        } else {
            // Forcetk already initialized. So refresh the session info.
            Force.forcetkClient.impl.setSessionToken(options.accessToken, options.apiVersion, options.instanceUrl);
            readyDeferred.resolve();
        }
    }

    SFDC.cacheMode = function() {
        return SFDC.isOnline() ? Force.CACHE_MODE.SERVER_FIRST : Force.CACHE_MODE.CACHE_ONLY;
    }

    // Key value object store to cache all the sobject type infos.
    var sobjectTypes = {};

    // Utility method to get the cached instance of Force.SObjectType
    SFDC.getSObjectType = function(sobjectName) {
        sobjectName = sobjectName.toLowerCase();
        var typeInfo = sobjectTypes[sobjectName];

        if (!typeInfo) {
            typeInfo = new Force.SObjectType(sobjectName, SFDC.metadataStore);
            sobjectTypes[sobjectName] = typeInfo;
        }
        return typeInfo;
    }

    window.SFDC = SFDC;

}).call(this, jQuery);;

    (function() {
      Polymer('force-app', {
        accesstoken: '',
        instanceurl: 'https://' + window.location.hostname,
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        ready: function() {
          this.launch();
        },
        observe: {
          accesstoken: 'launch',
          instanceurl: 'launch'
        },
        launch: function() {
          if (this.accesstoken.length > 0 && this.instanceurl.length > 0) {
            SFDC.launch({
                accessToken: this.accesstoken,
                instanceUrl: this.instanceurl
            });
          }
        }
      });
    })();
  ;

    Polymer('polymer-flex-layout', {
      vertical: false,
      isContainer: false,
      layoutContainer: null,
      enteredView: function() {
        this.installControllerStyles();
        this.layoutContainer = this.isContainer ? 
            this : (this.parentNode.host || this.parentNode);
        this.verticalChanged();
        this.alignChanged();
        this.justifyChanged();
      },
      leftView: function() {
        this.layoutContainer = null;
      },
      layoutContainerChanged: function(old) {
        if (old) {
          old.classList.remove('flexbox');
        }
        this.style.display = this.layoutContainer === this ? '' : 'none';
        if (this.layoutContainer) {
          this.layoutContainer.classList.add('flexbox');
        }
      },
      switchContainerClass: function(prefix, old, name) {
        if (this.layoutContainer && name) {
          this.layoutContainer.classList.switch(
              prefix + old, prefix + name);
        }
      },
      verticalChanged: function() {
        if (this.layoutContainer) {
          this.layoutContainer.classList.toggle('column', this.vertical);
        }
      },
      alignChanged: function(old) {
        this.switchContainerClass('align-', old, this.align);
      },
      justifyChanged: function(old) {
        this.switchContainerClass('justify-', old, this.justify);
      }
    });
  ;
/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
'use strict';

var ASSERT_ENABLED = false;
var SVG_NS = 'http://www.w3.org/2000/svg';

function assert(check, message) {
  console.assert(ASSERT_ENABLED,
      'assert should not be called when ASSERT_ENABLED is false');
  console.assert(check, message);
  // Some implementations of console.assert don't actually throw
  if (!check) { throw message; }
}

function detectFeatures() {
  var el = createDummyElement();
  el.style.cssText = 'width: calc(0px);' +
                     'width: -webkit-calc(0px);';
  var calcFunction = el.style.width.split('(')[0];
  var transformCandidates = [
    'transform',
    'webkitTransform',
    'msTransform'
  ];
  var transformProperty = transformCandidates.filter(function(property) {
    return property in el.style;
  })[0];
  return {
    calcFunction: calcFunction,
    transformProperty: transformProperty
  };
}

function createDummyElement() {
  return document.documentElement.namespaceURI == SVG_NS ?
         document.createElementNS(SVG_NS, 'g') :
         document.createElement('div');
}

var features = detectFeatures();
var constructorToken = {};

var createObject = function(proto, obj) {
  var newObject = Object.create(proto);
  Object.getOwnPropertyNames(obj).forEach(function(name) {
    Object.defineProperty(
        newObject, name, Object.getOwnPropertyDescriptor(obj, name));
  });
  return newObject;
};

var abstractMethod = function() {
  throw 'Abstract method not implemented.';
};

var IndexSizeError = function(message) {
  Error.call(this);
  this.name = 'IndexSizeError';
  this.message = message;
};

IndexSizeError.prototype = Object.create(Error.prototype);



/** @constructor */
var TimingDict = function(timingInput) {
  if (typeof timingInput === 'object') {
    for (var k in timingInput) {
      if (k in TimingDict.prototype) {
        this[k] = timingInput[k];
      }
    }
  } else if (isDefinedAndNotNull(timingInput)) {
    this.duration = Number(timingInput);
  }
};

TimingDict.prototype = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterationStart: 0,
  iterations: 1,
  duration: 'auto',
  playbackRate: 1,
  direction: 'normal',
  easing: 'linear'
};



/** @constructor */
var Timing = function(token, timingInput, changeHandler) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._dict = new TimingDict(timingInput);
  this._changeHandler = changeHandler;
};

Timing.prototype = {
  _timingFunction: function(timedItem) {
    var timingFunction = TimingFunction.createFromString(
        this.easing, timedItem);
    this._timingFunction = function() {
      return timingFunction;
    };
    return timingFunction;
  },
  _invalidateTimingFunction: function() {
    delete this._timingFunction;
  },
  _iterations: function() {
    var value = this._dict.iterations;
    return value < 0 ? 1 : value;
  },
  _duration: function() {
    var value = this._dict.duration;
    return typeof value === 'number' ? value : 'auto';
  },
  _clone: function() {
    return new Timing(
        constructorToken, this._dict, this._updateInternalState.bind(this));
  }
};

// Configures an accessor descriptor for use with Object.defineProperty() to
// allow the property to be changed and enumerated, to match __defineGetter__()
// and __defineSetter__().
var configureDescriptor = function(descriptor) {
  descriptor.configurable = true;
  descriptor.enumerable = true;
  return descriptor;
};

Timing._defineProperty = function(prop) {
  Object.defineProperty(Timing.prototype, prop, configureDescriptor({
    get: function() {
      return this._dict[prop];
    },
    set: function(value) {
      if (isDefinedAndNotNull(value)) {
        if (prop == 'duration' && value == 'auto') {
          // duration is not always a number
        } else if (['delay', 'endDelay', 'iterationStart', 'iterations',
                    'duration', 'playbackRate'].indexOf(prop) >= 0) {
          value = Number(value);
        }
        this._dict[prop] = value;
      } else {
        delete this._dict[prop];
      }
      // FIXME: probably need to implement specialized handling parsing
      // for each property
      if (prop === 'easing') {
        // Cached timing function may be invalid now.
        this._invalidateTimingFunction();
      }
      this._changeHandler();
    }
  }));
};

for (var prop in TimingDict.prototype) {
  Timing._defineProperty(prop);
}

var isDefined = function(val) {
  return typeof val !== 'undefined';
};

var isDefinedAndNotNull = function(val) {
  return isDefined(val) && (val !== null);
};



/** @constructor */
var Timeline = function(token) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // TODO: This will probably need to change.
  this._startTime = documentTimeZeroAsClockTime;
  if (this._startTime !== undefined) {
    this._startTime /= 1000;
  }
};

Timeline.prototype = {
  get currentTime() {
    if (this._startTime === undefined) {
      this._startTime = documentTimeZeroAsClockTime;
      if (this._startTime === undefined) {
        return null;
      } else {
        this._startTime /= 1000;
      }
    }
    return relativeTime(cachedClockTime(), this._startTime);
  },
  get effectiveCurrentTime() {
    return this.currentTime || 0;
  },
  play: function(source) {
    return new Player(constructorToken, source, this);
  },
  getCurrentPlayers: function() {
    return PLAYERS.filter(function(player) {
      return !player._isPastEndOfActiveInterval();
    });
  },
  toTimelineTime: function(otherTime, other) {
    if ((this.currentTime === null) || (other.currentTime === null)) {
      return null;
    } else {
      return otherTime + other._startTime - this._startTime;
    }
  },
  _pauseAnimationsForTesting: function(pauseAt) {
    PLAYERS.forEach(function(player) {
      player.pause();
      player.currentTime = pauseAt;
    });
  }
};

// TODO: Remove dead Players from here?
var PLAYERS = [];
var playersAreSorted = false;
var playerSequenceNumber = 0;



/** @constructor */
var Player = function(token, source, timeline) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  enterModifyCurrentAnimationState();
  try {
    this._registeredOnTimeline = false;
    this._sequenceNumber = playerSequenceNumber++;
    this._timeline = timeline;
    this._startTime =
        this.timeline.currentTime === null ? 0 : this.timeline.currentTime;
    this._storedTimeLag = 0.0;
    this._pausedState = false;
    this._holdTime = null;
    this._previousCurrentTime = null;
    this._playbackRate = 1.0;
    this._hasTicked = false;

    this.source = source;
    this._checkForHandlers();
    this._lastCurrentTime = undefined;

    playersAreSorted = false;
    maybeRestartAnimation();
  } finally {
    exitModifyCurrentAnimationState(ensureRetickBeforeGetComputedStyle);
  }
};

Player.prototype = {
  set source(source) {
    enterModifyCurrentAnimationState();
    try {
      if (isDefinedAndNotNull(this.source)) {
        // To prevent infinite recursion.
        var oldTimedItem = this.source;
        this._source = null;
        oldTimedItem._attach(null);
      }
      this._source = source;
      if (isDefinedAndNotNull(this.source)) {
        this.source._attach(this);
        this._update();
        maybeRestartAnimation();
      }
      this._checkForHandlers();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get source() {
    return this._source;
  },
  // This is the effective current time.
  set currentTime(currentTime) {
    enterModifyCurrentAnimationState();
    try {
      this._currentTime = currentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get currentTime() {
    return this._currentTime;
  },
  set _currentTime(seekTime) {
    // If we are paused or seeking to a time where limiting applies (i.e. beyond
    // the end in the current direction), update the hold time.
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.paused ||
        (this.playbackRate > 0 && seekTime >= sourceContentEnd) ||
        (this.playbackRate < 0 && seekTime <= 0)) {
      this._holdTime = seekTime;
    // Otherwise, clear the hold time (it may been set by previously seeking to
    // a limited time) and update the time lag.
    } else {
      this._holdTime = null;
      this._storedTimeLag = (this.timeline.effectiveCurrentTime -
          this.startTime) * this.playbackRate - seekTime;
    }
    this._update();
    maybeRestartAnimation();
  },
  get _currentTime() {
    this._previousCurrentTime = (this.timeline.effectiveCurrentTime -
        this.startTime) * this.playbackRate - this.timeLag;
    return this._previousCurrentTime;
  },
  get _unlimitedCurrentTime() {
    return (this.timeline.effectiveCurrentTime - this.startTime) *
        this.playbackRate - this._storedTimeLag;
  },
  get timeLag() {
    if (this.paused) {
      return this._pauseTimeLag;
    }

    // Apply limiting at start of interval when playing in reverse
    if (this.playbackRate < 0 && this._unlimitedCurrentTime <= 0) {
      if (this._holdTime === null) {
        this._holdTime = Math.min(this._previousCurrentTime, 0);
      }
      return this._pauseTimeLag;
    }

    // Apply limiting at end of interval when playing forwards
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.playbackRate > 0 &&
        this._unlimitedCurrentTime >= sourceContentEnd) {
      if (this._holdTime === null) {
        this._holdTime = Math.max(this._previousCurrentTime, sourceContentEnd);
      }
      return this._pauseTimeLag;
    }

    // Finished limiting so store pause time lag
    if (this._holdTime !== null) {
      this._storedTimeLag = this._pauseTimeLag;
      this._holdTime = null;
    }

    return this._storedTimeLag;
  },
  get _pauseTimeLag() {
    return ((this.timeline.currentTime || 0) - this.startTime) *
        this.playbackRate - this._holdTime;
  },
  set startTime(startTime) {
    enterModifyCurrentAnimationState();
    try {
      // This seeks by updating _startTime and hence the currentTime. It does
      // not affect _storedTimeLag.
      this._startTime = startTime;
      this._holdTime = null;
      playersAreSorted = false;
      this._update();
      maybeRestartAnimation();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get startTime() {
    return this._startTime;
  },
  set _paused(isPaused) {
    if (isPaused === this._pausedState) {
      return;
    }
    if (this._pausedState) {
      this._storedTimeLag = this.timeLag;
      this._holdTime = null;
      maybeRestartAnimation();
    } else {
      this._holdTime = this.currentTime;
    }
    this._pausedState = isPaused;
  },
  get paused() {
    return this._pausedState;
  },
  get timeline() {
    return this._timeline;
  },
  set playbackRate(playbackRate) {
    enterModifyCurrentAnimationState();
    try {
      var cachedCurrentTime = this.currentTime;
      // This will impact currentTime, so perform a compensatory seek.
      this._playbackRate = playbackRate;
      this.currentTime = cachedCurrentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get playbackRate() {
    return this._playbackRate;
  },
  get finished() {
    return this.source &&
        ((this.playbackRate > 0 && this.currentTime >= this.source.endTime) ||
        (this.playbackRate < 0 && this.currentTime <= 0));
  },
  cancel: function() {
    this.source = null;
  },
  finish: function() {
    if (this.playbackRate < 0) {
      this.currentTime = 0;
    } else if (this.playbackRate > 0) {
      var sourceEndTime = this.source ? this.source.endTime : 0;
      if (sourceEndTime === Infinity) {
        throw new Error('InvalidStateError');
      }
      this.currentTime = sourceEndTime;
    }
  },
  play: function() {
    this._paused = false;
    if (!this.source) {
      return;
    }
    if (this.playbackRate > 0 &&
        (this.currentTime < 0 ||
         this.currentTime >= this.source.endTime)) {
      this.currentTime = 0;
    } else if (this.playbackRate < 0 &&
        (this.currentTime <= 0 ||
        this.currentTime > this.source.endTime)) {
      this.currentTime = this.source.endTime;
    }
  },
  pause: function() {
    this._paused = true;
  },
  reverse: function() {
    if (this.playbackRate === 0) {
      return;
    }
    if (this.source) {
      if (this.playbackRate > 0 && this.currentTime >= this.source.endTime) {
        this.currentTime = this.source.endTime;
      } else if (this.playbackRate < 0 && this.currentTime < 0) {
        this.currentTime = 0;
      }
    }
    this.playbackRate = -this.playbackRate;
    this._paused = false;
  },
  _update: function() {
    if (this.source !== null) {
      this.source._updateInheritedTime(
          this.timeline.currentTime === null ? null : this._currentTime);
      this._registerOnTimeline();
    }
  },
  _hasFutureAnimation: function() {
    return this.source === null || this.playbackRate === 0 ||
        this.source._hasFutureAnimation(this.playbackRate > 0);
  },
  _isPastEndOfActiveInterval: function() {
    return this.source === null ||
        this.source._isPastEndOfActiveInterval();
  },
  _isCurrent: function() {
    return this.source && this.source._isCurrent();
  },
  _hasFutureEffect: function() {
    return this.source && this.source._hasFutureEffect();
  },
  _getLeafItemsInEffect: function(items) {
    if (this.source) {
      this.source._getLeafItemsInEffect(items);
    }
  },
  _isTargetingElement: function(element) {
    return this.source && this.source._isTargetingElement(element);
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this.source) {
      this.source._getAnimationsTargetingElement(element, animations);
    }
  },
  _handlerAdded: function() {
    this._needsHandlerPass = true;
  },
  _checkForHandlers: function() {
    this._needsHandlerPass = this.source !== null && this.source._hasHandlers();
  },
  _generateEvents: function() {
    if (!isDefinedAndNotNull(this._lastCurrentTime)) {
      this._lastCurrentTime = 0;
    }

    if (this._needsHandlerPass) {
      var timeDelta = this._unlimitedCurrentTime - this._lastCurrentTime;
      if (timeDelta > 0) {
        this.source._generateEvents(
            this._lastCurrentTime, this._unlimitedCurrentTime,
            this.timeline.currentTime, 1);
      }
    }

    this._lastCurrentTime = this._unlimitedCurrentTime;
  },
  _registerOnTimeline: function() {
    if (!this._registeredOnTimeline) {
      PLAYERS.push(this);
      this._registeredOnTimeline = true;
    }
  },
  _deregisterFromTimeline: function() {
    PLAYERS.splice(PLAYERS.indexOf(this), 1);
    this._registeredOnTimeline = false;
  }
};



/** @constructor */
var TimedItem = function(token, timingInput) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this.specified = new Timing(
      constructorToken, timingInput,
      this._specifiedTimingModified.bind(this));
  this._inheritedTime = null;
  this.currentIteration = null;
  this._iterationTime = null;
  this._animationTime = null;
  this._startTime = 0.0;
  this._player = null;
  this._parent = null;
  this._updateInternalState();
  this._handlers = {};
  this._onHandlers = {};
  this._fill = this._resolveFillMode(this.specified.fill);
};

TimedItem.prototype = {
  // TODO: It would be good to avoid the need for this. We would need to modify
  // call sites to instead rely on a call from the parent.
  get _effectiveParentTime() {
    return this.parent !== null && this.parent._iterationTime !== null ?
        this.parent._iterationTime : 0;
  },
  get localTime() {
    return this._inheritedTime === null ?
        null : this._inheritedTime - this._startTime;
  },
  get startTime() {
    return this._startTime;
  },
  get duration() {
    var result = this.specified._duration();
    if (result === 'auto') {
      result = this._intrinsicDuration();
    }
    return result;
  },
  get activeDuration() {
    var repeatedDuration = this.duration * this.specified._iterations();
    return repeatedDuration / Math.abs(this.specified.playbackRate);
  },
  get endTime() {
    return this._startTime + this.activeDuration + this.specified.delay +
        this.specified.endDelay;
  },
  get parent() {
    return this._parent;
  },
  get previousSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) - 1;
    if (siblingIndex < 0) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  get nextSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) + 1;
    if (siblingIndex >= this.parent.children.length) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  _attach: function(player) {
    // Remove ourselves from our parent, if we have one. This also removes any
    // exsisting player.
    this._reparent(null);
    this._player = player;
  },
  // Takes care of updating the outgoing parent. This is called with a non-null
  // parent only from TimingGroup.splice(), which takes care of calling
  // TimingGroup._childrenStateModified() for the new parent.
  _reparent: function(parent) {
    if (parent === this) {
      throw new Error('parent can not be set to self!');
    }
    enterModifyCurrentAnimationState();
    try {
      if (this._player !== null) {
        this._player.source = null;
        this._player = null;
      }
      if (this.parent !== null) {
        this.remove();
      }
      this._parent = parent;
      // In the case of a SeqGroup parent, _startTime will be updated by
      // TimingGroup.splice().
      if (this.parent === null || this.parent.type !== 'seq') {
        this._startTime =
            this._stashedStartTime === undefined ? 0.0 : this._stashedStartTime;
        this._stashedStartTime = undefined;
      }
      // In the case of the parent being non-null, _childrenStateModified() will
      // call this via _updateChildInheritedTimes().
      // TODO: Consider optimising this case by skipping this call.
      this._updateTimeMarkers();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _intrinsicDuration: function() {
    return 0.0;
  },
  _resolveFillMode: abstractMethod,
  _updateInternalState: function() {
    this._fill = this._resolveFillMode(this.specified.fill);
    if (this.parent) {
      this.parent._childrenStateModified();
    } else if (this._player) {
      this._player._registerOnTimeline();
    }
    this._updateTimeMarkers();
  },
  _specifiedTimingModified: function() {
    enterModifyCurrentAnimationState();
    try {
      this._updateInternalState();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  // We push time down to children. We could instead have children pull from
  // above, but this is tricky because a TimedItem may use either a parent
  // TimedItem or an Player. This requires either logic in
  // TimedItem, or for TimedItem and Player to implement Timeline
  // (or an equivalent), both of which are ugly.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
  },
  _updateAnimationTime: function() {
    if (this.localTime < this.specified.delay) {
      if (this._fill === 'backwards' ||
          this._fill === 'both') {
        this._animationTime = 0;
      } else {
        this._animationTime = null;
      }
    } else if (this.localTime <
        this.specified.delay + this.activeDuration) {
      this._animationTime = this.localTime - this.specified.delay;
    } else {
      if (this._fill === 'forwards' ||
          this._fill === 'both') {
        this._animationTime = this.activeDuration;
      } else {
        this._animationTime = null;
      }
    }
  },
  _updateIterationParamsZeroDuration: function() {
    this._iterationTime = 0;
    var isAtEndOfIterations = this.specified._iterations() !== 0 &&
        this.localTime >= this.specified.delay;
    this.currentIteration = (
        isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            this.specified.iterationStart + this.specified._iterations(),
            1.0) :
        this._floorWithClosedOpenRange(this.specified.iterationStart, 1.0));
    // Equivalent to unscaledIterationTime below.
    var unscaledFraction = (
        isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            this.specified.iterationStart + this.specified._iterations(),
            1.0) :
        this._modulusWithClosedOpenRange(this.specified.iterationStart, 1.0));
    var timingFunction = this.specified._timingFunction(this);
    this._timeFraction = (
        this._isCurrentDirectionForwards() ?
        unscaledFraction :
        1.0 - unscaledFraction);
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1]');
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
  },
  _getAdjustedAnimationTime: function(animationTime) {
    var startOffset =
        multiplyZeroGivesZero(this.specified.iterationStart, this.duration);
    return (this.specified.playbackRate < 0 ?
        (animationTime - this.activeDuration) : animationTime) *
        this.specified.playbackRate + startOffset;
  },
  _scaleIterationTime: function(unscaledIterationTime) {
    return this._isCurrentDirectionForwards() ?
        unscaledIterationTime :
        this.duration - unscaledIterationTime;
  },
  _updateIterationParams: function() {
    var adjustedAnimationTime =
        this._getAdjustedAnimationTime(this._animationTime);
    var repeatedDuration = this.duration * this.specified._iterations();
    var startOffset = this.specified.iterationStart * this.duration;
    var isAtEndOfIterations = (this.specified._iterations() !== 0) &&
        (adjustedAnimationTime - startOffset === repeatedDuration);
    this.currentIteration = isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._floorWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    var unscaledIterationTime = isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._modulusWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    this._iterationTime = this._scaleIterationTime(unscaledIterationTime);
    this._timeFraction = this._iterationTime / this.duration;
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1], got ' +
        this._timeFraction + ' ' + this._iterationTime + ' ' +
        this.duration + ' ' + isAtEndOfIterations + ' ' +
        unscaledIterationTime);
    var timingFunction = this.specified._timingFunction(this);
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
    this._iterationTime = this._timeFraction * this.duration;
  },
  _updateTimeMarkers: function() {
    if (this.localTime === null) {
      this._animationTime = null;
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
      return false;
    }
    this._updateAnimationTime();
    if (this._animationTime === null) {
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
    } else if (this.duration === 0) {
      this._updateIterationParamsZeroDuration();
    } else {
      this._updateIterationParams();
    }
    maybeRestartAnimation();
  },
  _floorWithClosedOpenRange: function(x, range) {
    return Math.floor(x / range);
  },
  _floorWithOpenClosedRange: function(x, range) {
    return Math.ceil(x / range) - 1;
  },
  _modulusWithClosedOpenRange: function(x, range) {
    ASSERT_ENABLED && assert(
        range > 0, 'Range must be strictly positive');
    var modulus = x % range;
    var result = modulus < 0 ? modulus + range : modulus;
    ASSERT_ENABLED && assert(
        result >= 0.0 && result < range,
        'Result should be in the range [0, range)');
    return result;
  },
  _modulusWithOpenClosedRange: function(x, range) {
    var modulus = this._modulusWithClosedOpenRange(x, range);
    var result = modulus === 0 ? range : modulus;
    ASSERT_ENABLED && assert(
        result > 0.0 && result <= range,
        'Result should be in the range (0, range]');
    return result;
  },
  _isCurrentDirectionForwards: function() {
    if (this.specified.direction === 'normal') {
      return true;
    }
    if (this.specified.direction === 'reverse') {
      return false;
    }
    var d = this.currentIteration;
    if (this.specified.direction === 'alternate-reverse') {
      d += 1;
    }
    // TODO: 6.13.3 step 3. wtf?
    return d % 2 === 0;
  },
  clone: abstractMethod,
  before: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 0, newItems);
  },
  after: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this) + 1, 0, newItems);
  },
  replace: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 1, newItems);
  },
  remove: function() {
    this.parent._splice(this.parent.indexOf(this), 1);
  },
  // Gets the leaf TimedItems currently in effect. Note that this is a superset
  // of the leaf TimedItems in their active interval, as a TimedItem can have an
  // effect outside its active interval due to fill.
  _getLeafItemsInEffect: function(items) {
    if (this._timeFraction !== null) {
      this._getLeafItemsInEffectImpl(items);
    }
  },
  _getLeafItemsInEffectImpl: abstractMethod,
  _hasFutureAnimation: function(timeDirectionForwards) {
    return timeDirectionForwards ? this._inheritedTime < this.endTime :
        this._inheritedTime > this.startTime;
  },
  _isPastEndOfActiveInterval: function() {
    return this._inheritedTime >= this.endTime;
  },
  get player() {
    return this.parent === null ?
        this._player : this.parent.player;
  },
  _isCurrent: function() {
    return !this._isPastEndOfActiveInterval() ||
           (this.parent !== null && this.parent._isCurrent());
  },
  _isTargetingElement: abstractMethod,
  _getAnimationsTargetingElement: abstractMethod,
  _netEffectivePlaybackRate: function() {
    var effectivePlaybackRate = this._isCurrentDirectionForwards() ?
        this.specified.playbackRate : -this.specified.playbackRate;
    return this.parent === null ? effectivePlaybackRate :
        effectivePlaybackRate * this.parent._netEffectivePlaybackRate();
  },
  // Note that this restriction is currently incomplete - for example,
  // Animations which are playing forwards and have a fill of backwards
  // are not in effect unless current.
  // TODO: Complete this restriction.
  _hasFutureEffect: function() {
    return this._isCurrent() || this._fill !== 'none';
  },
  set onstart(func) {
    this._setOnHandler('start', func);
  },
  get onstart() {
    return this._getOnHandler('start');
  },
  set oniteration(func) {
    this._setOnHandler('iteration', func);
  },
  get oniteration() {
    return this._getOnHandler('iteration');
  },
  set onend(func) {
    this._setOnHandler('end', func);
  },
  get onend() {
    return this._getOnHandler('end');
  },
  set oncancel(func) {
    this._setOnHandler('cancel', func);
  },
  get oncancel() {
    return this._getOnHandler('cancel');
  },
  _setOnHandler: function(type, func) {
    if (typeof func === 'function') {
      this._onHandlers[type] = {
        callback: func,
        index: (this._handlers[type] || []).length
      };
      if (this.player) {
        this.player._handlerAdded();
      }
    } else {
      this._onHandlers[type] = null;
      if (this.player) {
        this.player._checkForHandlers();
      }
    }
  },
  _getOnHandler: function(type) {
    if (isDefinedAndNotNull(this._onHandlers[type])) {
      return this._onHandlers[type].func;
    }
    return null;
  },
  addEventListener: function(type, func) {
    if (typeof func !== 'function' || !(type === 'start' ||
        type === 'iteration' || type === 'end' || type === 'cancel')) {
      return;
    }
    if (!isDefinedAndNotNull(this._handlers[type])) {
      this._handlers[type] = [];
    } else if (this._handlers[type].indexOf(func) !== -1) {
      return;
    }
    this._handlers[type].push(func);
    if (this.player) {
      this.player._handlerAdded();
    }
  },
  removeEventListener: function(type, func) {
    if (!this._handlers[type]) {
      return;
    }
    var index = this._handlers[type].indexOf(func);
    if (index === -1) {
      return;
    }
    this._handlers[type].splice(index, 1);
    if (isDefinedAndNotNull(this._onHandlers[type]) &&
        (index < this._onHandlers[type].index)) {
      this._onHandlers[type].index -= 1;
    }
    if (this.player) {
      this.player._checkForHandlers();
    }
  },
  _hasHandlers: function() {
    return this._hasHandlersForEvent('start') ||
        this._hasHandlersForEvent('iteration') ||
        this._hasHandlersForEvent('end') || this._hasHandlersForEvent('cancel');
  },
  _hasHandlersForEvent: function(type) {
    return (isDefinedAndNotNull(this._handlers[type]) &&
        this._handlers[type].length > 0) ||
        isDefinedAndNotNull(this._onHandlers[type]);
  },
  _callHandlers: function(type, event) {
    var callbackList;
    if (isDefinedAndNotNull(this._handlers[type])) {
      callbackList = this._handlers[type].slice();
    } else {
      callbackList = [];
    }
    if (isDefinedAndNotNull(this._onHandlers[type])) {
      callbackList.splice(this._onHandlers[type].index, 0,
          this._onHandlers[type].callback);
    }
    setTimeout(function() {
      for (var i = 0; i < callbackList.length; i++) {
        callbackList[i].call(this, event);
      }
    }, 0);
  },
  _generateChildEventsForRange: function() { },
  _toSubRanges: function(fromTime, toTime, iterationTimes) {
    if (fromTime > toTime) {
      var revRanges = this._toSubRanges(toTime, fromTime, iterationTimes);
      revRanges.ranges.forEach(function(a) { a.reverse(); });
      revRanges.ranges.reverse();
      revRanges.start = iterationTimes.length - revRanges.start - 1;
      revRanges.delta = -1;
      return revRanges;
    }
    var skipped = 0;
    // TODO: this should be calculatable. This would be more efficient
    // than searching through the list.
    while (iterationTimes[skipped] < fromTime) {
      skipped++;
    }
    var currentStart = fromTime;
    var ranges = [];
    for (var i = skipped; i < iterationTimes.length; i++) {
      if (iterationTimes[i] < toTime) {
        ranges.push([currentStart, iterationTimes[i]]);
        currentStart = iterationTimes[i];
      } else {
        ranges.push([currentStart, toTime]);
        return {start: skipped, delta: 1, ranges: ranges};
      }
    }
    ranges.push([currentStart, toTime]);
    return {start: skipped, delta: 1, ranges: ranges};
  },
  _generateEvents: function(fromTime, toTime, globalTime, deltaScale) {
    function toGlobal(time) {
      return (globalTime - (toTime - (time / deltaScale)));
    }
    var firstIteration = Math.floor(this.specified.iterationStart);
    var lastIteration = Math.floor(this.specified.iterationStart +
        this.specified.iterations);
    if (lastIteration === this.specified.iterationStart +
        this.specified.iterations) {
      lastIteration -= 1;
    }
    var startTime = this.startTime + this.specified.delay;

    if (this._hasHandlersForEvent('start')) {
      // Did we pass the start of this animation in the forward direction?
      if (fromTime <= startTime && toTime > startTime) {
        this._callHandlers('start', new TimingEvent(constructorToken, this,
            'start', this.specified.delay, toGlobal(startTime),
            firstIteration));
      // Did we pass the end of this animation in the reverse direction?
      } else if (fromTime > this.endTime && toTime <= this.endTime) {
        this._callHandlers(
            'start',
            new TimingEvent(
                constructorToken, this, 'start', this.endTime - this.startTime,
                toGlobal(this.endTime), lastIteration));
      }
    }

    // Calculate a list of uneased iteration times.
    var iterationTimes = [];
    for (var i = firstIteration + 1; i <= lastIteration; i++) {
      iterationTimes.push(i - this.specified.iterationStart);
    }
    iterationTimes = iterationTimes.map(function(i) {
      return i * this.duration / this.specified.playbackRate + startTime;
    }.bind(this));

    // Determine the impacted subranges.
    var clippedFromTime;
    var clippedToTime;
    if (fromTime < toTime) {
      clippedFromTime = Math.max(fromTime, startTime);
      clippedToTime = Math.min(toTime, this.endTime);
    } else {
      clippedFromTime = Math.min(fromTime, this.endTime);
      clippedToTime = Math.max(toTime, startTime);
    }
    var subranges = this._toSubRanges(
        clippedFromTime, clippedToTime, iterationTimes);

    for (var i = 0; i < subranges.ranges.length; i++) {
      var currentIter = subranges.start + i * subranges.delta;
      if (i > 0 && this._hasHandlersForEvent('iteration')) {
        var iterTime = subranges.ranges[i][0];
        this._callHandlers(
            'iteration',
            new TimingEvent(
                constructorToken, this, 'iteration', iterTime - this.startTime,
                toGlobal(iterTime), currentIter));
      }

      var iterFraction;
      if (subranges.delta > 0) {
        iterFraction = this.specified.iterationStart % 1;
      } else {
        iterFraction = 1 -
            (this.specified.iterationStart + this.specified.iterations) % 1;
      }
      this._generateChildEventsForRange(
          subranges.ranges[i][0], subranges.ranges[i][1],
          fromTime, toTime, currentIter - iterFraction,
          globalTime, deltaScale * this.specified.playbackRate);
    }

    if (this._hasHandlersForEvent('end')) {
      // Did we pass the end of this animation in the forward direction?
      if (fromTime < this.endTime && toTime >= this.endTime) {
        this._callHandlers(
            'end',
            new TimingEvent(
                constructorToken, this, 'end', this.endTime - this.startTime,
                toGlobal(this.endTime), lastIteration));
      // Did we pass the start of this animation in the reverse direction?
      } else if (fromTime >= startTime && toTime < startTime) {
        this._callHandlers(
            'end',
            new TimingEvent(
                constructorToken, this, 'end', this.specified.delay,
                toGlobal(startTime), firstIteration));
      }
    }
  }
};

var TimingEvent = function(
    token, target, type, localTime, timelineTime, iterationIndex, seeked) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._target = target;
  this._type = type;
  this.localTime = localTime;
  this.timelineTime = timelineTime;
  this.iterationIndex = iterationIndex;
  this.seeked = seeked ? true : false;
};

TimingEvent.prototype = Object.create(window.Event.prototype, {
  target: {
    get: function() {
      return this._target;
    }
  },
  cancelable: {
    get: function() {
      return false;
    }
  },
  cancelBubble: {
    get: function() {
      return false;
    }
  },
  defaultPrevented: {
    get: function() {
      return false;
    }
  },
  eventPhase: {
    get: function() {
      return 0;
    }
  },
  type: {
    get: function() {
      return this._type;
    }
  }
});

var isEffectCallback = function(animationEffect) {
  return typeof animationEffect === 'function';
};

var interpretAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect ||
      isEffectCallback(animationEffect)) {
    return animationEffect;
  } else if (isDefinedAndNotNull(animationEffect) &&
      typeof animationEffect === 'object') {
    // The spec requires animationEffect to be an instance of
    // OneOrMoreKeyframes, but this type is just a dictionary or a list of
    // dictionaries, so the best we can do is test for an object.
    return new KeyframeEffect(animationEffect);
  }
  return null;
};

var cloneAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect) {
    return animationEffect.clone();
  } else if (isEffectCallback(animationEffect)) {
    return animationEffect;
  } else {
    return null;
  }
};



/** @constructor */
var Animation = function(target, animationEffect, timingInput) {
  enterModifyCurrentAnimationState();
  try {
    TimedItem.call(this, constructorToken, timingInput);
    this.effect = interpretAnimationEffect(animationEffect);
    this._target = target;
  } finally {
    exitModifyCurrentAnimationState(null);
  }
  this._previousTimeFraction = null;
};

Animation.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _sample: function() {
    if (isDefinedAndNotNull(this.effect) &&
        !(this.target instanceof PseudoElementReference)) {
      if (isEffectCallback(this.effect)) {
        this.effect(this._timeFraction, this, this._previousTimeFraction);
        this._previousTimeFraction = this._timeFraction;
      } else {
        this.effect._sample(this._timeFraction, this.currentIteration,
            this.target, this.underlyingValue);
      }
    }
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _isTargetingElement: function(element) {
    return element === this.target;
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this._isTargetingElement(element)) {
      animations.push(this);
    }
  },
  get target() {
    return this._target;
  },
  set effect(effect) {
    enterModifyCurrentAnimationState();
    try {
      this._effect = effect;
      this.specified._invalidateTimingFunction();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  get effect() {
    return this._effect;
  },
  clone: function() {
    return new Animation(this.target,
        cloneAnimationEffect(this.effect), this.specified._dict);
  },
  toString: function() {
    var effectString = '<none>';
    if (this.effect instanceof AnimationEffect) {
      effectString = this.effect.toString();
    } else if (isEffectCallback(this.effect)) {
      effectString = 'Effect callback';
    }
    return 'Animation ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + effectString;
  }
});

function throwNewHierarchyRequestError() {
  var element = document.createElement('span');
  element.appendChild(element);
}



/** @constructor */
var TimedItemList = function(token, children) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._children = children;
  this._getters = 0;
  this._ensureGetters();
};

TimedItemList.prototype = {
  get length() {
    return this._children.length;
  },
  _ensureGetters: function() {
    while (this._getters < this._children.length) {
      this._ensureGetter(this._getters++);
    }
  },
  _ensureGetter: function(i) {
    Object.defineProperty(this, i, {
      get: function() {
        return this._children[i];
      }
    });
  }
};



/** @constructor */
var TimingGroup = function(token, type, children, timing) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // Take a copy of the children array, as it could be modified as a side-effect
  // of creating this object. See
  // https://github.com/web-animations/web-animations-js/issues/65 for details.
  var childrenCopy = (children && Array.isArray(children)) ?
      children.slice() : [];
  // used by TimedItem via _intrinsicDuration(), so needs to be set before
  // initializing super.
  this.type = type || 'par';
  this._children = [];
  this._cachedTimedItemList = null;
  this._cachedIntrinsicDuration = null;
  TimedItem.call(this, constructorToken, timing);
  // We add children after setting the parent. This means that if an ancestor
  // (including the parent) is specified as a child, it will be removed from our
  // ancestors and used as a child,
  this.append.apply(this, childrenCopy);
};

TimingGroup.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'both' : fillMode;
  },
  _childrenStateModified: function() {
    // See _updateChildStartTimes().
    this._isInChildrenStateModified = true;
    if (this._cachedTimedItemList) {
      this._cachedTimedItemList._ensureGetters();
    }
    this._cachedIntrinsicDuration = null;

    // We need to walk up and down the tree to re-layout. endTime and the
    // various durations (which are all calculated lazily) are the only
    // properties of a TimedItem which can affect the layout of its ancestors.
    // So it should be sufficient to simply update start times and time markers
    // on the way down.

    // This calls up to our parent, then calls _updateTimeMarkers().
    this._updateInternalState();
    this._updateChildInheritedTimes();

    // Update child start times before walking down.
    this._updateChildStartTimes();

    if (this.player) {
      this.player._checkForHandlers();
    }

    this._isInChildrenStateModified = false;
  },
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
    this._updateChildInheritedTimes();
  },
  _updateChildInheritedTimes: function() {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child._updateInheritedTime(this._iterationTime);
    }
  },
  _updateChildStartTimes: function() {
    if (this.type === 'seq') {
      var cumulativeStartTime = 0;
      for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (child._stashedStartTime === undefined) {
          child._stashedStartTime = child._startTime;
        }
        child._startTime = cumulativeStartTime;
        // Avoid updating the child's inherited time and time markers if this is
        // about to be done in the down phase of _childrenStateModified().
        if (!child._isInChildrenStateModified) {
          // This calls _updateTimeMarkers() on the child.
          child._updateInheritedTime(this._iterationTime);
        }
        cumulativeStartTime += Math.max(0, child.specified.delay +
            child.activeDuration + child.specified.endDelay);
      }
    }
  },
  get children() {
    if (!this._cachedTimedItemList) {
      this._cachedTimedItemList = new TimedItemList(
          constructorToken, this._children);
    }
    return this._cachedTimedItemList;
  },
  get firstChild() {
    return this._children[0];
  },
  get lastChild() {
    return this._children[this.children.length - 1];
  },
  _intrinsicDuration: function() {
    if (!isDefinedAndNotNull(this._cachedIntrinsicDuration)) {
      if (this.type === 'par') {
        var dur = Math.max.apply(undefined, this._children.map(function(a) {
          return a.endTime;
        }));
        this._cachedIntrinsicDuration = Math.max(0, dur);
      } else if (this.type === 'seq') {
        var result = 0;
        this._children.forEach(function(a) {
          result += a.activeDuration + a.specified.delay + a.specified.endDelay;
        });
        this._cachedIntrinsicDuration = result;
      } else {
        throw 'Unsupported type ' + this.type;
      }
    }
    return this._cachedIntrinsicDuration;
  },
  _getLeafItemsInEffectImpl: function(items) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i]._getLeafItemsInEffect(items);
    }
  },
  clone: function() {
    var children = [];
    this._children.forEach(function(child) {
      children.push(child.clone());
    });
    return this.type === 'par' ?
        new ParGroup(children, this.specified._dict) :
        new SeqGroup(children, this.specified._dict);
  },
  clear: function() {
    this._splice(0, this._children.length);
  },
  append: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(this._children.length, 0, newItems);
  },
  prepend: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(0, 0, newItems);
  },
  _addInternal: function(child) {
    this._children.push(child);
    this._childrenStateModified();
  },
  indexOf: function(item) {
    return this._children.indexOf(item);
  },
  _splice: function(start, deleteCount, newItems) {
    enterModifyCurrentAnimationState();
    try {
      var args = arguments;
      if (args.length === 3) {
        args = [start, deleteCount].concat(newItems);
      }
      for (var i = 2; i < args.length; i++) {
        var newChild = args[i];
        if (this._isInclusiveAncestor(newChild)) {
          throwNewHierarchyRequestError();
        }
        newChild._reparent(this);
      }
      var result = Array.prototype.splice.apply(this._children, args);
      for (var i = 0; i < result.length; i++) {
        result[i]._parent = null;
      }
      this._childrenStateModified();
      return result;
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _isInclusiveAncestor: function(item) {
    for (var ancestor = this; ancestor !== null; ancestor = ancestor.parent) {
      if (ancestor === item) {
        return true;
      }
    }
    return false;
  },
  _isTargetingElement: function(element) {
    return this._children.some(function(child) {
      return child._isTargetingElement(element);
    });
  },
  _getAnimationsTargetingElement: function(element, animations) {
    this._children.map(function(child) {
      return child._getAnimationsTargetingElement(element, animations);
    });
  },
  toString: function() {
    return this.type + ' ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + ' [' +
        this._children.map(function(a) { return a.toString(); }) + ']';
  },
  _hasHandlers: function() {
    return TimedItem.prototype._hasHandlers.call(this) || (
        this._children.length > 0 &&
        this._children.reduce(
            function(a, b) { return a || b._hasHandlers(); },
            false));
  },
  _generateChildEventsForRange: function(localStart, localEnd, rangeStart,
      rangeEnd, iteration, globalTime, deltaScale) {
    var start;
    var end;

    if (localEnd - localStart > 0) {
      start = Math.max(rangeStart, localStart);
      end = Math.min(rangeEnd, localEnd);
      if (start >= end) {
        return;
      }
    } else {
      start = Math.min(rangeStart, localStart);
      end = Math.max(rangeEnd, localEnd);
      if (start <= end) {
        return;
      }
    }

    var endDelta = rangeEnd - end;
    start -= iteration * this.duration / deltaScale;
    end -= iteration * this.duration / deltaScale;

    for (var i = 0; i < this._children.length; i++) {
      this._children[i]._generateEvents(
          start, end, globalTime - endDelta, deltaScale);
    }
  }
});



/** @constructor */
var ParGroup = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'par', children, timing, parent);
};

ParGroup.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var SeqGroup = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'seq', children, timing, parent);
};

SeqGroup.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var PseudoElementReference = function(element, pseudoElement) {
  this.element = element;
  this.pseudoElement = pseudoElement;
  console.warn('PseudoElementReference is not supported.');
};



/** @constructor */
var MediaReference = function(mediaElement, timing, parent, delta) {
  TimedItem.call(this, constructorToken, timing, parent);
  this._media = mediaElement;

  // We can never be sure when _updateInheritedTime() is going to be called
  // next, due to skipped frames or the player being seeked. Plus the media
  // element's currentTime may drift from our iterationTime. So if a media
  // element has loop set, we can't be sure that we'll stop it before it wraps.
  // For this reason, we simply disable looping.
  // TODO: Maybe we should let it loop if our duration exceeds it's
  // length?
  this._media.loop = false;

  // If the media element has a media controller, we detach it. This mirrors the
  // behaviour when re-parenting a TimedItem, or attaching one to a Player.
  // TODO: It would be neater to assign to MediaElement.controller, but this was
  // broken in Chrome until recently. See crbug.com/226270.
  this._media.mediaGroup = '';

  this._delta = delta;
};

MediaReference.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    // TODO: Fill modes for MediaReferences are still undecided. The spec is not
    // clear what 'auto' should mean for TimedItems other than Animations and
    // groups.
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _intrinsicDuration: function() {
    // TODO: This should probably default to zero. But doing so means that as
    // soon as our inheritedTime is zero, the polyfill deems the animation to be
    // done and stops ticking, so we don't get any further calls to
    // _updateInheritedTime(). One way around this would be to modify
    // TimedItem._isPastEndOfActiveInterval() to recurse down the tree, then we
    // could override it here.
    return isNaN(this._media.duration) ?
        Infinity : this._media.duration / this._media.defaultPlaybackRate;
  },
  _unscaledMediaCurrentTime: function() {
    return this._media.currentTime / this._media.defaultPlaybackRate;
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _ensurePlaying: function() {
    // The media element is paused when created.
    if (this._media.paused) {
      this._media.play();
    }
  },
  _ensurePaused: function() {
    if (!this._media.paused) {
      this._media.pause();
    }
  },
  _isSeekableUnscaledTime: function(time) {
    var seekTime = time * this._media.defaultPlaybackRate;
    var ranges = this._media.seekable;
    for (var i = 0; i < ranges.length; i++) {
      if (seekTime >= ranges.start(i) && seekTime <= ranges.end(i)) {
        return true;
      }
    }
    return false;
  },
  // Note that a media element's timeline may not start at zero, although its
  // duration is always the timeline time at the end point. This means that an
  // element's duration isn't always it's length and not all values of the
  // timline are seekable. Furthermore, some types of media further limit the
  // range of seekable timeline times. For this reason, we always map an
  // iteration to the range [0, duration] and simply seek to the nearest
  // seekable time.
  _ensureIsAtUnscaledTime: function(time) {
    if (this._unscaledMediaCurrentTime() !== time) {
      this._media.currentTime = time * this._media.defaultPlaybackRate;
    }
  },
  // This is called by the polyfill on each tick when our Player's tree is
  // active.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();

    // The polyfill uses a sampling model whereby time values are propagated
    // down the tree at each sample. However, for the media item, we need to use
    // play() and pause().

    // Handle the case of being outside our effect interval.
    if (this._iterationTime === null) {
      this._ensureIsAtUnscaledTime(0);
      this._ensurePaused();
      return;
    }

    if (this._iterationTime >= this._intrinsicDuration()) {
      // Our iteration time exceeds the media element's duration, so just make
      // sure the media element is at the end. It will stop automatically, but
      // that could take some time if the seek below is significant, so force
      // it.
      this._ensureIsAtUnscaledTime(this._intrinsicDuration());
      this._ensurePaused();
      return;
    }

    var finalIteration = this._floorWithOpenClosedRange(
        this.specified.iterationStart + this.specified._iterations(), 1.0);
    var endTimeFraction = this._modulusWithOpenClosedRange(
        this.specified.iterationStart + this.specified._iterations(), 1.0);
    if (this.currentIteration === finalIteration &&
        this._timeFraction === endTimeFraction &&
        this._intrinsicDuration() >= this.duration) {
      // We have reached the end of our final iteration, but the media element
      // is not done.
      this._ensureIsAtUnscaledTime(this.duration * endTimeFraction);
      this._ensurePaused();
      return;
    }

    // Set the appropriate playback rate.
    var playbackRate =
        this._media.defaultPlaybackRate * this._netEffectivePlaybackRate();
    if (this._media.playbackRate !== playbackRate) {
      this._media.playbackRate = playbackRate;
    }

    // Set the appropriate play/pause state. Note that we may not be able to
    // seek to the desired time. In this case, the media element's seek
    // algorithm repositions the seek to the nearest seekable time. This is OK,
    // but in this case, we don't want to play the media element, as it prevents
    // us from synchronising properly.
    if (this.player.paused ||
        !this._isSeekableUnscaledTime(this._iterationTime)) {
      this._ensurePaused();
    } else {
      this._ensurePlaying();
    }

    // Seek if required. This could be due to our Player being seeked, or video
    // slippage. We need to handle the fact that the video may not play at
    // exactly the right speed. There's also a variable delay when the video is
    // first played.
    // TODO: What's the right value for this delta?
    var delta = isDefinedAndNotNull(this._delta) ? this._delta :
        0.2 * Math.abs(this._media.playbackRate);
    if (Math.abs(this._iterationTime - this._unscaledMediaCurrentTime()) >
        delta) {
      this._ensureIsAtUnscaledTime(this._iterationTime);
    }
  },
  _isTargetingElement: function(element) {
    return this._media === element;
  },
  _getAnimationsTargetingElement: function() { },
  _attach: function(player) {
    this._ensurePaused();
    TimedItem.prototype._attach.call(this, player);
  }
});



/** @constructor */
var AnimationEffect = function(token, accumulate) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  enterModifyCurrentAnimationState();
  try {
    this.accumulate = accumulate;
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

AnimationEffect.prototype = {
  get accumulate() {
    return this._accumulate;
  },
  set accumulate(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._accumulate = value === 'sum' ? 'sum' : 'none';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: abstractMethod,
  clone: abstractMethod,
  toString: abstractMethod
};

var clamp = function(x, min, max) {
  return Math.max(Math.min(x, max), min);
};



/** @constructor */
var MotionPathEffect = function(path, autoRotate, angle, composite,
    accumulate) {
  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken, accumulate);

    this.composite = composite;

    // TODO: path argument is not in the spec -- seems useful since
    // SVGPathSegList doesn't have a constructor.
    this.autoRotate = isDefined(autoRotate) ? autoRotate : 'none';
    this.angle = isDefined(angle) ? angle : 0;
    this._path = document.createElementNS(SVG_NS, 'path');
    if (path instanceof SVGPathSegList) {
      this.segments = path;
    } else {
      var tempPath = document.createElementNS(SVG_NS, 'path');
      tempPath.setAttribute('d', String(path));
      this.segments = tempPath.pathSegList;
    }
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

MotionPathEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    // TODO: Handle accumulation.
    var lengthAtTimeFraction = this._lengthAtTimeFraction(timeFraction);
    var point = this._path.getPointAtLength(lengthAtTimeFraction);
    var x = point.x - target.offsetWidth / 2;
    var y = point.y - target.offsetHeight / 2;
    // TODO: calc(point.x - 50%) doesn't work?
    var value = [{t: 'translate', d: [{px: x}, {px: y}]}];
    var angle = this.angle;
    if (this._autoRotate === 'auto-rotate') {
      // Super hacks
      var lastPoint = this._path.getPointAtLength(lengthAtTimeFraction - 0.01);
      var dx = point.x - lastPoint.x;
      var dy = point.y - lastPoint.y;
      var rotation = Math.atan2(dy, dx);
      angle += rotation / 2 / Math.PI * 360;
    }
    value.push({t: 'rotate', d: [angle]});
    compositor.setAnimatedValue(target, 'transform',
        new AddReplaceCompositableValue(value, this.composite));
  },
  _lengthAtTimeFraction: function(timeFraction) {
    var segmentCount = this._cumulativeLengths.length - 1;
    if (!segmentCount) {
      return 0;
    }
    var scaledFraction = timeFraction * segmentCount;
    var index = clamp(Math.floor(scaledFraction), 0, segmentCount);
    return this._cumulativeLengths[index] + ((scaledFraction % 1) * (
        this._cumulativeLengths[index + 1] - this._cumulativeLengths[index]));
  },
  clone: function() {
    return new MotionPathEffect(this._path.getAttribute('d'));
  },
  toString: function() {
    return '<MotionPathEffect>';
  },
  set autoRotate(autoRotate) {
    enterModifyCurrentAnimationState();
    try {
      this._autoRotate = String(autoRotate);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get autoRotate() {
    return this._autoRotate;
  },
  set angle(angle) {
    enterModifyCurrentAnimationState();
    try {
      // TODO: This should probably be a string with a unit, but the spec
      //       says it's a double.
      this._angle = Number(angle);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get angle() {
    return this._angle;
  },
  set segments(segments) {
    enterModifyCurrentAnimationState();
    try {
      var targetSegments = this.segments;
      targetSegments.clear();
      var cumulativeLengths = [0];
      // TODO: *moving* the path segments is not correct, but pathSegList
      //       is read only
      var items = segments.numberOfItems;
      while (targetSegments.numberOfItems < items) {
        var segment = segments.removeItem(0);
        targetSegments.appendItem(segment);
        if (segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_REL &&
            segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_ABS) {
          cumulativeLengths.push(this._path.getTotalLength());
        }
      }
      this._cumulativeLengths = cumulativeLengths;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get segments() {
    return this._path.pathSegList;
  }
});

var shorthandToLonghand = {
  background: [
    'backgroundImage',
    'backgroundPosition',
    'backgroundSize',
    'backgroundRepeat',
    'backgroundAttachment',
    'backgroundOrigin',
    'backgroundClip',
    'backgroundColor'
  ],
  border: [
    'borderTopColor',
    'borderTopStyle',
    'borderTopWidth',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderBottomColor',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth'
  ],
  borderBottom: [
    'borderBottomWidth',
    'borderBottomStyle',
    'borderBottomColor'
  ],
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderLeft: [
    'borderLeftWidth',
    'borderLeftStyle',
    'borderLeftColor'
  ],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderRight: [
    'borderRightWidth',
    'borderRightStyle',
    'borderRightColor'
  ],
  borderTop: [
    'borderTopWidth',
    'borderTopStyle',
    'borderTopColor'
  ],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],
  font: [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'lineHeight'
  ],
  margin: [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft'
  ],
  outline: [
    'outlineColor',
    'outlineStyle',
    'outlineWidth'
  ],
  padding: [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft'
  ]
};

// This delegates parsing shorthand value syntax to the browser.
var shorthandExpanderElem = createDummyElement();
var expandShorthand = function(property, value, result) {
  shorthandExpanderElem.style[property] = value;
  var longProperties = shorthandToLonghand[property];
  for (var i in longProperties) {
    var longProperty = longProperties[i];
    var longhandValue = shorthandExpanderElem.style[longProperty];
    result[longProperty] = longhandValue;
  }
};

var normalizeKeyframeDictionary = function(properties) {
  var result = {
    offset: null,
    composite: null
  };
  var animationProperties = [];
  for (var property in properties) {
    // TODO: Apply the CSS property to IDL attribute algorithm.
    if (property === 'offset') {
      if (typeof properties.offset === 'number') {
        result.offset = properties.offset;
      }
    } else if (property === 'composite') {
      if (properties.composite === 'add' ||
          properties.composite === 'replace') {
        result.composite = properties.composite;
      }
    } else {
      // TODO: Check whether this is a supported property.
      animationProperties.push(property);
    }
  }
  // TODO: Remove prefixed properties if the unprefixed version is also
  // supported and present.
  animationProperties = animationProperties.sort(playerSortFunction);
  for (var i = 0; i < animationProperties.length; i++) {
    // TODO: Apply the IDL attribute to CSS property algorithm.
    var property = animationProperties[i];
    // TODO: The spec does not specify how to handle null values.
    // See https://www.w3.org/Bugs/Public/show_bug.cgi?id=22572
    var value = isDefinedAndNotNull(properties[property]) ?
        properties[property].toString() : '';
    if (property in shorthandToLonghand) {
      expandShorthand(property, value, result);
    } else {
      result[property] = value;
    }
  }
  return result;
};



/** @constructor */
var KeyframeEffect = function(oneOrMoreKeyframeDictionaries,
    composite, accumulate) {
  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken, accumulate);

    this.composite = composite;

    this.setFrames(oneOrMoreKeyframeDictionaries);
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

KeyframeEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  getFrames: function() {
    return this._keyframeDictionaries.slice(0);
  },
  setFrames: function(oneOrMoreKeyframeDictionaries) {
    enterModifyCurrentAnimationState();
    try {
      if (!Array.isArray(oneOrMoreKeyframeDictionaries)) {
        oneOrMoreKeyframeDictionaries = [oneOrMoreKeyframeDictionaries];
      }
      this._keyframeDictionaries =
          oneOrMoreKeyframeDictionaries.map(normalizeKeyframeDictionary);
      // Set lazily
      this._cachedPropertySpecificKeyframes = null;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    var frames = this._propertySpecificKeyframes();
    for (var property in frames) {
      compositor.setAnimatedValue(target, property,
          this._sampleForProperty(
              frames[property], timeFraction, currentIteration));
    }
  },
  _sampleForProperty: function(frames, timeFraction, currentIteration) {
    var unaccumulatedValue = this._getUnaccumulatedValue(frames, timeFraction);

    // We can only accumulate if this iteration is strictly positive and if all
    // keyframes use the same composite operation.
    if (this.accumulate === 'sum' &&
        currentIteration > 0 &&
        this._allKeyframesUseSameCompositeOperation(frames)) {
      // TODO: The spec is vague about the order of addition here when using add
      // composition.
      return new AccumulatedCompositableValue(unaccumulatedValue,
          this._getAccumulatingValue(frames), currentIteration);
    }

    return unaccumulatedValue;
  },
  _getAccumulatingValue: function(frames) {
    ASSERT_ENABLED && assert(
        this._allKeyframesUseSameCompositeOperation(frames),
        'Accumulation only valid if all frames use same composite operation');

    // This is a BlendedCompositableValue, though because the offset is 1.0, we
    // could simplify it to an AddReplaceCompositableValue representing the
    // keyframe at offset 1.0. We don't do this because the spec is likely to
    // change such that there is no guarantee that a keyframe with offset 1.0 is
    // present.
    // TODO: Consider caching this.
    var unaccumulatedValueAtOffsetOne = this._getUnaccumulatedValue(
        frames, 1.0);

    if (this._compositeForKeyframe(frames[0]) === 'add') {
      return unaccumulatedValueAtOffsetOne;
    }

    // For replace composition, we must evaluate the BlendedCompositableValue
    // to get a concrete value (note that the choice of underlying value is
    // irrelevant since it uses replace composition). We then form a new
    // AddReplaceCompositable value to add-composite this concrete value.
    ASSERT_ENABLED && assert(
        !unaccumulatedValueAtOffsetOne.dependsOnUnderlyingValue());
    return new AddReplaceCompositableValue(
        unaccumulatedValueAtOffsetOne.compositeOnto(null, null), 'add');
  },
  _getUnaccumulatedValue: function(frames, timeFraction) {
    ASSERT_ENABLED && assert(
        frames.length >= 2,
        'Interpolation requires at least two keyframes');

    var startKeyframeIndex;
    var length = frames.length;
    // We extrapolate differently depending on whether or not there are multiple
    // keyframes at offsets of 0 and 1.
    if (timeFraction < 0.0) {
      if (frames[1].offset === 0.0) {
        return new AddReplaceCompositableValue(frames[0].rawValue(),
            this._compositeForKeyframe(frames[0]));
      } else {
        startKeyframeIndex = 0;
      }
    } else if (timeFraction >= 1.0) {
      if (frames[length - 2].offset === 1.0) {
        return new AddReplaceCompositableValue(frames[length - 1].rawValue(),
            this._compositeForKeyframe(frames[length - 1]));
      } else {
        startKeyframeIndex = length - 2;
      }
    } else {
      for (var i = length - 1; i >= 0; i--) {
        if (frames[i].offset <= timeFraction) {
          ASSERT_ENABLED && assert(frames[i].offset !== 1.0);
          startKeyframeIndex = i;
          break;
        }
      }
    }
    var startKeyframe = frames[startKeyframeIndex];
    var endKeyframe = frames[startKeyframeIndex + 1];
    if (startKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(startKeyframe.rawValue(),
          this._compositeForKeyframe(startKeyframe));
    }
    if (endKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(endKeyframe.rawValue(),
          this._compositeForKeyframe(endKeyframe));
    }
    var intervalDistance = (timeFraction - startKeyframe.offset) /
        (endKeyframe.offset - startKeyframe.offset);
    return new BlendedCompositableValue(
        new AddReplaceCompositableValue(startKeyframe.rawValue(),
            this._compositeForKeyframe(startKeyframe)),
        new AddReplaceCompositableValue(endKeyframe.rawValue(),
            this._compositeForKeyframe(endKeyframe)),
        intervalDistance);
  },
  _propertySpecificKeyframes: function() {
    if (isDefinedAndNotNull(this._cachedPropertySpecificKeyframes)) {
      return this._cachedPropertySpecificKeyframes;
    }

    this._cachedPropertySpecificKeyframes = {};
    var distributedFrames = this._getDistributedKeyframes();
    for (var i = 0; i < distributedFrames.length; i++) {
      for (var property in distributedFrames[i].cssValues) {
        if (!(property in this._cachedPropertySpecificKeyframes)) {
          this._cachedPropertySpecificKeyframes[property] = [];
        }
        var frame = distributedFrames[i];
        this._cachedPropertySpecificKeyframes[property].push(
            new PropertySpecificKeyframe(frame.offset,
                frame.composite, property, frame.cssValues[property]));
      }
    }

    for (var property in this._cachedPropertySpecificKeyframes) {
      var frames = this._cachedPropertySpecificKeyframes[property];
      ASSERT_ENABLED && assert(
          frames.length > 0,
          'There should always be keyframes for each property');

      // Add synthetic keyframes at offsets of 0 and 1 if required.
      if (frames[0].offset !== 0.0) {
        var keyframe = new PropertySpecificKeyframe(0.0, 'add',
            property, cssNeutralValue);
        frames.unshift(keyframe);
      }
      if (frames[frames.length - 1].offset !== 1.0) {
        var keyframe = new PropertySpecificKeyframe(1.0, 'add',
            property, cssNeutralValue);
        frames.push(keyframe);
      }
      ASSERT_ENABLED && assert(
          frames.length >= 2,
          'There should be at least two keyframes including' +
          ' synthetic keyframes');
    }

    return this._cachedPropertySpecificKeyframes;
  },
  clone: function() {
    var result = new KeyframeEffect([], this.composite,
        this.accumulate);
    result._keyframeDictionaries = this._keyframeDictionaries.slice(0);
    return result;
  },
  toString: function() {
    return '<KeyframeEffect>';
  },
  _compositeForKeyframe: function(keyframe) {
    return isDefinedAndNotNull(keyframe.composite) ?
        keyframe.composite : this.composite;
  },
  _allKeyframesUseSameCompositeOperation: function(keyframes) {
    ASSERT_ENABLED && assert(
        keyframes.length >= 1, 'This requires at least one keyframe');
    var composite = this._compositeForKeyframe(keyframes[0]);
    for (var i = 1; i < keyframes.length; i++) {
      if (this._compositeForKeyframe(keyframes[i]) !== composite) {
        return false;
      }
    }
    return true;
  },
  _areKeyframeDictionariesLooselySorted: function() {
    var previousOffset = -Infinity;
    for (var i = 0; i < this._keyframeDictionaries.length; i++) {
      if (isDefinedAndNotNull(this._keyframeDictionaries[i].offset)) {
        if (this._keyframeDictionaries[i].offset < previousOffset) {
          return false;
        }
        previousOffset = this._keyframeDictionaries[i].offset;
      }
    }
    return true;
  },
  // The spec describes both this process and the process for interpretting the
  // properties of a keyframe dictionary as 'normalizing'. Here we use the term
  // 'distributing' to avoid confusion with normalizeKeyframeDictionary().
  _getDistributedKeyframes: function() {
    if (!this._areKeyframeDictionariesLooselySorted()) {
      return [];
    }

    var distributedKeyframes = this._keyframeDictionaries.map(
        KeyframeInternal.createFromNormalizedProperties);

    // Remove keyframes with offsets out of bounds.
    var length = distributedKeyframes.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset >= 0) {
          break;
        } else {
          count = i;
        }
      }
    }
    distributedKeyframes.splice(0, count);

    length = distributedKeyframes.length;
    count = 0;
    for (var i = length - 1; i >= 0; i--) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset <= 1) {
          break;
        } else {
          count = length - i;
        }
      }
    }
    distributedKeyframes.splice(length - count, count);

    // Distribute offsets.
    length = distributedKeyframes.length;
    if (length > 1 && !isDefinedAndNotNull(distributedKeyframes[0].offset)) {
      distributedKeyframes[0].offset = 0;
    }
    if (!isDefinedAndNotNull(distributedKeyframes[length - 1].offset)) {
      distributedKeyframes[length - 1].offset = 1;
    }
    var lastOffsetIndex = 0;
    var nextOffsetIndex = 0;
    for (var i = 1; i < distributedKeyframes.length - 1; i++) {
      var keyframe = distributedKeyframes[i];
      if (isDefinedAndNotNull(keyframe.offset)) {
        lastOffsetIndex = i;
        continue;
      }
      if (i > nextOffsetIndex) {
        nextOffsetIndex = i;
        while (!isDefinedAndNotNull(
            distributedKeyframes[nextOffsetIndex].offset)) {
          nextOffsetIndex++;
        }
      }
      var lastOffset = distributedKeyframes[lastOffsetIndex].offset;
      var nextOffset = distributedKeyframes[nextOffsetIndex].offset;
      var unspecifiedKeyframes = nextOffsetIndex - lastOffsetIndex - 1;
      ASSERT_ENABLED && assert(unspecifiedKeyframes > 0);
      var localIndex = i - lastOffsetIndex;
      ASSERT_ENABLED && assert(localIndex > 0);
      distributedKeyframes[i].offset = lastOffset +
          (nextOffset - lastOffset) * localIndex / (unspecifiedKeyframes + 1);
    }

    // Remove invalid property values.
    for (var i = distributedKeyframes.length - 1; i >= 0; i--) {
      var keyframe = distributedKeyframes[i];
      for (var property in keyframe.cssValues) {
        if (!KeyframeInternal.isSupportedPropertyValue(
            keyframe.cssValues[property])) {
          delete(keyframe.cssValues[property]);
        }
      }
      if (Object.keys(keyframe).length === 0) {
        distributedKeyframes.splice(i, 1);
      }
    }

    return distributedKeyframes;
  }
});



/**
 * An internal representation of a keyframe. The Keyframe type from the spec is
 * just a dictionary and is not exposed.
 *
 * @constructor
 */
var KeyframeInternal = function(offset, composite) {
  ASSERT_ENABLED && assert(
      typeof offset === 'number' || offset === null,
      'Invalid offset value');
  ASSERT_ENABLED && assert(
      composite === 'add' || composite === 'replace' || composite === null,
      'Invalid composite value');
  this.offset = offset;
  this.composite = composite;
  this.cssValues = {};
};

KeyframeInternal.prototype = {
  addPropertyValuePair: function(property, value) {
    ASSERT_ENABLED && assert(!this.cssValues.hasOwnProperty(property));
    this.cssValues[property] = value;
  },
  hasValueForProperty: function(property) {
    return property in this.cssValues;
  }
};

KeyframeInternal.isSupportedPropertyValue = function(value) {
  ASSERT_ENABLED && assert(
      typeof value === 'string' || value === cssNeutralValue);
  // TODO: Check this properly!
  return value !== '';
};

KeyframeInternal.createFromNormalizedProperties = function(properties) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(properties) && typeof properties === 'object',
      'Properties must be an object');
  var keyframe = new KeyframeInternal(properties.offset, properties.composite);
  for (var candidate in properties) {
    if (candidate !== 'offset' && candidate !== 'composite') {
      keyframe.addPropertyValuePair(candidate, properties[candidate]);
    }
  }
  return keyframe;
};



/** @constructor */
var PropertySpecificKeyframe = function(offset, composite, property, cssValue) {
  this.offset = offset;
  this.composite = composite;
  this.property = property;
  this.cssValue = cssValue;
  // Calculated lazily
  this.cachedRawValue = null;
};

PropertySpecificKeyframe.prototype = {
  rawValue: function() {
    if (!isDefinedAndNotNull(this.cachedRawValue)) {
      this.cachedRawValue = fromCssValue(this.property, this.cssValue);
    }
    return this.cachedRawValue;
  }
};



/** @constructor */
var TimingFunction = function() {
  throw new TypeError('Illegal constructor');
};

TimingFunction.prototype.scaleTime = abstractMethod;

TimingFunction.createFromString = function(spec, timedItem) {
  var preset = presetTimingFunctions[spec];
  if (preset) {
    return preset;
  }
  if (spec === 'paced') {
    if (timedItem instanceof Animation &&
        timedItem.effect instanceof MotionPathEffect) {
      return new PacedTimingFunction(timedItem.effect);
    }
    return presetTimingFunctions.linear;
  }
  var stepMatch = /steps\(\s*(\d+)\s*,\s*(start|end|middle)\s*\)/.exec(spec);
  if (stepMatch) {
    return new StepTimingFunction(Number(stepMatch[1]), stepMatch[2]);
  }
  var bezierMatch =
      /cubic-bezier\(([^,]*),([^,]*),([^,]*),([^)]*)\)/.exec(spec);
  if (bezierMatch) {
    return new CubicBezierTimingFunction([
      Number(bezierMatch[1]),
      Number(bezierMatch[2]),
      Number(bezierMatch[3]),
      Number(bezierMatch[4])
    ]);
  }
  return presetTimingFunctions.linear;
};



/** @constructor */
var CubicBezierTimingFunction = function(spec) {
  this.params = spec;
  this.map = [];
  for (var ii = 0; ii <= 100; ii += 1) {
    var i = ii / 100;
    this.map.push([
      3 * i * (1 - i) * (1 - i) * this.params[0] +
          3 * i * i * (1 - i) * this.params[2] + i * i * i,
      3 * i * (1 - i) * (1 - i) * this.params[1] +
          3 * i * i * (1 - i) * this.params[3] + i * i * i
    ]);
  }
};

CubicBezierTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    var fst = 0;
    while (fst !== 100 && fraction > this.map[fst][0]) {
      fst += 1;
    }
    if (fraction === this.map[fst][0] || fst === 0) {
      return this.map[fst][1];
    }
    var yDiff = this.map[fst][1] - this.map[fst - 1][1];
    var xDiff = this.map[fst][0] - this.map[fst - 1][0];
    var p = (fraction - this.map[fst - 1][0]) / xDiff;
    return this.map[fst - 1][1] + p * yDiff;
  }
});



/** @constructor */
var StepTimingFunction = function(numSteps, position) {
  this.numSteps = numSteps;
  this.position = position || 'end';
};

StepTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    if (fraction >= 1) {
      return 1;
    }
    var stepSize = 1 / this.numSteps;
    if (this.position === 'start') {
      fraction += stepSize;
    } else if (this.position === 'middle') {
      fraction += stepSize / 2;
    }
    return fraction - fraction % stepSize;
  }
});

var presetTimingFunctions = {
  'linear': null,
  'ease': new CubicBezierTimingFunction([0.25, 0.1, 0.25, 1.0]),
  'ease-in': new CubicBezierTimingFunction([0.42, 0, 1.0, 1.0]),
  'ease-out': new CubicBezierTimingFunction([0, 0, 0.58, 1.0]),
  'ease-in-out': new CubicBezierTimingFunction([0.42, 0, 0.58, 1.0]),
  'step-start': new StepTimingFunction(1, 'start'),
  'step-middle': new StepTimingFunction(1, 'middle'),
  'step-end': new StepTimingFunction(1, 'end')
};



/** @constructor */
var PacedTimingFunction = function(pathEffect) {
  ASSERT_ENABLED && assert(pathEffect instanceof MotionPathEffect);
  this._pathEffect = pathEffect;
  // Range is the portion of the effect over which we pace, normalized to
  // [0, 1].
  this._range = {min: 0, max: 1};
};

PacedTimingFunction.prototype = createObject(TimingFunction.prototype, {
  setRange: function(range) {
    ASSERT_ENABLED && assert(range.min >= 0 && range.min <= 1);
    ASSERT_ENABLED && assert(range.max >= 0 && range.max <= 1);
    ASSERT_ENABLED && assert(range.min < range.max);
    this._range = range;
  },
  scaleTime: function(fraction) {
    var cumulativeLengths = this._pathEffect._cumulativeLengths;
    var numSegments = cumulativeLengths.length - 1;
    if (!cumulativeLengths[numSegments] || fraction <= 0) {
      return this._range.min;
    }
    if (fraction >= 1) {
      return this._range.max;
    }
    var minLength = this.lengthAtIndex(this._range.min * numSegments);
    var maxLength = this.lengthAtIndex(this._range.max * numSegments);
    var length = interp(minLength, maxLength, fraction);
    var leftIndex = this.findLeftIndex(cumulativeLengths, length);
    var leftLength = cumulativeLengths[leftIndex];
    var segmentLength = cumulativeLengths[leftIndex + 1] - leftLength;
    if (segmentLength > 0) {
      return (leftIndex + (length - leftLength) / segmentLength) / numSegments;
    }
    return leftLength / cumulativeLengths.length;
  },
  findLeftIndex: function(array, value) {
    var leftIndex = 0;
    var rightIndex = array.length;
    while (rightIndex - leftIndex > 1) {
      var midIndex = (leftIndex + rightIndex) >> 1;
      if (array[midIndex] <= value) {
        leftIndex = midIndex;
      } else {
        rightIndex = midIndex;
      }
    }
    return leftIndex;
  },
  lengthAtIndex: function(i) {
    ASSERT_ENABLED &&
        console.assert(i >= 0 && i <= cumulativeLengths.length - 1);
    var leftIndex = Math.floor(i);
    var startLength = this._pathEffect._cumulativeLengths[leftIndex];
    var endLength = this._pathEffect._cumulativeLengths[leftIndex + 1];
    var indexFraction = i % 1;
    return interp(startLength, endLength, indexFraction);
  }
});

var interp = function(from, to, f, type) {
  if (Array.isArray(from) || Array.isArray(to)) {
    return interpArray(from, to, f, type);
  }
  var zero = type === 'scale' ? 1.0 : 0.0;
  to = isDefinedAndNotNull(to) ? to : zero;
  from = isDefinedAndNotNull(from) ? from : zero;

  return to * f + from * (1 - f);
};

var interpArray = function(from, to, f, type) {
  ASSERT_ENABLED && assert(
      Array.isArray(from) || from === null,
      'From is not an array or null');
  ASSERT_ENABLED && assert(
      Array.isArray(to) || to === null,
      'To is not an array or null');
  ASSERT_ENABLED && assert(
      from === null || to === null || from.length === to.length,
      'Arrays differ in length ' + from + ' : ' + to);
  var length = from ? from.length : to.length;

  var result = [];
  for (var i = 0; i < length; i++) {
    result[i] = interp(from ? from[i] : null, to ? to[i] : null, f, type);
  }
  return result;
};

var typeWithKeywords = function(keywords, type) {
  var isKeyword;
  if (keywords.length === 1) {
    var keyword = keywords[0];
    isKeyword = function(value) {
      return value === keyword;
    };
  } else {
    isKeyword = function(value) {
      return keywords.indexOf(value) >= 0;
    };
  }
  return createObject(type, {
    add: function(base, delta) {
      if (isKeyword(base) || isKeyword(delta)) {
        return delta;
      }
      return type.add(base, delta);
    },
    interpolate: function(from, to, f) {
      if (isKeyword(from) || isKeyword(to)) {
        return nonNumericType.interpolate(from, to, f);
      }
      return type.interpolate(from, to, f);
    },
    toCssValue: function(value, svgMode) {
      return isKeyword(value) ? value : type.toCssValue(value, svgMode);
    },
    fromCssValue: function(value) {
      return isKeyword(value) ? value : type.fromCssValue(value);
    }
  });
};

var numberType = {
  add: function(base, delta) {
    // If base or delta are 'auto', we fall back to replacement.
    if (base === 'auto' || delta === 'auto') {
      return nonNumericType.add(base, delta);
    }
    return base + delta;
  },
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return interp(from, to, f);
  },
  toCssValue: function(value) { return value + ''; },
  fromCssValue: function(value) {
    if (value === 'auto') {
      return 'auto';
    }
    var result = Number(value);
    return isNaN(result) ? undefined : result;
  }
};

var integerType = createObject(numberType, {
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return Math.floor(interp(from, to, f));
  }
});

var fontWeightType = {
  add: function(base, delta) { return base + delta; },
  interpolate: function(from, to, f) {
    return interp(from, to, f);
  },
  toCssValue: function(value) {
    value = Math.round(value / 100) * 100;
    value = clamp(value, 100, 900);
    if (value === 400) {
      return 'normal';
    }
    if (value === 700) {
      return 'bold';
    }
    return String(value);
  },
  fromCssValue: function(value) {
    // TODO: support lighter / darker ?
    var out = Number(value);
    if (isNaN(out) || out < 100 || out > 900 || out % 100 !== 0) {
      return undefined;
    }
    return out;
  }
};

// This regular expression is intentionally permissive, so that
// platform-prefixed versions of calc will still be accepted as
// input. While we are restrictive with the transform property
// name, we need to be able to read underlying calc values from
// computedStyle so can't easily restrict the input here.
var outerCalcRE = /^\s*(-webkit-)?calc\s*\(\s*([^)]*)\)/;
var valueRE = /^\s*(-?[0-9]+(\.[0-9])?[0-9]*)([a-zA-Z%]*)/;
var operatorRE = /^\s*([+-])/;
var autoRE = /^\s*auto/i;
var percentLengthType = {
  zero: function() { return {}; },
  add: function(base, delta) {
    var out = {};
    for (var value in base) {
      out[value] = base[value] + (delta[value] || 0);
    }
    for (value in delta) {
      if (value in base) {
        continue;
      }
      out[value] = delta[value];
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = {};
    for (var value in from) {
      out[value] = interp(from[value], to[value], f);
    }
    for (var value in to) {
      if (value in out) {
        continue;
      }
      out[value] = interp(0, to[value], f);
    }
    return out;
  },
  toCssValue: function(value) {
    var s = '';
    var singleValue = true;
    for (var item in value) {
      if (s === '') {
        s = value[item] + item;
      } else if (singleValue) {
        if (value[item] !== 0) {
          s = features.calcFunction +
              '(' + s + ' + ' + value[item] + item + ')';
          singleValue = false;
        }
      } else if (value[item] !== 0) {
        s = s.substring(0, s.length - 1) + ' + ' + value[item] + item + ')';
      }
    }
    return s;
  },
  fromCssValue: function(value) {
    var result = percentLengthType.consumeValueFromString(value);
    if (result) {
      return result.value;
    }
    return undefined;
  },
  consumeValueFromString: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    var autoMatch = autoRE.exec(value);
    if (autoMatch) {
      return {
        value: { auto: true },
        remaining: value.substring(autoMatch[0].length)
      };
    }
    var out = {};
    var calcMatch = outerCalcRE.exec(value);
    if (!calcMatch) {
      var singleValue = valueRE.exec(value);
      if (singleValue && (singleValue.length === 4)) {
        out[singleValue[3]] = Number(singleValue[1]);
        return {
          value: out,
          remaining: value.substring(singleValue[0].length)
        };
      }
      return undefined;
    }
    var remaining = value.substring(calcMatch[0].length);
    var calcInnards = calcMatch[2];
    var firstTime = true;
    while (true) {
      var reversed = false;
      if (firstTime) {
        firstTime = false;
      } else {
        var op = operatorRE.exec(calcInnards);
        if (!op) {
          return undefined;
        }
        if (op[1] === '-') {
          reversed = true;
        }
        calcInnards = calcInnards.substring(op[0].length);
      }
      value = valueRE.exec(calcInnards);
      if (!value) {
        return undefined;
      }
      var valueUnit = value[3];
      var valueNumber = Number(value[1]);
      if (!isDefinedAndNotNull(out[valueUnit])) {
        out[valueUnit] = 0;
      }
      if (reversed) {
        out[valueUnit] -= valueNumber;
      } else {
        out[valueUnit] += valueNumber;
      }
      calcInnards = calcInnards.substring(value[0].length);
      if (/\s*/.exec(calcInnards)[0].length === calcInnards.length) {
        return {
          value: out,
          remaining: remaining
        };
      }
    }
  },
  negate: function(value) {
    var out = {};
    for (var unit in value) {
      out[unit] = -value[unit];
    }
    return out;
  }
};

var percentLengthAutoType = typeWithKeywords(['auto'], percentLengthType);

var positionKeywordRE = /^\s*left|^\s*center|^\s*right|^\s*top|^\s*bottom/i;
var positionType = {
  zero: function() { return [{ px: 0 }, { px: 0 }]; },
  add: function(base, delta) {
    return [
      percentLengthType.add(base[0], delta[0]),
      percentLengthType.add(base[1], delta[1])
    ];
  },
  interpolate: function(from, to, f) {
    return [
      percentLengthType.interpolate(from[0], to[0], f),
      percentLengthType.interpolate(from[1], to[1], f)
    ];
  },
  toCssValue: function(value) {
    return value.map(percentLengthType.toCssValue).join(' ');
  },
  fromCssValue: function(value) {
    var tokens = [];
    var remaining = value;
    while (true) {
      var result = positionType.consumeTokenFromString(remaining);
      if (!result) {
        return undefined;
      }
      tokens.push(result.value);
      remaining = result.remaining;
      if (!result.remaining.trim()) {
        break;
      }
      if (tokens.length >= 4) {
        return undefined;
      }
    }

    if (tokens.length === 1) {
      var token = tokens[0];
      return (positionType.isHorizontalToken(token) ?
          [token, 'center'] : ['center', token]).map(positionType.resolveToken);
    }

    if (tokens.length === 2 &&
        positionType.isHorizontalToken(tokens[0]) &&
        positionType.isVerticalToken(tokens[1])) {
      return tokens.map(positionType.resolveToken);
    }

    if (tokens.filter(positionType.isKeyword).length !== 2) {
      return undefined;
    }

    var out = [undefined, undefined];
    var center = false;
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!positionType.isKeyword(token)) {
        return undefined;
      }
      if (token === 'center') {
        if (center) {
          return undefined;
        }
        center = true;
        continue;
      }
      var axis = Number(positionType.isVerticalToken(token));
      if (out[axis]) {
        return undefined;
      }
      if (i === tokens.length - 1 || positionType.isKeyword(tokens[i + 1])) {
        out[axis] = positionType.resolveToken(token);
        continue;
      }
      var percentLength = tokens[++i];
      if (token === 'bottom' || token === 'right') {
        percentLength = percentLengthType.negate(percentLength);
        percentLength['%'] = (percentLength['%'] || 0) + 100;
      }
      out[axis] = percentLength;
    }
    if (center) {
      if (!out[0]) {
        out[0] = positionType.resolveToken('center');
      } else if (!out[1]) {
        out[1] = positionType.resolveToken('center');
      } else {
        return undefined;
      }
    }
    return out.every(isDefinedAndNotNull) ? out : undefined;
  },
  consumeTokenFromString: function(value) {
    var keywordMatch = positionKeywordRE.exec(value);
    if (keywordMatch) {
      return {
        value: keywordMatch[0].trim().toLowerCase(),
        remaining: value.substring(keywordMatch[0].length)
      };
    }
    return percentLengthType.consumeValueFromString(value);
  },
  resolveToken: function(token) {
    if (typeof token === 'string') {
      return percentLengthType.fromCssValue({
        left: '0%',
        center: '50%',
        right: '100%',
        top: '0%',
        bottom: '100%'
      }[token]);
    }
    return token;
  },
  isHorizontalToken: function(token) {
    if (typeof token === 'string') {
      return token in { left: true, center: true, right: true };
    }
    return true;
  },
  isVerticalToken: function(token) {
    if (typeof token === 'string') {
      return token in { top: true, center: true, bottom: true };
    }
    return true;
  },
  isKeyword: function(token) {
    return typeof token === 'string';
  }
};

// Spec: http://dev.w3.org/csswg/css-backgrounds/#background-position
var positionListType = {
  zero: function() { return [positionType.zero()]; },
  add: function(base, delta) {
    var out = [];
    var maxLength = Math.max(base.length, delta.length);
    for (var i = 0; i < maxLength; i++) {
      var basePosition = base[i] ? base[i] : positionType.zero();
      var deltaPosition = delta[i] ? delta[i] : positionType.zero();
      out.push(positionType.add(basePosition, deltaPosition));
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = [];
    var maxLength = Math.max(from.length, to.length);
    for (var i = 0; i < maxLength; i++) {
      var fromPosition = from[i] ? from[i] : positionType.zero();
      var toPosition = to[i] ? to[i] : positionType.zero();
      out.push(positionType.interpolate(fromPosition, toPosition, f));
    }
    return out;
  },
  toCssValue: function(value) {
    return value.map(positionType.toCssValue).join(', ');
  },
  fromCssValue: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    if (!value.trim()) {
      return [positionType.fromCssValue('0% 0%')];
    }
    var positionValues = value.split(',');
    var out = positionValues.map(positionType.fromCssValue);
    return out.every(isDefinedAndNotNull) ? out : undefined;
  }
};

var rectangleRE = /rect\(([^,]+),([^,]+),([^,]+),([^)]+)\)/;
var rectangleType = {
  add: function(base, delta) {
    return {
      top: percentLengthType.add(base.top, delta.top),
      right: percentLengthType.add(base.right, delta.right),
      bottom: percentLengthType.add(base.bottom, delta.bottom),
      left: percentLengthType.add(base.left, delta.left)
    };
  },
  interpolate: function(from, to, f) {
    return {
      top: percentLengthType.interpolate(from.top, to.top, f),
      right: percentLengthType.interpolate(from.right, to.right, f),
      bottom: percentLengthType.interpolate(from.bottom, to.bottom, f),
      left: percentLengthType.interpolate(from.left, to.left, f)
    };
  },
  toCssValue: function(value) {
    return 'rect(' +
        percentLengthType.toCssValue(value.top) + ',' +
        percentLengthType.toCssValue(value.right) + ',' +
        percentLengthType.toCssValue(value.bottom) + ',' +
        percentLengthType.toCssValue(value.left) + ')';
  },
  fromCssValue: function(value) {
    var match = rectangleRE.exec(value);
    if (!match) {
      return undefined;
    }
    var out = {
      top: percentLengthType.fromCssValue(match[1]),
      right: percentLengthType.fromCssValue(match[2]),
      bottom: percentLengthType.fromCssValue(match[3]),
      left: percentLengthType.fromCssValue(match[4])
    };
    if (out.top && out.right && out.bottom && out.left) {
      return out;
    }
    return undefined;
  }
};

var shadowType = {
  zero: function() {
    return {
      hOffset: lengthType.zero(),
      vOffset: lengthType.zero()
    };
  },
  _addSingle: function(base, delta) {
    if (base && delta && base.inset !== delta.inset) {
      return delta;
    }
    var result = {
      inset: base ? base.inset : delta.inset,
      hOffset: lengthType.add(
          base ? base.hOffset : lengthType.zero(),
          delta ? delta.hOffset : lengthType.zero()),
      vOffset: lengthType.add(
          base ? base.vOffset : lengthType.zero(),
          delta ? delta.vOffset : lengthType.zero()),
      blur: lengthType.add(
          base && base.blur || lengthType.zero(),
          delta && delta.blur || lengthType.zero())
    };
    if (base && base.spread || delta && delta.spread) {
      result.spread = lengthType.add(
          base && base.spread || lengthType.zero(),
          delta && delta.spread || lengthType.zero());
    }
    if (base && base.color || delta && delta.color) {
      result.color = colorType.add(
          base && base.color || colorType.zero(),
          delta && delta.color || colorType.zero());
    }
    return result;
  },
  add: function(base, delta) {
    var result = [];
    for (var i = 0; i < base.length || i < delta.length; i++) {
      result.push(this._addSingle(base[i], delta[i]));
    }
    return result;
  },
  _interpolateSingle: function(from, to, f) {
    if (from && to && from.inset !== to.inset) {
      return f < 0.5 ? from : to;
    }
    var result = {
      inset: from ? from.inset : to.inset,
      hOffset: lengthType.interpolate(
          from ? from.hOffset : lengthType.zero(),
          to ? to.hOffset : lengthType.zero(), f),
      vOffset: lengthType.interpolate(
          from ? from.vOffset : lengthType.zero(),
          to ? to.vOffset : lengthType.zero(), f),
      blur: lengthType.interpolate(
          from && from.blur || lengthType.zero(),
          to && to.blur || lengthType.zero(), f)
    };
    if (from && from.spread || to && to.spread) {
      result.spread = lengthType.interpolate(
          from && from.spread || lengthType.zero(),
          to && to.spread || lengthType.zero(), f);
    }
    if (from && from.color || to && to.color) {
      result.color = colorType.interpolate(
          from && from.color || colorType.zero(),
          to && to.color || colorType.zero(), f);
    }
    return result;
  },
  interpolate: function(from, to, f) {
    var result = [];
    for (var i = 0; i < from.length || i < to.length; i++) {
      result.push(this._interpolateSingle(from[i], to[i], f));
    }
    return result;
  },
  _toCssValueSingle: function(value) {
    return (value.inset ? 'inset ' : '') +
        lengthType.toCssValue(value.hOffset) + ' ' +
        lengthType.toCssValue(value.vOffset) + ' ' +
        lengthType.toCssValue(value.blur) +
        (value.spread ? ' ' + lengthType.toCssValue(value.spread) : '') +
        (value.color ? ' ' + colorType.toCssValue(value.color) : '');
  },
  toCssValue: function(value) {
    return value.map(this._toCssValueSingle).join(', ');
  },
  fromCssValue: function(value) {
    var shadowRE = /(([^(,]+(\([^)]*\))?)+)/g;
    var match;
    var shadows = [];
    while ((match = shadowRE.exec(value)) !== null) {
      shadows.push(match[0]);
    }

    var result = shadows.map(function(value) {
      if (value === 'none') {
        return shadowType.zero();
      }
      value = value.replace(/^\s+|\s+$/g, '');

      var partsRE = /([^ (]+(\([^)]*\))?)/g;
      var parts = [];
      while ((match = partsRE.exec(value)) !== null) {
        parts.push(match[0]);
      }

      if (parts.length < 2 || parts.length > 7) {
        return undefined;
      }
      var result = {
        inset: false
      };

      var lengths = [];
      while (parts.length) {
        var part = parts.shift();

        var length = lengthType.fromCssValue(part);
        if (length) {
          lengths.push(length);
          continue;
        }

        var color = colorType.fromCssValue(part);
        if (color) {
          result.color = color;
        }

        if (part === 'inset') {
          result.inset = true;
        }
      }

      if (lengths.length < 2 || lengths.length > 4) {
        return undefined;
      }
      result.hOffset = lengths[0];
      result.vOffset = lengths[1];
      if (lengths.length > 2) {
        result.blur = lengths[2];
      }
      if (lengths.length > 3) {
        result.spread = lengths[3];
      }
      return result;
    });

    return result.every(isDefined) ? result : undefined;
  }
};

var nonNumericType = {
  add: function(base, delta) {
    return isDefined(delta) ? delta : base;
  },
  interpolate: function(from, to, f) {
    return f < 0.5 ? from : to;
  },
  toCssValue: function(value) {
    return value;
  },
  fromCssValue: function(value) {
    return value;
  }
};

var visibilityType = createObject(nonNumericType, {
  interpolate: function(from, to, f) {
    if (from !== 'visible' && to !== 'visible') {
      return nonNumericType.interpolate(from, to, f);
    }
    if (f <= 0) {
      return from;
    }
    if (f >= 1) {
      return to;
    }
    return 'visible';
  },
  fromCssValue: function(value) {
    if (['visible', 'hidden', 'collapse'].indexOf(value) !== -1) {
      return value;
    }
    return undefined;
  }
});

var lengthType = percentLengthType;
var lengthAutoType = typeWithKeywords(['auto'], lengthType);

var colorRE = new RegExp(
    '(hsla?|rgba?)\\(' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?)(?:,?\\s*([\\-0-9\\.]+%?))?' +
    '\\)');
var colorHashRE = new RegExp(
    '#([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)');

function hsl2rgb(h, s, l) {
  // Cribbed from http://dev.w3.org/csswg/css-color/#hsl-color
  // Wrap to 0->360 degrees (IE -10 === 350) then normalize
  h = (((h % 360) + 360) % 360) / 360;
  s = s / 100;
  l = l / 100;
  function hue2rgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
  var m2;
  if (l <= 0.5) {
    m2 = l * (s + 1);
  } else {
    m2 = l + s - l * s;
  }

  var m1 = l * 2 - m2;
  var r = Math.ceil(hue2rgb(m1, m2, h + 1 / 3) * 255);
  var g = Math.ceil(hue2rgb(m1, m2, h) * 255);
  var b = Math.ceil(hue2rgb(m1, m2, h - 1 / 3) * 255);
  return [r, g, b];
}

var namedColors = {
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  transparent: [0, 0, 0, 0],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};

var colorType = typeWithKeywords(['currentColor'], {
  zero: function() { return [0, 0, 0, 0]; },
  _premultiply: function(value) {
    var alpha = value[3];
    return [value[0] * alpha, value[1] * alpha, value[2] * alpha];
  },
  add: function(base, delta) {
    var alpha = Math.min(base[3] + delta[3], 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    base = this._premultiply(base);
    delta = this._premultiply(delta);
    return [(base[0] + delta[0]) / alpha, (base[1] + delta[1]) / alpha,
            (base[2] + delta[2]) / alpha, alpha];
  },
  interpolate: function(from, to, f) {
    var alpha = clamp(interp(from[3], to[3], f), 0, 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    from = this._premultiply(from);
    to = this._premultiply(to);
    return [interp(from[0], to[0], f) / alpha,
            interp(from[1], to[1], f) / alpha,
            interp(from[2], to[2], f) / alpha, alpha];
  },
  toCssValue: function(value) {
    return 'rgba(' + Math.round(value[0]) + ', ' + Math.round(value[1]) +
        ', ' + Math.round(value[2]) + ', ' + value[3] + ')';
  },
  fromCssValue: function(value) {
    // http://dev.w3.org/csswg/css-color/#color
    var out = [];

    var regexResult = colorHashRE.exec(value);
    if (regexResult) {
      if (value.length !== 4 && value.length !== 7) {
        return undefined;
      }

      var out = [];
      regexResult.shift();
      for (var i = 0; i < 3; i++) {
        if (regexResult[i].length === 1) {
          regexResult[i] = regexResult[i] + regexResult[i];
        }
        var v = Math.max(Math.min(parseInt(regexResult[i], 16), 255), 0);
        out[i] = v;
      }
      out.push(1.0);
    }

    var regexResult = colorRE.exec(value);
    if (regexResult) {
      regexResult.shift();
      var type = regexResult.shift().substr(0, 3);
      for (var i = 0; i < 3; i++) {
        var m = 1;
        if (regexResult[i][regexResult[i].length - 1] === '%') {
          regexResult[i] = regexResult[i].substr(0, regexResult[i].length - 1);
          m = 255.0 / 100.0;
        }
        if (type === 'rgb') {
          out[i] = clamp(Math.round(parseInt(regexResult[i], 10) * m), 0, 255);
        } else {
          out[i] = parseInt(regexResult[i], 10);
        }
      }

      // Convert hsl values to rgb value
      if (type === 'hsl') {
        out = hsl2rgb.apply(null, out);
      }

      if (typeof regexResult[3] !== 'undefined') {
        out[3] = Math.max(Math.min(parseFloat(regexResult[3]), 1.0), 0.0);
      } else {
        out.push(1.0);
      }
    }

    if (out.some(isNaN)) {
      return undefined;
    }
    if (out.length > 0) {
      return out;
    }
    return namedColors[value];
  }
});

var convertToDeg = function(num, type) {
  switch (type) {
    case 'grad':
      return num / 400 * 360;
    case 'rad':
      return num / 2 / Math.PI * 360;
    case 'turn':
      return num * 360;
    default:
      return num;
  }
};

var extractValue = function(values, pos, hasUnits) {
  var value = Number(values[pos]);
  if (!hasUnits) {
    return value;
  }
  var type = values[pos + 1];
  if (type === '') { type = 'px'; }
  var result = {};
  result[type] = value;
  return result;
};

var extractValues = function(values, numValues, hasOptionalValue,
    hasUnits) {
  var result = [];
  for (var i = 0; i < numValues; i++) {
    result.push(extractValue(values, 1 + 2 * i, hasUnits));
  }
  if (hasOptionalValue && values[1 + 2 * numValues]) {
    result.push(extractValue(values, 1 + 2 * numValues, hasUnits));
  }
  return result;
};

var SPACES = '\\s*';
var NUMBER = '[+-]?(?:\\d+|\\d*\\.\\d+)';
var RAW_OPEN_BRACKET = '\\(';
var RAW_CLOSE_BRACKET = '\\)';
var RAW_COMMA = ',';
var UNIT = '[a-zA-Z%]*';
var START = '^';

function capture(x) { return '(' + x + ')'; }
function optional(x) { return '(?:' + x + ')?'; }

var OPEN_BRACKET = [SPACES, RAW_OPEN_BRACKET, SPACES].join('');
var CLOSE_BRACKET = [SPACES, RAW_CLOSE_BRACKET, SPACES].join('');
var COMMA = [SPACES, RAW_COMMA, SPACES].join('');
var UNIT_NUMBER = [capture(NUMBER), capture(UNIT)].join('');

function transformRE(name, numParms, hasOptionalParm) {
  var tokenList = [START, SPACES, name, OPEN_BRACKET];
  for (var i = 0; i < numParms - 1; i++) {
    tokenList.push(UNIT_NUMBER);
    tokenList.push(COMMA);
  }
  tokenList.push(UNIT_NUMBER);
  if (hasOptionalParm) {
    tokenList.push(optional([COMMA, UNIT_NUMBER].join('')));
  }
  tokenList.push(CLOSE_BRACKET);
  return new RegExp(tokenList.join(''));
}

function buildMatcher(name, numValues, hasOptionalValue, hasUnits,
    baseValue) {
  var baseName = name;
  if (baseValue) {
    if (name[name.length - 1] === 'X' || name[name.length - 1] === 'Y') {
      baseName = name.substring(0, name.length - 1);
    } else if (name[name.length - 1] === 'Z') {
      baseName = name.substring(0, name.length - 1) + '3d';
    }
  }

  var f = function(x) {
    var r = extractValues(x, numValues, hasOptionalValue, hasUnits);
    if (baseValue !== undefined) {
      if (name[name.length - 1] === 'X') {
        r.push(baseValue);
      } else if (name[name.length - 1] === 'Y') {
        r = [baseValue].concat(r);
      } else if (name[name.length - 1] === 'Z') {
        r = [baseValue, baseValue].concat(r);
      } else if (hasOptionalValue) {
        while (r.length < 2) {
          if (baseValue === 'copy') {
            r.push(r[0]);
          } else {
            r.push(baseValue);
          }
        }
      }
    }
    return r;
  };
  return [transformRE(name, numValues, hasOptionalValue), f, baseName];
}

function buildRotationMatcher(name, numValues, hasOptionalValue,
    baseValue) {
  var m = buildMatcher(name, numValues, hasOptionalValue, true, baseValue);

  var f = function(x) {
    var r = m[1](x);
    return r.map(function(v) {
      var result = 0;
      for (var type in v) {
        result += convertToDeg(v[type], type);
      }
      return result;
    });
  };
  return [m[0], f, m[2]];
}

function build3DRotationMatcher() {
  var m = buildMatcher('rotate3d', 4, false, true);
  var f = function(x) {
    var r = m[1](x);
    var out = [];
    for (var i = 0; i < 3; i++) {
      out.push(r[i].px);
    }
    out.push(r[3]);
    return out;
  };
  return [m[0], f, m[2]];
}

var transformREs = [
  buildRotationMatcher('rotate', 1, false),
  buildRotationMatcher('rotateX', 1, false),
  buildRotationMatcher('rotateY', 1, false),
  buildRotationMatcher('rotateZ', 1, false),
  build3DRotationMatcher(),
  buildRotationMatcher('skew', 1, true, 0),
  buildRotationMatcher('skewX', 1, false),
  buildRotationMatcher('skewY', 1, false),
  buildMatcher('translateX', 1, false, true, {px: 0}),
  buildMatcher('translateY', 1, false, true, {px: 0}),
  buildMatcher('translateZ', 1, false, true, {px: 0}),
  buildMatcher('translate', 1, true, true, {px: 0}),
  buildMatcher('translate3d', 3, false, true),
  buildMatcher('scale', 1, true, false, 'copy'),
  buildMatcher('scaleX', 1, false, false, 1),
  buildMatcher('scaleY', 1, false, false, 1),
  buildMatcher('scaleZ', 1, false, false, 1),
  buildMatcher('scale3d', 3, false, false),
  buildMatcher('perspective', 1, false, true),
  buildMatcher('matrix', 6, false, false)
];

var decomposeMatrix = (function() {
  // this is only ever used on the perspective matrix, which has 0, 0, 0, 1 as
  // last column
  function determinant(m) {
    return m[0][0] * m[1][1] * m[2][2] +
           m[1][0] * m[2][1] * m[0][2] +
           m[2][0] * m[0][1] * m[1][2] -
           m[0][2] * m[1][1] * m[2][0] -
           m[1][2] * m[2][1] * m[0][0] -
           m[2][2] * m[0][1] * m[1][0];
  }

  // this is only ever used on the perspective matrix, which has 0, 0, 0, 1 as
  // last column
  //
  // from Wikipedia:
  //
  // [A B]^-1 = [A^-1 + A^-1B(D - CA^-1B)^-1CA^-1     -A^-1B(D - CA^-1B)^-1]
  // [C D]      [-(D - CA^-1B)^-1CA^-1                (D - CA^-1B)^-1      ]
  //
  // Therefore
  //
  // [A [0]]^-1 = [A^-1       [0]]
  // [C  1 ]      [ -CA^-1     1 ]
  function inverse(m) {
    var iDet = 1 / determinant(m);
    var a = m[0][0], b = m[0][1], c = m[0][2];
    var d = m[1][0], e = m[1][1], f = m[1][2];
    var g = m[2][0], h = m[2][1], k = m[2][2];
    var Ainv = [
      [(e * k - f * h) * iDet, (c * h - b * k) * iDet,
       (b * f - c * e) * iDet, 0],
      [(f * g - d * k) * iDet, (a * k - c * g) * iDet,
       (c * d - a * f) * iDet, 0],
      [(d * h - e * g) * iDet, (g * b - a * h) * iDet,
       (a * e - b * d) * iDet, 0]
    ];
    var lastRow = [];
    for (var i = 0; i < 3; i++) {
      var val = 0;
      for (var j = 0; j < 3; j++) {
        val += m[3][j] * Ainv[j][i];
      }
      lastRow.push(val);
    }
    lastRow.push(1);
    Ainv.push(lastRow);
    return Ainv;
  }

  function transposeMatrix4(m) {
    return [[m[0][0], m[1][0], m[2][0], m[3][0]],
            [m[0][1], m[1][1], m[2][1], m[3][1]],
            [m[0][2], m[1][2], m[2][2], m[3][2]],
            [m[0][3], m[1][3], m[2][3], m[3][3]]];
  }

  function multVecMatrix(v, m) {
    var result = [];
    for (var i = 0; i < 4; i++) {
      var val = 0;
      for (var j = 0; j < 4; j++) {
        val += v[j] * m[j][i];
      }
      result.push(val);
    }
    return result;
  }

  function normalize(v) {
    var len = length(v);
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  function length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function combine(v1, v2, v1s, v2s) {
    return [v1s * v1[0] + v2s * v2[0], v1s * v1[1] + v2s * v2[1],
            v1s * v1[2] + v2s * v2[2]];
  }

  function cross(v1, v2) {
    return [v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]];
  }

  function decomposeMatrix(matrix) {
    var m3d = [[matrix[0], matrix[1], 0, 0],
               [matrix[2], matrix[3], 0, 0],
               [0, 0, 1, 0],
               [matrix[4], matrix[5], 0, 1]];

    // skip normalization step as m3d[3][3] should always be 1
    if (m3d[3][3] !== 1) {
      throw 'attempt to decompose non-normalized matrix';
    }

    var perspectiveMatrix = m3d.concat(); // copy m3d
    for (var i = 0; i < 3; i++) {
      perspectiveMatrix[i][3] = 0;
    }

    if (determinant(perspectiveMatrix) === 0) {
      return false;
    }

    var rhs = [];

    var perspective;
    if (m3d[0][3] !== 0 || m3d[1][3] !== 0 || m3d[2][3] !== 0) {
      rhs.push(m3d[0][3]);
      rhs.push(m3d[1][3]);
      rhs.push(m3d[2][3]);
      rhs.push(m3d[3][3]);

      var inversePerspectiveMatrix = inverse(perspectiveMatrix);
      var transposedInversePerspectiveMatrix =
          transposeMatrix4(inversePerspectiveMatrix);
      perspective = multVecMatrix(rhs, transposedInversePerspectiveMatrix);
    } else {
      perspective = [0, 0, 0, 1];
    }

    var translate = m3d[3].slice(0, 3);

    var row = [];
    row.push(m3d[0].slice(0, 3));
    var scale = [];
    scale.push(length(row[0]));
    row[0] = normalize(row[0]);

    var skew = [];
    row.push(m3d[1].slice(0, 3));
    skew.push(dot(row[0], row[1]));
    row[1] = combine(row[1], row[0], 1.0, -skew[0]);

    scale.push(length(row[1]));
    row[1] = normalize(row[1]);
    skew[0] /= scale[1];

    row.push(m3d[2].slice(0, 3));
    skew.push(dot(row[0], row[2]));
    row[2] = combine(row[2], row[0], 1.0, -skew[1]);
    skew.push(dot(row[1], row[2]));
    row[2] = combine(row[2], row[1], 1.0, -skew[2]);

    scale.push(length(row[2]));
    row[2] = normalize(row[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];

    var pdum3 = cross(row[1], row[2]);
    if (dot(row[0], pdum3) < 0) {
      for (var i = 0; i < 3; i++) {
        scale[i] *= -1;
        row[i][0] *= -1;
        row[i][1] *= -1;
        row[i][2] *= -1;
      }
    }

    var t = row[0][0] + row[1][1] + row[2][2] + 1;
    var s;
    var quaternion;

    if (t > 1e-4) {
      s = 0.5 / Math.sqrt(t);
      quaternion = [
        (row[2][1] - row[1][2]) * s,
        (row[0][2] - row[2][0]) * s,
        (row[1][0] - row[0][1]) * s,
        0.25 / s
      ];
    } else if (row[0][0] > row[1][1] && row[0][0] > row[2][2]) {
      s = Math.sqrt(1 + row[0][0] - row[1][1] - row[2][2]) * 2.0;
      quaternion = [
        0.25 * s,
        (row[0][1] + row[1][0]) / s,
        (row[0][2] + row[2][0]) / s,
        (row[2][1] - row[1][2]) / s
      ];
    } else if (row[1][1] > row[2][2]) {
      s = Math.sqrt(1.0 + row[1][1] - row[0][0] - row[2][2]) * 2.0;
      quaternion = [
        (row[0][1] + row[1][0]) / s,
        0.25 * s,
        (row[1][2] + row[2][1]) / s,
        (row[0][2] - row[2][0]) / s
      ];
    } else {
      s = Math.sqrt(1.0 + row[2][2] - row[0][0] - row[1][1]) * 2.0;
      quaternion = [
        (row[0][2] + row[2][0]) / s,
        (row[1][2] + row[2][1]) / s,
        0.25 * s,
        (row[1][0] - row[0][1]) / s
      ];
    }

    return {
      translate: translate, scale: scale, skew: skew,
      quaternion: quaternion, perspective: perspective
    };
  }
  return decomposeMatrix;
})();

function dot(v1, v2) {
  var result = 0;
  for (var i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function multiplyMatrices(a, b) {
  return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
          a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
          a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
}

function convertItemToMatrix(item) {
  switch (item.t) {
    case 'rotate':
      var amount = item.d * Math.PI / 180;
      return [Math.cos(amount), Math.sin(amount),
              -Math.sin(amount), Math.cos(amount), 0, 0];
    case 'scale':
      return [item.d[0], 0, 0, item.d[1], 0, 0];
    // TODO: Work out what to do with non-px values.
    case 'translate':
      return [1, 0, 0, 1, item.d[0].px, item.d[1].px];
    case 'matrix':
      return item.d;
  }
}

function convertToMatrix(transformList) {
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}

var composeMatrix = (function() {
  function multiply(a, b) {
    var result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }

  function composeMatrix(translate, scale, skew, quat, perspective) {
    var matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    for (var i = 0; i < 4; i++) {
      matrix[i][3] = perspective[i];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[3][i] += translate[j] * matrix[j][i];
      }
    }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

    var rotMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);

    matrix = multiply(matrix, rotMatrix);

    var temp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply(matrix, temp);
    }

    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[i][j] *= scale[i];
      }
    }

    return {t: 'matrix', d: [matrix[0][0], matrix[0][1],
                             matrix[1][0], matrix[1][1],
                             matrix[3][0], matrix[3][1]]};
  }
  return composeMatrix;
})();

function interpolateTransformsWithMatrices(from, to, f) {
  var fromM = decomposeMatrix(convertToMatrix(from));
  var toM = decomposeMatrix(convertToMatrix(to));

  var product = dot(fromM.quaternion, toM.quaternion);
  product = clamp(product, -1.0, 1.0);

  var quat = [];
  if (product === 1.0) {
    quat = fromM.quaternion;
  } else {
    var theta = Math.acos(product);
    var w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);

    for (var i = 0; i < 4; i++) {
      quat.push(fromM.quaternion[i] * (Math.cos(f * theta) - product * w) +
                toM.quaternion[i] * w);
    }
  }

  var translate = interp(fromM.translate, toM.translate, f);
  var scale = interp(fromM.scale, toM.scale, f);
  var skew = interp(fromM.skew, toM.skew, f);
  var perspective = interp(fromM.perspective, toM.perspective, f);

  return composeMatrix(translate, scale, skew, quat, perspective);
}

function interpTransformValue(from, to, f) {
  var type = from.t ? from.t : to.t;
  switch (type) {
    // Transforms with unitless parameters.
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'scale':
    case 'scaleX':
    case 'scaleY':
    case 'scaleZ':
    case 'scale3d':
    case 'skew':
    case 'skewX':
    case 'skewY':
    case 'matrix':
      return {t: type, d: interp(from.d, to.d, f, type)};
    default:
      // Transforms with lengthType parameters.
      var result = [];
      var maxVal;
      if (from.d && to.d) {
        maxVal = Math.max(from.d.length, to.d.length);
      } else if (from.d) {
        maxVal = from.d.length;
      } else {
        maxVal = to.d.length;
      }
      for (var j = 0; j < maxVal; j++) {
        var fromVal = from.d ? from.d[j] : {};
        var toVal = to.d ? to.d[j] : {};
        result.push(lengthType.interpolate(fromVal, toVal, f));
      }
      return {t: type, d: result};
  }
}

// The CSSWG decided to disallow scientific notation in CSS property strings
// (see http://lists.w3.org/Archives/Public/www-style/2010Feb/0050.html).
// We need this function to hakonitize all numbers before adding them to
// property strings.
// TODO: Apply this function to all property strings
function n(num) {
  return Number(num).toFixed(4);
}

var transformType = {
  add: function(base, delta) { return base.concat(delta); },
  interpolate: function(from, to, f) {
    var out = [];
    for (var i = 0; i < Math.min(from.length, to.length); i++) {
      if (from[i].t !== to[i].t) {
        break;
      }
      out.push(interpTransformValue(from[i], to[i], f));
    }

    if (i < Math.min(from.length, to.length)) {
      out.push(interpolateTransformsWithMatrices(from.slice(i), to.slice(i),
          f));
      return out;
    }

    for (; i < from.length; i++) {
      out.push(interpTransformValue(from[i], {t: null, d: null}, f));
    }
    for (; i < to.length; i++) {
      out.push(interpTransformValue({t: null, d: null}, to[i], f));
    }
    return out;
  },
  toCssValue: function(value, svgMode) {
    // TODO: fix this :)
    var out = '';
    for (var i = 0; i < value.length; i++) {
      ASSERT_ENABLED && assert(
          value[i].t, 'transform type should be resolved by now');
      switch (value[i].t) {
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'rotateZ':
        case 'skewX':
        case 'skewY':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d + unit + ') ';
          break;
        case 'skew':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d[0] + unit;
          if (value[i].d[1] === 0) {
            out += ') ';
          } else {
            out += ', ' + value[i].d[1] + unit + ') ';
          }
          break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
        case 'perspective':
          out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
              ') ';
          break;
        case 'translate':
          if (svgMode) {
            if (value[i].d[1] === undefined) {
              out += value[i].t + '(' + value[i].d[0].px + ') ';
            } else {
              out += (
                  value[i].t + '(' + value[i].d[0].px + ', ' +
                  value[i].d[1].px + ') ');
            }
            break;
          }
          if (value[i].d[1] === undefined) {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ') ';
          } else {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ', ' + lengthType.toCssValue(value[i].d[1]) + ') ';
          }
          break;
        case 'translate3d':
          var values = value[i].d.map(lengthType.toCssValue);
          out += value[i].t + '(' + values[0] + ', ' + values[1] +
              ', ' + values[2] + ') ';
          break;
        case 'scale':
          if (value[i].d[0] === value[i].d[1]) {
            out += value[i].t + '(' + value[i].d[0] + ') ';
          } else {
            out += value[i].t + '(' + value[i].d[0] + ', ' + value[i].d[1] +
                ') ';
          }
          break;
        case 'scaleX':
        case 'scaleY':
        case 'scaleZ':
          out += value[i].t + '(' + value[i].d[0] + ') ';
          break;
        case 'scale3d':
          out += value[i].t + '(' + value[i].d[0] + ', ' +
              value[i].d[1] + ', ' + value[i].d[2] + ') ';
          break;
        case 'matrix':
          out += value[i].t + '(' +
              n(value[i].d[0]) + ', ' + n(value[i].d[1]) + ', ' +
              n(value[i].d[2]) + ', ' + n(value[i].d[3]) + ', ' +
              n(value[i].d[4]) + ', ' + n(value[i].d[5]) + ') ';
          break;
      }
    }
    return out.substring(0, out.length - 1);
  },
  fromCssValue: function(value) {
    // TODO: fix this :)
    if (value === undefined) {
      return undefined;
    }
    var result = [];
    while (value.length > 0) {
      var r;
      for (var i = 0; i < transformREs.length; i++) {
        var reSpec = transformREs[i];
        r = reSpec[0].exec(value);
        if (r) {
          result.push({t: reSpec[2], d: reSpec[1](r)});
          value = value.substring(r[0].length);
          break;
        }
      }
      if (!isDefinedAndNotNull(r)) {
        return result;
      }
    }
    return result;
  }
};

var propertyTypes = {
  backgroundColor: colorType,
  backgroundPosition: positionListType,
  borderBottomColor: colorType,
  borderBottomLeftRadius: percentLengthType,
  borderBottomRightRadius: percentLengthType,
  borderBottomWidth: lengthType,
  borderLeftColor: colorType,
  borderLeftWidth: lengthType,
  borderRightColor: colorType,
  borderRightWidth: lengthType,
  borderSpacing: lengthType,
  borderTopColor: colorType,
  borderTopLeftRadius: percentLengthType,
  borderTopRightRadius: percentLengthType,
  borderTopWidth: lengthType,
  bottom: percentLengthAutoType,
  boxShadow: shadowType,
  clip: typeWithKeywords(['auto'], rectangleType),
  color: colorType,
  cx: lengthType,

  // TODO: Handle these keywords properly.
  fontSize: typeWithKeywords(['smaller', 'larger'], percentLengthType),
  fontWeight: typeWithKeywords(['lighter', 'bolder'], fontWeightType),

  height: percentLengthAutoType,
  left: percentLengthAutoType,
  letterSpacing: typeWithKeywords(['normal'], lengthType),
  lineHeight: percentLengthType, // TODO: Should support numberType as well.
  marginBottom: lengthAutoType,
  marginLeft: lengthAutoType,
  marginRight: lengthAutoType,
  marginTop: lengthAutoType,
  maxHeight: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  maxWidth: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minHeight: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minWidth: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  opacity: numberType,
  outlineColor: typeWithKeywords(['invert'], colorType),
  outlineOffset: lengthType,
  outlineWidth: lengthType,
  paddingBottom: lengthType,
  paddingLeft: lengthType,
  paddingRight: lengthType,
  paddingTop: lengthType,
  right: percentLengthAutoType,
  textIndent: typeWithKeywords(['each-line', 'hanging'], percentLengthType),
  textShadow: shadowType,
  top: percentLengthAutoType,
  transform: transformType,
  verticalAlign: typeWithKeywords([
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom'
  ], percentLengthType),
  visibility: visibilityType,
  width: typeWithKeywords([
    'border-box',
    'content-box',
    'auto',
    'max-content',
    'min-content',
    'available',
    'fit-content'
  ], percentLengthType),
  wordSpacing: typeWithKeywords(['normal'], percentLengthType),
  x: lengthType,
  y: lengthType,
  zIndex: typeWithKeywords(['auto'], integerType)
};

var svgProperties = {
  'cx': 1,
  'width': 1,
  'x': 1,
  'y': 1
};

var borderWidthAliases = {
  initial: '3px',
  thin: '1px',
  medium: '3px',
  thick: '5px'
};

var propertyValueAliases = {
  backgroundColor: { initial: 'transparent' },
  backgroundPosition: { initial: '0% 0%' },
  borderBottomColor: { initial: 'currentColor' },
  borderBottomLeftRadius: { initial: '0px' },
  borderBottomRightRadius: { initial: '0px' },
  borderBottomWidth: borderWidthAliases,
  borderLeftColor: { initial: 'currentColor' },
  borderLeftWidth: borderWidthAliases,
  borderRightColor: { initial: 'currentColor' },
  borderRightWidth: borderWidthAliases,
  // Spec says this should be 0 but in practise it is 2px.
  borderSpacing: { initial: '2px' },
  borderTopColor: { initial: 'currentColor' },
  borderTopLeftRadius: { initial: '0px' },
  borderTopRightRadius: { initial: '0px' },
  borderTopWidth: borderWidthAliases,
  bottom: { initial: 'auto' },
  clip: { initial: 'rect(0px, 0px, 0px, 0px)' },
  color: { initial: 'black' }, // Depends on user agent.
  fontSize: {
    initial: '100%',
    'xx-small': '60%',
    'x-small': '75%',
    'small': '89%',
    'medium': '100%',
    'large': '120%',
    'x-large': '150%',
    'xx-large': '200%'
  },
  fontWeight: {
    initial: '400',
    normal: '400',
    bold: '700'
  },
  height: { initial: 'auto' },
  left: { initial: 'auto' },
  letterSpacing: { initial: 'normal' },
  lineHeight: {
    initial: '120%',
    normal: '120%'
  },
  marginBottom: { initial: '0px' },
  marginLeft: { initial: '0px' },
  marginRight: { initial: '0px' },
  marginTop: { initial: '0px' },
  maxHeight: { initial: 'none' },
  maxWidth: { initial: 'none' },
  minHeight: { initial: '0px' },
  minWidth: { initial: '0px' },
  opacity: { initial: '1.0' },
  outlineColor: { initial: 'invert' },
  outlineOffset: { initial: '0px' },
  outlineWidth: borderWidthAliases,
  paddingBottom: { initial: '0px' },
  paddingLeft: { initial: '0px' },
  paddingRight: { initial: '0px' },
  paddingTop: { initial: '0px' },
  right: { initial: 'auto' },
  textIndent: { initial: '0px' },
  textShadow: {
    initial: '0px 0px 0px transparent',
    none: '0px 0px 0px transparent'
  },
  top: { initial: 'auto' },
  transform: {
    initial: '',
    none: ''
  },
  verticalAlign: { initial: '0px' },
  visibility: { initial: 'visible' },
  width: { initial: 'auto' },
  wordSpacing: { initial: 'normal' },
  zIndex: { initial: 'auto' }
};

var propertyIsSVGAttrib = function(property, target) {
  return target.namespaceURI === 'http://www.w3.org/2000/svg' &&
      property in svgProperties;
};

var getType = function(property) {
  return propertyTypes[property] || nonNumericType;
};

var add = function(property, base, delta) {
  if (delta === rawNeutralValue) {
    return base;
  }
  if (base === 'inherit' || delta === 'inherit') {
    return nonNumericType.add(base, delta);
  }
  return getType(property).add(base, delta);
};


/**
 * Interpolate the given property name (f*100)% of the way from 'from' to 'to'.
 * 'from' and 'to' are both raw values already converted from CSS value
 * strings. Requires the target element to be able to determine whether the
 * given property is an SVG attribute or not, as this impacts the conversion of
 * the interpolated value back into a CSS value string for transform
 * translations.
 *
 * e.g. interpolate('transform', elem, 'rotate(40deg)', 'rotate(50deg)', 0.3);
 *   will return 'rotate(43deg)'.
 */
var interpolate = function(property, from, to, f) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(from) && isDefinedAndNotNull(to),
      'Both to and from values should be specified for interpolation');
  if (from === 'inherit' || to === 'inherit') {
    return nonNumericType.interpolate(from, to, f);
  }
  if (f === 0) {
    return from;
  }
  if (f === 1) {
    return to;
  }
  return getType(property).interpolate(from, to, f);
};


/**
 * Convert the provided interpolable value for the provided property to a CSS
 * value string. Note that SVG transforms do not require units for translate
 * or rotate values while CSS properties require 'px' or 'deg' units.
 */
var toCssValue = function(property, value, svgMode) {
  if (value === 'inherit') {
    return value;
  }
  return getType(property).toCssValue(value, svgMode);
};

var fromCssValue = function(property, value) {
  if (value === cssNeutralValue) {
    return rawNeutralValue;
  }
  if (value === 'inherit') {
    return value;
  }
  if (property in propertyValueAliases &&
      value in propertyValueAliases[property]) {
    value = propertyValueAliases[property][value];
  }
  var result = getType(property).fromCssValue(value);
  // Currently we'll hit this assert if input to the API is bad. To avoid this,
  // we should eliminate invalid values when normalizing the list of keyframes.
  // See the TODO in isSupportedPropertyValue().
  ASSERT_ENABLED && assert(isDefinedAndNotNull(result),
      'Invalid property value "' + value + '" for property "' + property + '"');
  return result;
};

// Sentinel values
var cssNeutralValue = {};
var rawNeutralValue = {};



/** @constructor */
var CompositableValue = function() {
};

CompositableValue.prototype = {
  compositeOnto: abstractMethod,
  // This is purely an optimization.
  dependsOnUnderlyingValue: function() {
    return true;
  }
};



/** @constructor */
var AddReplaceCompositableValue = function(value, composite) {
  this.value = value;
  this.composite = composite;
  ASSERT_ENABLED && assert(
      !(this.value === cssNeutralValue && this.composite === 'replace'),
      'Should never replace-composite the neutral value');
};

AddReplaceCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        switch (this.composite) {
          case 'replace':
            return this.value;
          case 'add':
            return add(property, underlyingValue, this.value);
          default:
            ASSERT_ENABLED && assert(
                false, 'Invalid composite operation ' + this.composite);
        }
      },
      dependsOnUnderlyingValue: function() {
        return this.composite === 'add';
      }
    });



/** @constructor */
var BlendedCompositableValue = function(startValue, endValue, fraction) {
  this.startValue = startValue;
  this.endValue = endValue;
  this.fraction = fraction;
};

BlendedCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        return interpolate(property,
            this.startValue.compositeOnto(property, underlyingValue),
            this.endValue.compositeOnto(property, underlyingValue),
            this.fraction);
      },
      dependsOnUnderlyingValue: function() {
        // Travis crashes here randomly in Chrome beta and unstable,
        // this try catch is to help debug the problem.
        try {
          return this.startValue.dependsOnUnderlyingValue() ||
              this.endValue.dependsOnUnderlyingValue();
        }
        catch (error) {
          throw new Error(
              error + '\n JSON.stringify(this) = ' + JSON.stringify(this));
        }
      }
    });



/** @constructor */
var AccumulatedCompositableValue = function(
    bottomValue, accumulatingValue, accumulationCount) {
  this.bottomValue = bottomValue;
  this.accumulatingValue = accumulatingValue;
  this.accumulationCount = accumulationCount;
  ASSERT_ENABLED && assert(this.accumulationCount > 0,
      'Accumumlation count should be strictly positive');
};

AccumulatedCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        // The spec defines accumulation recursively, but we do it iteratively
        // to better handle large numbers of iterations.
        var result = this.bottomValue.compositeOnto(property, underlyingValue);
        for (var i = 0; i < this.accumulationCount; i++) {
          result = this.accumulatingValue.compositeOnto(property, result);
        }
        return result;
      },
      dependsOnUnderlyingValue: function() {
        return this.bottomValue.dependsOnUnderlyingValue() &&
            this.accumulatingValue.dependsOnUnderlyingValue();
      }
    });



/** @constructor */
var CompositedPropertyMap = function(target) {
  this.properties = {};
  this.baseValues = {};
  this.target = target;
};

CompositedPropertyMap.prototype = {
  addValue: function(property, animValue) {
    if (!(property in this.properties)) {
      this.properties[property] = [];
    }
    if (!(animValue instanceof CompositableValue)) {
      throw new TypeError('expected CompositableValue');
    }
    this.properties[property].push(animValue);
  },
  stackDependsOnUnderlyingValue: function(stack) {
    for (var i = 0; i < stack.length; i++) {
      if (!stack[i].dependsOnUnderlyingValue()) {
        return false;
      }
    }
    return true;
  },
  clear: function() {
    for (var property in this.properties) {
      if (this.stackDependsOnUnderlyingValue(this.properties[property])) {
        clearValue(this.target, property);
      }
    }
  },
  captureBaseValues: function() {
    for (var property in this.properties) {
      var stack = this.properties[property];
      if (stack.length > 0 && this.stackDependsOnUnderlyingValue(stack)) {
        var baseValue = fromCssValue(property, getValue(this.target, property));
        // TODO: Decide what to do with elements not in the DOM.
        ASSERT_ENABLED && assert(
            isDefinedAndNotNull(baseValue) && baseValue !== '',
            'Base value should always be set. ' +
            'Is the target element in the DOM?');
        this.baseValues[property] = baseValue;
      } else {
        this.baseValues[property] = undefined;
      }
    }
  },
  applyAnimatedValues: function() {
    for (var property in this.properties) {
      var valuesToComposite = this.properties[property];
      if (valuesToComposite.length === 0) {
        continue;
      }
      var baseValue = this.baseValues[property];
      var i = valuesToComposite.length - 1;
      while (i > 0 && valuesToComposite[i].dependsOnUnderlyingValue()) {
        i--;
      }
      for (; i < valuesToComposite.length; i++) {
        baseValue = valuesToComposite[i].compositeOnto(property, baseValue);
      }
      ASSERT_ENABLED && assert(
          isDefinedAndNotNull(baseValue) && baseValue !== '',
          'Value should always be set after compositing');
      var isSvgMode = propertyIsSVGAttrib(property, this.target);
      setValue(this.target, property, toCssValue(property, baseValue,
          isSvgMode));
      this.properties[property] = [];
    }
  }
};


var cssStyleDeclarationAttribute = {
  cssText: true,
  length: true,
  parentRule: true,
  'var': true
};

var cssStyleDeclarationMethodModifiesStyle = {
  getPropertyValue: false,
  getPropertyCSSValue: false,
  removeProperty: true,
  getPropertyPriority: false,
  setProperty: true,
  item: false
};

var copyInlineStyle = function(sourceStyle, destinationStyle) {
  for (var i = 0; i < sourceStyle.length; i++) {
    var property = sourceStyle[i];
    destinationStyle[property] = sourceStyle[property];
  }
};

var retickThenGetComputedStyle = function() {
  repeatLastTick();
  ensureOriginalGetComputedStyle();
  return window.getComputedStyle.apply(this, arguments);
};

// This redundant flag is to support Safari which has trouble determining
// function object equality during an animation.
var isGetComputedStylePatched = false;
var originalGetComputedStyle = window.getComputedStyle;

var ensureRetickBeforeGetComputedStyle = function() {
  if (!isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: retickThenGetComputedStyle
    }));
    isGetComputedStylePatched = true;
  }
};

var ensureOriginalGetComputedStyle = function() {
  if (isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: originalGetComputedStyle
    }));
    isGetComputedStylePatched = false;
  }
};

// Changing the inline style of an element under animation may require the
// animation to be recomputed ontop of the new inline style if
// getComputedStyle() is called inbetween setting the style and the next
// animation frame.
// We modify getComputedStyle() to re-evaluate the animations only if it is
// called instead of re-evaluating them here potentially unnecessarily.
var animatedInlineStyleChanged = function() {
  maybeRestartAnimation();
  ensureRetickBeforeGetComputedStyle();
};



/** @constructor */
var AnimatedCSSStyleDeclaration = function(element) {
  ASSERT_ENABLED && assert(
      !(element.style instanceof AnimatedCSSStyleDeclaration),
      'Element must not already have an animated style attached.');

  // Stores the inline style of the element on its behalf while the
  // polyfill uses the element's inline style to simulate web animations.
  // This is needed to fake regular inline style CSSOM access on the element.
  this._surrogateElement = createDummyElement();
  this._style = element.style;
  this._length = 0;
  this._isAnimatedProperty = {};

  // Populate the surrogate element's inline style.
  copyInlineStyle(this._style, this._surrogateElement.style);
  this._updateIndices();
};

AnimatedCSSStyleDeclaration.prototype = {
  get cssText() {
    return this._surrogateElement.style.cssText;
  },
  set cssText(text) {
    var isAffectedProperty = {};
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    this._surrogateElement.style.cssText = text;
    this._updateIndices();
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    for (var property in isAffectedProperty) {
      if (!this._isAnimatedProperty[property]) {
        this._style.setProperty(property,
            this._surrogateElement.style.getPropertyValue(property));
      }
    }
    animatedInlineStyleChanged();
  },
  get length() {
    return this._surrogateElement.style.length;
  },
  get parentRule() {
    return this._style.parentRule;
  },
  get 'var'() {
    return this._style.var;
  },
  _updateIndices: function() {
    while (this._length < this._surrogateElement.style.length) {
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        get: (function(index) {
          return function() {
            return this._surrogateElement.style[index];
          };
        })(this._length)
      });
      this._length++;
    }
    while (this._length > this._surrogateElement.style.length) {
      this._length--;
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        value: undefined
      });
    }
  },
  _clearAnimatedProperty: function(property) {
    this._style[property] = this._surrogateElement.style[property];
    this._isAnimatedProperty[property] = false;
  },
  _setAnimatedProperty: function(property, value) {
    this._style[property] = value;
    this._isAnimatedProperty[property] = true;
  }
};

for (var method in cssStyleDeclarationMethodModifiesStyle) {
  AnimatedCSSStyleDeclaration.prototype[method] =
      (function(method, modifiesStyle) {
    return function() {
      var result = this._surrogateElement.style[method].apply(
          this._surrogateElement.style, arguments);
      if (modifiesStyle) {
        if (!this._isAnimatedProperty[arguments[0]]) {
          this._style[method].apply(this._style, arguments);
        }
        this._updateIndices();
        animatedInlineStyleChanged();
      }
      return result;
    }
  })(method, cssStyleDeclarationMethodModifiesStyle[method]);
}

for (var property in document.documentElement.style) {
  if (cssStyleDeclarationAttribute[property] ||
      property in cssStyleDeclarationMethodModifiesStyle) {
    continue;
  }
  (function(property) {
    Object.defineProperty(AnimatedCSSStyleDeclaration.prototype, property,
        configureDescriptor({
          get: function() {
            return this._surrogateElement.style[property];
          },
          set: function(value) {
            this._surrogateElement.style[property] = value;
            this._updateIndices();
            if (!this._isAnimatedProperty[property]) {
              this._style[property] = value;
            }
            animatedInlineStyleChanged();
          }
        }));
  })(property);
}

// This function is a fallback for when we can't replace an element's style with
// AnimatatedCSSStyleDeclaration and must patch the existing style to behave
// in a similar way.
// Only the methods listed in cssStyleDeclarationMethodModifiesStyle will
// be patched to behave in the same manner as a native implementation,
// getter properties like style.left or style[0] will be tainted by the
// polyfill's animation engine.
var patchInlineStyleForAnimation = function(style) {
  var surrogateElement = document.createElement('div');
  copyInlineStyle(style, surrogateElement.style);
  var isAnimatedProperty = {};
  for (var method in cssStyleDeclarationMethodModifiesStyle) {
    if (!(method in style)) {
      continue;
    }
    Object.defineProperty(style, method, configureDescriptor({
      value: (function(method, originalMethod, modifiesStyle) {
        return function() {
          var result = surrogateElement.style[method].apply(
              surrogateElement.style, arguments);
          if (modifiesStyle) {
            if (!isAnimatedProperty[arguments[0]]) {
              originalMethod.apply(style, arguments);
            }
            animatedInlineStyleChanged();
          }
          return result;
        }
      })(method, style[method], cssStyleDeclarationMethodModifiesStyle[method])
    }));
  }

  style._clearAnimatedProperty = function(property) {
    this[property] = surrogateElement.style[property];
    isAnimatedProperty[property] = false;
  };

  style._setAnimatedProperty = function(property, value) {
    this[property] = value;
    isAnimatedProperty[property] = true;
  };
};



/** @constructor */
var Compositor = function() {
  this.targets = [];
};

Compositor.prototype = {
  setAnimatedValue: function(target, property, animValue) {
    if (target !== null) {
      if (target._animProperties === undefined) {
        target._animProperties = new CompositedPropertyMap(target);
        this.targets.push(target);
      }
      target._animProperties.addValue(property, animValue);
    }
  },
  applyAnimatedValues: function() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.clear();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.captureBaseValues();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.applyAnimatedValues();
    }
  }
};

var ensureTargetInitialised = function(property, target) {
  if (propertyIsSVGAttrib(property, target)) {
    ensureTargetSVGInitialised(property, target);
  } else {
    ensureTargetCSSInitialised(target);
  }
};

var ensureTargetSVGInitialised = function(property, target) {
  if (!isDefinedAndNotNull(target._actuals)) {
    target._actuals = {};
    target._bases = {};
    target.actuals = {};
    target._getAttribute = target.getAttribute;
    target._setAttribute = target.setAttribute;
    target.getAttribute = function(name) {
      if (isDefinedAndNotNull(target._bases[name])) {
        return target._bases[name];
      }
      return target._getAttribute(name);
    };
    target.setAttribute = function(name, value) {
      if (isDefinedAndNotNull(target._actuals[name])) {
        target._bases[name] = value;
      } else {
        target._setAttribute(name, value);
      }
    };
  }
  if (!isDefinedAndNotNull(target._actuals[property])) {
    var baseVal = target.getAttribute(property);
    target._actuals[property] = 0;
    target._bases[property] = baseVal;

    Object.defineProperty(target.actuals, property, configureDescriptor({
      set: function(value) {
        if (value === null) {
          target._actuals[property] = target._bases[property];
          target._setAttribute(property, target._bases[property]);
        } else {
          target._actuals[property] = value;
          target._setAttribute(property, value);
        }
      },
      get: function() {
        return target._actuals[property];
      }
    }));
  }
};

var ensureTargetCSSInitialised = function(target) {
  if (target.style._webAnimationsStyleInitialised) {
    return;
  }
  try {
    var animatedStyle = new AnimatedCSSStyleDeclaration(target);
    Object.defineProperty(target, 'style', configureDescriptor({
      get: function() { return animatedStyle; }
    }));
  } catch (error) {
    patchInlineStyleForAnimation(target.style);
  }
  target.style._webAnimationsStyleInitialised = true;
};

var setValue = function(target, property, value) {
  ensureTargetInitialised(property, target);
  if (property === 'transform') {
    property = features.transformProperty;
  }
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = value;
  } else {
    target.style._setAnimatedProperty(property, value);
  }
};

var clearValue = function(target, property) {
  ensureTargetInitialised(property, target);
  if (property === 'transform') {
    property = features.transformProperty;
  }
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = null;
  } else {
    target.style._clearAnimatedProperty(property);
  }
};

var getValue = function(target, property) {
  ensureTargetInitialised(property, target);
  if (property === 'transform') {
    property = features.transformProperty;
  }
  if (propertyIsSVGAttrib(property, target)) {
    return target.actuals[property];
  } else {
    return getComputedStyle(target)[property];
  }
};

var rafScheduled = false;

var compositor = new Compositor();

var usePerformanceTiming =
    typeof window.performance === 'object' &&
    typeof window.performance.timing === 'object' &&
    typeof window.performance.now === 'function';

// Don't use a local named requestAnimationFrame, to avoid potential problems
// with hoisting.
var nativeRaf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
var raf;
if (nativeRaf) {
  raf = function(callback) {
    nativeRaf(function() {
      callback(clockMillis());
    });
  };
} else {
  raf = function(callback) {
    setTimeout(function() {
      callback(clockMillis());
    }, 1000 / 60);
  };
}

var clockMillis = function() {
  return usePerformanceTiming ? window.performance.now() : Date.now();
};
// Set up the zero times for document time. Document time is relative to the
// document load event.
var documentTimeZeroAsRafTime;
var documentTimeZeroAsClockTime;
var load;
if (usePerformanceTiming) {
  load = function() {
    // RAF time is relative to the navigationStart event.
    documentTimeZeroAsRafTime =
        window.performance.timing.loadEventStart -
        window.performance.timing.navigationStart;
    // performance.now() uses the same origin as RAF time.
    documentTimeZeroAsClockTime = documentTimeZeroAsRafTime;
  };
} else {
  // The best approximation we have for the relevant clock and RAF times is to
  // listen to the load event.
  load = function() {
    raf(function(rafTime) {
      documentTimeZeroAsRafTime = rafTime;
    });
    documentTimeZeroAsClockTime = Date.now();
  };
}
// Start timing when load event fires or if this script is processed when
// document loading is already complete.
if (document.readyState === 'complete') {
  // When performance timing is unavailable and this script is loaded
  // dynamically, document zero time is incorrect.
  // Warn the user in this case.
  if (!usePerformanceTiming) {
    console.warn(
        'Web animations can\'t discover document zero time when ' +
        'asynchronously loaded in the absence of performance timing.');
  }
  load();
} else {
  addEventListener('load', function() {
    load();
    if (usePerformanceTiming) {
      // We use setTimeout() to clear cachedClockTimeMillis at the end of a
      // frame, but this will not run until after other load handlers. We need
      // those handlers to pick up the new value of clockMillis(), so we must
      // clear the cached value.
      cachedClockTimeMillis = undefined;
    }
  });
}

// A cached document time for use during the current callstack.
var cachedClockTimeMillis;
// Calculates one time relative to another, returning null if the zero time is
// undefined.
var relativeTime = function(time, zeroTime) {
  return isDefined(zeroTime) ? time - zeroTime : null;
};

var lastClockTimeMillis;

var cachedClockTime = function() {
  // Cache a document time for the remainder of this callstack.
  if (!isDefined(cachedClockTimeMillis)) {
    cachedClockTimeMillis = clockMillis();
    lastClockTimeMillis = cachedClockTimeMillis;
    setTimeout(function() { cachedClockTimeMillis = undefined; }, 0);
  }
  return cachedClockTimeMillis / 1000;
};


// These functions should be called in every stack that could possibly modify
// the effect results that have already been calculated for the current tick.
var modifyCurrentAnimationStateDepth = 0;
var enterModifyCurrentAnimationState = function() {
  modifyCurrentAnimationStateDepth++;
};
var exitModifyCurrentAnimationState = function(updateCallback) {
  modifyCurrentAnimationStateDepth--;
  // updateCallback is set to null when we know we can't possibly affect the
  // current state (eg. a TimedItem which is not attached to a player). We track
  // the depth of recursive calls trigger just one repeat per entry. Only the
  // updateCallback from the outermost call is considered, this allows certain
  // locatations (eg. constructors) to override nested calls that would
  // otherwise set updateCallback unconditionally.
  if (modifyCurrentAnimationStateDepth === 0 && updateCallback) {
    updateCallback();
  }
};

var repeatLastTick = function() {
  if (isDefined(lastTickTime)) {
    ticker(lastTickTime, true);
  }
};

var playerSortFunction = function(a, b) {
  var result = a.startTime - b.startTime;
  return result !== 0 ? result : a._sequenceNumber - b._sequenceNumber;
};

var lastTickTime;
var ticker = function(rafTime, isRepeat) {
  // Don't tick till the page is loaded....
  if (!isDefined(documentTimeZeroAsRafTime)) {
    raf(ticker);
    return;
  }

  if (!isRepeat) {
    if (rafTime < lastClockTimeMillis) {
      rafTime = lastClockTimeMillis;
    }
    lastTickTime = rafTime;
    cachedClockTimeMillis = rafTime;
  }

  // Clear any modifications to getComputedStyle.
  ensureOriginalGetComputedStyle();

  // Get animations for this sample. We order by Player then by DFS order within
  // each Player's tree.
  if (!playersAreSorted) {
    PLAYERS.sort(playerSortFunction);
    playersAreSorted = true;
  }
  var finished = true;
  var paused = true;
  var animations = [];
  var finishedPlayers = [];
  PLAYERS.forEach(function(player) {
    player._update();
    finished = finished && !player._hasFutureAnimation();
    if (!player._hasFutureEffect()) {
      finishedPlayers.push(player);
    }
    paused = paused && player.paused;
    player._getLeafItemsInEffect(animations);
  });

  // Apply animations in order
  for (var i = 0; i < animations.length; i++) {
    if (animations[i] instanceof Animation) {
      animations[i]._sample();
    }
  }

  // Generate events
  PLAYERS.forEach(function(player) {
    player._generateEvents();
  });

  // Remove finished players. Warning: _deregisterFromTimeline modifies
  // the PLAYER list. It should not be called from within a PLAYERS.forEach
  // loop directly.
  finishedPlayers.forEach(function(player) {
    player._deregisterFromTimeline();
    playersAreSorted = false;
  });

  // Composite animated values into element styles
  compositor.applyAnimatedValues();

  if (!isRepeat) {
    if (finished || paused) {
      rafScheduled = false;
    } else {
      raf(ticker);
    }
    cachedClockTimeMillis = undefined;
  }
};

// Multiplication where zero multiplied by any value (including infinity)
// gives zero.
var multiplyZeroGivesZero = function(a, b) {
  return (a === 0 || b === 0) ? 0 : a * b;
};

var maybeRestartAnimation = function() {
  if (rafScheduled) {
    return;
  }
  raf(ticker);
  rafScheduled = true;
};

var DOCUMENT_TIMELINE = new Timeline(constructorToken);
// attempt to override native implementation
try {
  Object.defineProperty(document, 'timeline', {
    configurable: true,
    get: function() { return DOCUMENT_TIMELINE }
  });
} catch (e) { }
// maintain support for Safari
try {
  document.timeline = DOCUMENT_TIMELINE;
} catch (e) { }

window.Element.prototype.animate = function(effect, timing) {
  var anim = new Animation(this, effect, timing);
  DOCUMENT_TIMELINE.play(anim);
  return anim;
};
window.Element.prototype.getCurrentPlayers = function() {
  return PLAYERS.filter((function(player) {
    return player._isCurrent() && player._isTargetingElement(this);
  }).bind(this));
};
window.Element.prototype.getCurrentAnimations = function() {
  var animations = [];
  PLAYERS.forEach((function(player) {
    if (player._isCurrent()) {
      player._getAnimationsTargetingElement(this, animations);
    }
  }).bind(this));
  return animations;
};

window.Animation = Animation;
window.AnimationEffect = AnimationEffect;
window.KeyframeEffect = KeyframeEffect;
window.MediaReference = MediaReference;
window.ParGroup = ParGroup;
window.MotionPathEffect = MotionPathEffect;
window.Player = Player;
window.PseudoElementReference = PseudoElementReference;
window.SeqGroup = SeqGroup;
window.TimedItem = TimedItem;
window.TimedItemList = TimedItemList;
window.Timing = Timing;
window.Timeline = Timeline;
window.TimingEvent = TimingEvent;
window.TimingGroup = TimingGroup;

window._WebAnimationsTestingUtilities = {
  _constructorToken: constructorToken,
  _positionListType: positionListType,
  _hsl2rgb: hsl2rgb,
  _types: propertyTypes,
  _knownPlayers: PLAYERS,
  _pacedTimingFunction: PacedTimingFunction
};

})();
;

		/**
     * Defines a keyframe in an animation. Its children should be
     * `<polymer-animation-prop>` elements specifying the css
     * property value at the keyframe.
     *
		 * @class polymer-animation-keyframe
		 */
		/**
		 * From 0 to 1.
		 * @property offset
		 * @type Number
		 */
		Polymer('polymer-animation-keyframe', {
			get properties() {
        var props = {};
        var children = this.querySelectorAll('polymer-animation-prop');
        Array.prototype.forEach.call(children, function(c) {
          props[c.name] = c.value;
        });
				if (this.offset !== null) {
					props.offset = this.offset;
				}
				return props;
			}
		});
	;

    /**
     * A CSS property and value to use in a `<polymer-animation-keyframe>`.
     *
     * @class polymer-animation-prop
     */
		/**
		 * CSS property name.
		 * @property name
		 * @type String
		 * @required
		 */
     /**
      * CSS property value.
      * @property value
      * @required
      */
      Polymer('polymer-animation-prop');
  ;

    (function() {
      function findTarget(inSelector, inNode) {
        var p = inNode;
        var target;
        while (p && !p.host && p !== document) {
          p = p.parentNode;
        }
        if (p) {
          target = p.querySelector(inSelector);
        }
        if (!target && p && p.host) {
          target = findTarget(inSelector, p.host);
        }
        return target;
      };
      function toNumber(value, allowInfinity) {
        return (allowInfinity && value === 'Infinity') ? Number.POSITIVE_INFINITY : Number(value);
      };
      /**
       * WebAnimations module.
       * @module Animation
       * @main animation
       * @example toolkitchen/labs/animation2/grid-fade.html
       * @example toolkitchen/labs/animation2/group.html
       */
      /**
       * Component for a single animation.
       *
       * A animation component to fade out an element:
       *
       *     <polymer-animation id="fadeout">
       *       <polymer-animation-keyframe offset="0">
       *         <polymer-animation-prop name="opacity" value="0">
       *         </polymer-animation-prop>
       *       </polymer-animation-keyframe>
       *       <polymer-animation-keyframe offset="1">
       *         <polymer-animation-prop name="opacity" value="1">
       *         </polymer-animation-prop>
       *       </polymer-animation-keyframe>
       *     </polymer-animation>
       * @class polymer-animation
       */
       /**
        * Fired when the animation starts
        * @event polymer-animation-start
        *
        * Fired when the animation completes
        * @event polymer-animation-end
        *
        * Fired when the web animation object changes.
        * @event polymer-animation-change
        * 
        */
      Polymer('polymer-animation', {
        /**
         * One or more nodes to animate.
         * @property target
         * @type HTMLElement|Node|Array<HTMLElement|Node>
         */
        target: null,
        /**
         * Selector for the node being animated.
         * @property targetSelector
         * @type String
         */
        targetSelector: '',
        // animation
        /**
         * Animation keyframes specified as an array of dictionaries of
         * <css properties>:<array of values> pairs. For example,
         * @property keyframes
         * @type Object
         */
        keyframes: null,
        /**
         * A custom animation function. Either provide this or keyframes.
         * @property sample
         * @type Function
         */
        sample: null,
        //accumulate: null, // not working in polyfill
        /**
         * The composition behavior. "replace", "add" or "merge".
         * @property composite
         * @type "replace"|"add"|"merge"
         * @default "replace"
         */
        composite: 'replace',
        // timing
        /**
         * Animation duration in milliseconds, 'infinity' or 'auto'. 'auto'
         * means use the animation's intrinsic duration.
         * @property duration
         * @type Number|"Infinity"|"auto"
         * @default "auto"
         */
        duration: 'auto',
        /**
         * "none", "forwards", "backwards", "both" or "auto". When set to
         * "auto", the fill is "none" for a polymer-animation and "both"
         * for a polymer-animation-group.
         * @property fill
         * @type "none"|"forwards"|"backwards"|"both"|"auto"
         * @default "auto"
         */
        fill: 'auto',
        /**
         * A transition timing function.
         * @property easing
         * @type "linear"|"ease"|"ease-in"|"ease-out"|"ease-in-out"|
         *     "step-start"|"step-middle"|"step-end"
         * @default "linear"
         */
        easing: 'linear',
        /**
         * Number of iterations into the timed item in which to begin
         * the animation. e.g. 0.5 will cause the animation to begin
         * halfway through the first iteration.
         * @property iterationStart
         * @type Number
         * @default 0
         */
        iterationStart: 0,
        /**
         * @property iterationCount
         * @type Number|'Infinity'
         * @default 1
         */
        iterationCount: 1,
        /**
         * Delay in milliseconds.
         * @property delay
         * @type Number
         * @default 0
         */
        delay: 0,
        /**
         * @property direction
         * @type "normal"|"reverse"|"alternate"|"alternate-reverse"
         * @default "normal"
         */
        direction: 'normal',
        /**
         * @property autoplay
         * @type Boolean
         * @default false
         */
        autoplay: false,
        animation: false,
        observe: {
          target: 'apply',
          keyframes: 'apply',
          sample: 'apply',
          composite: 'apply',
          duration: 'apply',
          fill: 'apply',
          easing: 'apply',
          iterationCount: 'apply',
          delay: 'apply',
          direction: 'apply',
          autoplay: 'apply'
        },
        ready: function() {
          this.apply();
        },
        /**
         * Plays the animation.
         * @method play
         */
        play: function() {
          this.apply();
          if (this.animation && !this.autoplay) {
            this.bindAnimationEvents();
            this.player = document.timeline.play(this.animation);
            return this.player;
          }
        },
        /**
         * Stops the animation.
         * @method cancel
         */
        cancel: function() {
          if (this.player) {
            this.player.source = null;
          }
        },
        hasTarget: function() {
          return this.target !== null;
        },
        apply: function() {
          this.animation = null;
          this.animation = this.makeAnimation();
          if (this.autoplay && this.animation) {
            this.play();
          }
          return this.animation;
        },
        makeSingleAnimation: function(target) {
          // XXX(yvonne): for selecting all the animated elements.
          target.classList.add('polymer-animation-target');
          return new Animation(target, this.animationEffect, this.timingProps);
        },
        makeAnimation: function() {
          // this.target && console.log('makeAnimation target', this.target, 'animation', this.animationEffect, 'timing', this.timingProps);
          if (!this.target) {
            return null;
          }
          var animation;
          if (Array.isArray(this.target)) {
            var array = [];
            this.target.forEach(function(t) {
              array.push(this.makeSingleAnimation(t));
            }.bind(this));
            animation = new ParGroup(array);
          } else {
            animation = this.makeSingleAnimation(this.target);
          }
          return animation;
        },
        animationChanged: function() {
          // TODO: attributes are not case sensitive.
          // TODO: Sending 'this' with the event because if the children is
          // in ShadowDOM the sender becomes the shadow host.
          this.fire('polymer-animation-change', this);
        },
        targetSelectorChanged: function() {
          if (this.targetSelector) {
            this.target = findTarget(this.targetSelector, this);
          }
        },
        targetChanged: function(old) {
          if (old) {
            old.classList.remove('polymer-animation-target');
          }
        },
        get timingProps() {
          var props = {};
          var timing = {
            fill: {},
            easing: {},
            delay: {isNumber: true},
            iterationCount: {isNumber: true, allowInfinity: true},
            direction: {},
            duration: {isNumber: true}
          };
          for (t in timing) {
            if (this[t] !== null) {
              var name = timing[t].property || t;
              props[name] = timing[t].isNumber && this[t] !== 'auto' ?
                  toNumber(this[t], timing[t].allowInfinity) : this[t];
            }
          }
          return props;
        },
        get animationEffect() {
          var props = {};
          var frames = [];
          var effect;
          if (this.keyframes) {
            frames = this.keyframes;
          } else if (!this.sample) {
            var children = this.querySelectorAll('polymer-animation-keyframe');
            if (children.length === 0) {
              children = this.shadowRoot.querySelectorAll('polymer-animation-keyframe');
            }
            Array.prototype.forEach.call(children, function(c) {
              frames.push(c.properties);
            });
          }
          if (this.sample) {
            effect = {sample: this.sample};
          } else {
            effect = new KeyframeEffect(frames, this.composite);
          }
          return effect;
        },
        bindAnimationEvents: function() {
          if (!this.animation.onstart) {
            this.animation.onstart = this.animationStartHandler.bind(this);
          }
          if (!this.animation.onend) {
            this.animation.onend = this.animationEndHandler.bind(this);
          }
        },
        animationStartHandler: function() {
          this.fire('polymer-animation-start');
        },
        animationEndHandler: function() {
          this.fire('polymer-animation-end');
        }
      });
    })();
  ;

    Polymer('polymer-translate', {
      fromX: '0',
      fromY: '0',
      toX: '0',
      toY: '0',
      fromXChanged: function() {
        this.generate();
      },
      fromYChanged: function() {
        this.generate();
      },
      toXChanged: function() {
        this.generate();
      },
      toYChanged: function() {
        this.generate();
      },
      generate: function() {
        this.keyframes = [
          {transform: 'translate3d(' + this.fromX + ',' + this.fromY + ', 0)'},
          {transform: 'translate3d(' + this.toX + ',' + this.toY + ', 0)'}
        ];
      }
    });
  ;
(function($) {

    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
        'opera' in window ? 'O' : '';
    
    $.fn.changePage = function (to, reverse, callback) {
        var fromPage = this,
            toPage = (typeof to == 'object') ? to : $(to),
            parent = fromPage.parent(),
            parentWidth = parent.width(),
            onComplete, translateX;
            
        if (parent.is(toPage.parent())) {
            if (reverse) {
                translateX = 0;
                parent.css('-webkit-transition', 'none')
                    .css('-webkit-transform', 'translate3d(' + (-1*parentWidth) + 'px, 0, 0)');
                fromPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
            } else {
                translateX = -1*parentWidth;
                toPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
            }
            
            onComplete = function() {
                fromPage.css('visibility', 'hidden').css('-webkit-transform', 'none');
                parent.css('-webkit-transition', 'none').css('-webkit-transform', 'none');
                toPage.css('-webkit-transform', 'none');
                /* Reset the transition property*/
                setTimeout(function() { parent.css('-webkit-transition', ''); }, 0);
                if (typeof callback == 'function') callback();
            }
            
            toPage.css('visibility', '');
            parent.slide('translate3d(' + translateX + 'px, 0, 0)', onComplete);
        }
    };
    
    $.fn.scrollHeight = function() {
        return this[0].scrollHeight;
    };
    
    $.fn.slide = function(transform, callback) {
        var that = this, transitionEnd = false;
        
        var onComp = function(event) {
            if (!transitionEnd && (!event || that.is(event.target))) {
                transitionEnd = true;
                that.off('webkitTransitionEnd'); 
                if(typeof callback == 'function') callback();
            }
        };
        this.off('webkitTransitionEnd').on('webkitTransitionEnd', onComp);
        this.css('visibility', 'visible');

        setTimeout(function() {
            that.css('-webkit-transition', '-webkit-transform ease 0.4s')
                .css('-webkit-backface-visibility', 'hidden')
                .css(vendor + 'Transform', transform); 
        }, 10);

        // Ensure we do callback no matter what
        setTimeout(onComp, 1000);

        return this;
    };
    
    $.fn.slideIn = function(axis, initialPos, finalPos, callback) {
        var that = this;
        
        var initialTransform, finalTransform;
        switch(axis.toUpperCase()) {
            case 'X': 
                initialTransform = 'translate3d(' + initialPos + 'px, 0px, 0px)';
                finalTransform = 'translate3d(' + finalPos  + 'px, 0px, 0px)';
                break;
            case 'Y': 
                initialTransform = 'translate3d(0px, ' + initialPos + 'px, 0px)';
                finalTransform = 'translate3d(0px, ' + finalPos  + 'px, 0px)';
                break;
        };

        this.css('visibility', 'hidden').css(vendor + 'TransitionProperty','none')
            .css(vendor + 'Transform', initialTransform);
            
        return this.slide(finalTransform, callback);
    };
    
    $.fn.slideOut = function(axis, finalPos, callback){
        var that = this;
        
        var finalTransform;
        switch(axis.toUpperCase()) {
            case 'X': 
                finalTransform = 'translate3d(' + finalPos + 'px, 0px, 0px)';
                break;
            case 'Y': 
                finalTransform = 'translate3d(0px, ' + finalPos + 'px, 0px)';
                break;
        };
        
        var onComp = function() { 
            that.css('visibility', 'hidden'); 
            if(typeof callback == 'function') callback(); 
        };
        
        return this.slide(finalTransform, onComp);
    };
    
    $.fn.slideInLeft = function(callback) {
                
        var leftPos = this.parent().width() - this.outerWidth(); // Element should be hidden before calculating width
        this.slideIn('X', this.parent().width(), leftPos, callback);
    };
    
    $.fn.slideOutRight = function(callback) {
                
        if (this.css('display') == 'block') {
            this.slideOut('X', this.parent().width(), callback);
        }   
    };
})(jQuery);;

    (function() {
      Polymer('force-ui-app', {
        multipage: false,
        startpage: '.page:first',
        pageStack: [],
        hideheader: false,
        disablestyles: false,
        ready: function() {
          this.super();
          this.async(this.arrangePages);
        },
        observe: {
          multipage: 'arrangePages',
          startpage: 'arrangePages'
        },
        get pages() {
          return $(this.$.pages.getDistributedNodes()).filter('.page').toArray();
        },
        arrangePages: function() {
          var $pages = $(this.pages);

          if (this.multipage) {
            $(this).removeClass('splitview');
            this.activepage = $pages.filter(this.startpage)[0];
            this.activepage.style.display = 'block';
            $pages.not(this.startpage).hide();
            this.pageStack = [];
          } else {
            $pages.each(function() { this.style.display = "block"; });
            $(this).addClass('splitview');
          }
        },
        navigateBack: function(e) {
          if (this.multipage) {
            navigate(this, this.activepage, this.pageStack.pop(), true);
            if (e) e.stopPropagation();
          }
        },
        navigateTo: function(target) {
          if (this.multipage) {
            var $target = $(this.pages).filter(target);
            if ($target.length == 1) {
              this.pageStack.push(this.activepage);
              navigate(this, this.activepage, $target[0]);
            }
          }
        }
      });

      function navigate(parent, source, target, reverse) {

          var eventDetails = {
            from: source,
            to: target
          };
          parent.activepage = target;
          parent.fire('force-navigation-start', eventDetails);

          // Create jquery versions
          var $source = $(source);
          var $target = $(target);
          var width = $(parent).width();
/*
          var sourceAnimation = document.createElement('polymer-translate');
          sourceAnimation.fromX = 0;
          sourceAnimation.toX = reverse ? width : -1*width;
          sourceAnimation.duration = 0.3;
          //sourceAnimation.autoplay = true;
          sourceAnimation.target = source;

          $(sourceAnimation).appendTo(parent.shadowRoot)
          .one('polymer-animation-end', function() {
            $source.hide();
            this.parentNode.removeChild(this);
          });

          var targetAnimation = document.createElement('polymer-translate');
          targetAnimation.fromX = reverse ? -1*width : width;
          targetAnimation.toX = 0;
          targetAnimation.duration = 0.3;
          //targetAnimation.autoplay = true;
          targetAnimation.target = target;

          $(targetAnimation).appendTo(parent.shadowRoot)
          .one('polymer-animation-end', function() {
            this.parentNode.removeChild(this);
            parent.fire('force-navigation-end', eventDetails);
          });

          parent.async(function() {
            sourceAnimation.play();
            targetAnimation.play();
          });
*/
          var sourceFinalPos = (reverse ? 1 : -1) * $source.parent().width();
          $source.slideOut('X', sourceFinalPos, function() {
            $source.hide();
          });
          var targetInitialPos = (reverse ? -1 : 1) * $target.parent().width();
          $target.slideIn('X', targetInitialPos, 0, function() {
            parent.activepage = $target[0];
            parent.fire('navigation-end', eventDetails);
          });
          $target[0].style.display = "block";
          //$source.changePage($target.show(), reverse, function() { $source.hide(); });
        }
    })();
  ;
(function(SFDC, Force) {

    "use strict";

    var sobjectStores = {};
    var originalSObjectStores = {};

    var generateIndexSpec = function(describeResult, fieldsToIndex) {
        var indexSpecs = [{path: "attributes.type", type: "string"}];
        describeResult.fields.forEach(function(field) {
            if (field.type == 'reference' || _.indexOf(fieldsToIndex, field.name) >= 0) {
                var storeType;
                switch(field.type) {
                    case 'int': storeType = 'integer'; break;
                    case 'double': storeType = 'real'; break;
                    default: storeType = 'string';
                }
                indexSpecs.push({
                    path: field.name,
                    type: storeType
                })
            }
        })
        return indexSpecs;
    }

    var createStores = function(sobject, keyField, fieldsToIndex) {
        var dataStore;
        var originalDataStore;

        // Create StoreCache if smartstore is available.
        if (navigator.smartstore) {
            // Initiate store cache creation if none initiated already for this sobject
            if (sobject && !sobjectStores[sobject]) {
                var sobjectType = SFDC.getSObjectType(sobject);
                // Initiate store creation of working cache copy based on describe info and fieldstoindex.
                var storePromise = $.when(sobjectType.describe(), fieldsToIndex)
                    .then(generateIndexSpec)
                    .then(function(indexSpecs) {
                        // Create store based on indexspec
                        dataStore = new Force.StoreCache(sobject, indexSpecs, keyField);
                        // Create store for original copy. No indexspec requird for original copy.
                        originalDataStore = new Force.StoreCache("__" + sobject + "__original", null, keyField);
                        return $.when(dataStore.init(), originalDataStore.init());
                    }).then(function() {
                        sobjectStores[sobject] = dataStore;
                        originalSObjectStores[sobject] = originalDataStore;
                    });
                // Capture the store creation promise, until the real store gets assigned.
                // This will prevent creation of same store twice.
                sobjectStores[sobject] = storePromise;
            }
            return sobjectStores[sobject];
        }
    }

    Polymer('force-sobject-store', {
        sobject: null,
        get cacheReady() {
            return this.init();
        },
        get cache() {
            var cache = sobjectStores[this.sobject];
            if (cache instanceof Force.StoreCache) return cache;
        },
        get cacheForOriginals() {
            var cache = originalSObjectStores[this.sobject];
            if (cache instanceof Force.StoreCache) return cache;
        },
        init: function() {
            var sobject = this.sobject;
            var keyField = ((sobject && sobject.toLowerCase().indexOf('__x') > 0)
                    ? 'ExternalId' : 'Id');
            var fieldsToIndex = this.fieldstoindex != null ? this.fieldstoindex.split(",") : [];

            // Create offline stores if launcher is complete
            return SFDC.launcher.then(function() {
                return createStores(sobject, keyField, fieldsToIndex);
            });
        }
    });

}).call(this, window.SFDC, window.Force);
;
(function(SFDC) {

    "use strict";

    var viewProps = {
        sobject: null,
        query: "",
        querytype: "mru",
        maxsize: -1,
        autosync: true
        /* async: false */ // Optional property to perform fetch as a web worker operation. Useful for data priming.
    };

    var generateConfig = function(props) {
        var config = {};

        // Fetch if only sobject type is specified.
        if (props.sobject) {
            // Is device offline and smartstore is available
            if (!SFDC.isOnline() && navigator.smartstore) {
                // Only run cache queries. If none provided, fetch all data.
                config.type = 'cache';
                if (props.querytype == 'cache' && props.query) config.cacheQuery = props.query;
                else config.cacheQuery = navigator.smartstore.buildAllQuerySpec('attributes.type');
            } else {
                // Send the user config for fetch
                config.sobjectType = props.sobject;
                config.type = props.querytype;
                if (props.querytype == 'cache') config.cacheQuery = props.query;
                else config.query = props.query;
            }
            return config;
        }
        return null;
    }

    Polymer('force-sobject-collection', _.extend({}, viewProps, {
        observe: {
            sobject: "reset",
            query: "reset",
            querytype: "reset"
        },
        fireSyncEvent: function() {
            this.asyncFire('sync');
        },
        ready: function() {
            this.collection = new (Force.SObjectCollection.extend({
                config: generateConfig(_.pick(this, _.keys(viewProps)))
            }));
            this.collection.on('sync', this.fireSyncEvent.bind(this));

            if (this.autosync) this.fetch();
        },
        reset: function() {
            var config = generateConfig(_.pick(this, _.keys(viewProps)));
            // FIXME: Polymer is calling this method multiple times for single attribute change.
            // That's why adding the isEqual check to prevent multiple server calls.
            if (!_.isEqual(config, this.collection.config)) {
                this.collection.config = config;
                if (this.autosync) this.fetch();
            }
        },
        fetch: function() {
            var collection = this.collection;
            collection.config = generateConfig(_.pick(this, _.keys(viewProps)));
            // Define the collection model type. Set the idAttribute to 'ExternalId' if sobject is external object.
            collection.model = Force.SObject.extend({
                idAttribute: (this.sobject
                    && this.sobject.toLowerCase().indexOf('__x') > 0)
                    ? 'ExternalId' : 'Id'
            });

            var onFetch = function() {
                if ((this.maxsize < 0 || this.maxsize > collection.length)
                    && collection.hasMore())
                    collection.getMore().then(onFetch);
            }.bind(this);

            var store = this.$.store;
            $.when(store.cacheReady, SFDC.launcher)
            .done(function() {
                collection.cache = store.cache;
                collection.cacheForOriginals = store.cacheForOriginals;
                collection.fetch({ reset: true, success: onFetch });
            });
        }
    }));

})(window.SFDC);;

    Polymer('polymer-selection', {
      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,
      ready: function() {
        this.clear();
      },
      clear: function() {
        this.selection = [];
      },
      /**
       * Retrieves the selected item(s).
       * @method getSelection
       * @returns Returns the selected item(s). If the multi property is true,
       * getSelection will return an array, otherwise it will return 
       * the selected item or undefined if there is no selection.
      */
      getSelection: function() {
        return this.multi ? this.selection : this.selection[0];
      },
      /**
       * Indicates if a given item is selected.
       * @method isSelected
       * @param {any} item The item whose selection state should be checked.
       * @returns Returns true if `item` is selected.
      */
      isSelected: function(item) {
        return this.selection.indexOf(item) >= 0;
      },
      setItemSelected: function(item, isSelected) {
        if (item !== undefined && item !== null) {
          if (isSelected) {
            this.selection.push(item);
          } else {
            var i = this.selection.indexOf(item);
            if (i >= 0) {
              this.selection.splice(i, 1);
            }
          }
          this.fire("polymer-select", {isSelected: isSelected, item: item});
        }
      },
      /**
       * Set the selection state for a given `item`. If the multi property
       * is true, then the selected state of `item` will be toggled; otherwise
       * the `item` will be selected.
       * @method select
       * @param {any} item: The item to select.
      */
      select: function(item) {
        if (this.multi) {
          this.toggle(item);
        } else if (this.getSelection() !== item) {
          this.setItemSelected(this.getSelection(), false);
          this.setItemSelected(item, true);
        }
      },
      /**
       * Toggles the selection state for `item`.
       * @method toggle
       * @param {any} item: The item to toggle.
      */
      toggle: function(item) {
        this.setItemSelected(item, !this.isSelected(item));
      }
    });
  ;

    Polymer('polymer-selector', {
      /**
       * Gets or sets the selected element.  Default to use the index
       * of the item element.
       *
       * If you want a specific attribute value of the element to be
       * used instead of index, set "valueattr" to that attribute name.
       *
       * Example:
       *
       *     <polymer-selector valueattr="label" selected="foo">
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </polymer-selector>
       *
       * In multi-selection this should be an array of values.
       *
       * Example:
       *
       *     <polymer-selector id="selector" valueattr="label" multi>
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </polymer-selector>
       *
       *     this.$.selector.selected = ['foo', 'zot'];
       *
       * @attribute selected
       * @type Object
       * @default null
       */
      selected: null,
      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,
      /**
       * Specifies the attribute to be used for "selected" attribute.
       *
       * @attribute valueattr
       * @type string
       * @default 'name'
       */
      valueattr: 'name',
      /**
       * Specifies the CSS class to be used to add to the selected element.
       * 
       * @attribute selectedClass
       * @type string
       * @default 'polymer-selected'
       */
      selectedClass: 'polymer-selected',
      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default ''
       */
      selectedProperty: '',
      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default 'active'
       */
      selectedAttribute: 'active',
      /**
       * Returns the currently selected element. In multi-selection this returns
       * an array of selected elements.
       * 
       * @attribute selectedItem
       * @type Object
       * @default null
       */
      selectedItem: null,
      /**
       * In single selection, this returns the model associated with the
       * selected element.
       * 
       * @attribute selectedModel
       * @type Object
       * @default null
       */
      selectedModel: null,
      /**
       * In single selection, this returns the selected index.
       *
       * @attribute selectedIndex
       * @type number
       * @default -1
       */
      selectedIndex: -1,
      /**
       * The target element that contains items.  If this is not set 
       * polymer-selector is the container.
       * 
       * @attribute target
       * @type Object
       * @default null
       */
      target: null,
      /**
       * This can be used to query nodes from the target node to be used for 
       * selection items.  Note this only works if the 'target' property is set.
       *
       * Example:
       *
       *     <polymer-selector target="{{$.myForm}}" itemsSelector="input[type=radio]"></polymer-selector>
       *     <form id="myForm">
       *       <label><input type="radio" name="color" value="red"> Red</label> <br>
       *       <label><input type="radio" name="color" value="green"> Green</label> <br>
       *       <label><input type="radio" name="color" value="blue"> Blue</label> <br>
       *       <p>color = {{color}}</p>
       *     </form>
       * 
       * @attribute itemSelector
       * @type string
       * @default ''
       */
      itemsSelector: '',
      /**
       * The event that would be fired from the item element to indicate
       * it is being selected.
       *
       * @attribute activateEvent
       * @type string
       * @default 'tap'
       */
      activateEvent: 'tap',
      notap: false,
      ready: function() {
        this.activateListener = this.activateHandler.bind(this);
        this.observer = new MutationObserver(this.updateSelected.bind(this));
        if (!this.target) {
          this.target = this;
        }
      },
      get items() {
        var nodes = this.target !== this ? (this.itemsSelector ? 
            this.target.querySelectorAll(this.itemsSelector) : 
                this.target.children) : this.$.items.getDistributedNodes();
        return Array.prototype.filter.call(nodes || [], function(n) {
          return n && n.localName !== 'template';
        });
      },
      targetChanged: function(old) {
        if (old) {
          this.removeListener(old);
          this.observer.disconnect();
        }
        if (this.target) {
          this.addListener(this.target);
          this.observer.observe(this.target, {childList: true});
        }
      },
      addListener: function(node) {
        node.addEventListener(this.activateEvent, this.activateListener);
      },
      removeListener: function(node) {
        node.removeEventListener(this.activateEvent, this.activateListener);
      },
      get selection() {
        return this.$.selection.getSelection();
      },
      selectedChanged: function() {
        this.updateSelected();
      },
      updateSelected: function() {
        this.validateSelected();
        if (this.multi) {
          this.clearSelection();
          this.selected && this.selected.forEach(function(s) {
            this.valueToSelection(s);
          }, this);
        } else {
          this.valueToSelection(this.selected);
        }
      },
      validateSelected: function() {
        // convert to an array for multi-selection
        if (this.multi && !Array.isArray(this.selected) && 
            this.selected !== null && this.selected !== undefined) {
          this.selected = [this.selected];
        }
      },
      clearSelection: function() {
        if (this.multi) {
          this.selection.slice().forEach(function(s) {
            this.$.selection.setItemSelected(s, false);
          }, this);
        } else {
          this.$.selection.setItemSelected(this.selection, false);
        }
        this.selectedItem = null;
        this.$.selection.clear();
      },
      valueToSelection: function(value) {
        var item = (value === null || value === undefined) ? 
            null : this.items[this.valueToIndex(value)];
        this.$.selection.select(item);
      },
      updateSelectedItem: function() {
        this.selectedItem = this.selection;
      },
      selectedItemChanged: function() {
        if (this.selectedItem) {
          var t = this.selectedItem.templateInstance;
          this.selectedModel = t ? t.model : undefined;
        } else {
          this.selectedModel = null;
        }
        this.selectedIndex = this.selectedItem ? 
            parseInt(this.valueToIndex(this.selected)) : -1;
      },
      valueToIndex: function(value) {
        // find an item with value == value and return it's index
        for (var i=0, items=this.items, c; (c=items[i]); i++) {
          if (this.valueForNode(c) == value) {
            return i;
          }
        }
        // if no item found, the value itself is probably the index
        return value;
      },
      valueForNode: function(node) {
        return node[this.valueattr] || node.getAttribute(this.valueattr);
      },
      // events fired from <polymer-selection> object
      selectionSelect: function(e, detail) {
        this.updateSelectedItem();
        if (detail.item) {
          this.applySelection(detail.item, detail.isSelected);
        }
      },
      applySelection: function(item, isSelected) {
        if (this.selectedClass) {
          item.classList.toggle(this.selectedClass, isSelected);
        }
        if (this.selectedProperty) {
          item[this.selectedProperty] = isSelected;
        }
        if (this.selectedAttribute && item.setAttribute) {
          if (isSelected) {
            item.setAttribute(this.selectedAttribute, '');
          } else {
            item.removeAttribute(this.selectedAttribute);
          }
        }
      },
      // event fired from host
      activateHandler: function(e) {
        if (!this.notap) {
          var i = this.findDistributedTarget(e.target, this.items);
          if (i >= 0) {
            var item = this.items[i];
            var s = this.valueForNode(item) || i;
            if (this.multi) {
              if (this.selected) {
                this.addRemoveSelected(s);
              } else {
                this.selected = [s];
              }
            } else {
              this.selected = s;
            }
            this.asyncFire('polymer-activate', {item: item});
          }
        }
      },
      addRemoveSelected: function(value) {
        var i = this.selected.indexOf(value);
        if (i >= 0) {
          this.selected.splice(i, 1);
        } else {
          this.selected.push(value);
        }
        this.valueToSelection(value);
      },
      findDistributedTarget: function(target, nodes) {
        // find first ancestor of target (including itself) that
        // is in nodes, if any
        while (target && target != this) {
          var i = Array.prototype.indexOf.call(nodes, target);
          if (i >= 0) {
            return i;
          }
          target = target.parentNode;
        }
      }
    });
  ;

    Polymer('force-selector-list', {
        observe: {
          sobject: "fetch",
          query: "fetch",
          querytype: "fetch"
        },
        get collection() {
          return this.$.listsource.collection;
        },
        fetch: function() {
          this.$.listsource.fetch();
        }
    });
  ;

    Polymer('force-ui-list', {
      labelfield: 'Name',
      viewModels: [],
      ready: function() {
        this.super();
        this.target = this.$.list;
      },
      updateModels: function() {
        var that = this;
        this.viewModels = [];
        this.collection.models.forEach(function(model) {
          var wrappedModel = {
            id: model.id,
            label: model.attributes[that.labelfield],
            sublabel: model.attributes[that.sublabelfield]
          }
          that.viewModels.push(wrappedModel);
        });
      }
    });
  ;
(function(SFDC) {

    var viewProps = {
        sobject: null,
        recordid: null,
        fieldlist: null,
        idfield: "Id",
        autosync: true,
        mergemode: Force.MERGE_MODE.OVERWRITE
    };

    var createModel = function(sobject) {
        return new (Force.SObject.extend({
            cacheMode: SFDC.cacheMode,
            sobjectType: sobject,
        }));
    }

    Polymer('force-sobject', _.extend({}, viewProps, {
        observe: {
            sobject: "propertyChanged",
            recordid: "propertyChanged",
            fieldlist: "propertyChanged",
            idfield: "propertyChanged",
            autosync: "propertyChanged"
        },
        propertyChanged: function() {
            this.init();
            if (this.autosync) this.fetch();
        },
        // Resets all the properties on the model.
        // Recreates model if sobject type or id of model has changed.
        init: function(reset) {
            var model = this.model;
            if (reset || typeof model == "undefined" ||
                model.sobjectType != this.sobject ||
                (model.id && model.id != this.recordid)) {
                model = this.model = createModel(this.sobject);
            }
            model.fieldlist = this.fieldlist;
            model.idAttribute = this.idfield;
            model.set(this.idfield, this.recordid);
            model.set({attributes: {type: this.sobject}});
        },
        // All CRUD operations should ensure that the model is ready by checking this promise.
        whenModelReady: function() {
            var model = this.model;
            var store = this.$.store;

            this.init();
            return $.when(store.cacheReady, SFDC.launcher)
                .then(function() {
                    model.cache = store.cache;
                    model.cacheForOriginals = store.cacheForOriginals;
                });
        },
        ready: function() {
            this.init();
            if (this.autosync) this.fetch();
        },
        fetch: function(opts) {
            var model = this.model;
            if (model.sobjectType && model.id) {
                this.whenModelReady().then(function() {
                    model.fetch(opts);
                });
            } else console.warn('sobject Type and recordid required for fetch.');

            return this;
        },
        save: function(options) {
            var model = this.model;
            options.mergeMode = options.mergeMode || this.mergemode;
            if (model.sobjectType) {
                this.whenModelReady().then(function() {
                    // Perform save (upsert) against the server
                    model.save(null, options);
                });
            } else console.warn('sobject Type required for save.');
        },
        delete: function(options) {
            var model = this.model;
            options.mergeMode = options.mergeMode || this.mergemode;
            if (model.sobjectType && model.id) {
                this.whenModelReady().then(function() {
                    // Perform delete of record against the server
                    this.model.destroy(options);
                });
            } else console.warn('sobject Type and recordid required for delete.');
        },
        set: function(key, val) {
            this.model.set(key, val);
        },
        get: function(key) {
            return this.model.get(key);
        }
    }));

})(window.SFDC);
;
(function(SFDC) {

    "use strict";

    // Fetches the record type id for the required layout.
    // Returns a promise which is resolved when the record type id is fetched from the server.
    var fetchRecordTypeId = function(view) {
        var fetchStatus = $.Deferred();

        var resolveStatus = function(recordTypeId) {
            fetchStatus.resolve(view.sobject, recordTypeId);
        }

        // If record types are not present, then use the default recordtypeid
        if (!view.hasrecordtypes) resolveStatus('012000000000000AAA');
        // If record types are present, then get the recordtypeid
        else {
            var model = view.$.force_sobject.model;
            // If record type id is provided then use that.
            if (view.recordtypeid) resolveStatus(view.recordtypeid);
            // If not but the recordid is available, then get the recordtype info from sfdc
            else if (model.id && model.id.length) {
                // Fetch the record's recordtypeid
                model.fetch({
                    success: function() {
                        // Once we get the recordtypeid, fetch the layout
                        resolveStatus(this.get('recordTypeId'));
                    },
                    error: function() {
                        fetchStatus.reject(view);
                    }
                });
            }
        }

        return fetchStatus.promise();
    }

    var getLayoutInfo = function(sobject, recordtypeid) {
        return SFDC.getSObjectType(sobject)
            .describeLayout(recordtypeid);
    }

    Polymer('force-sobject-layout', {
        sobject: null,
        hasrecordtypes: false,
        recordtypeid: null,
        recordid: null,
        idfield: 'Id',
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        whenDetailSections: function() {
            return fetchRecordTypeId(this)
                .then(getLayoutInfo)
                .then(function(layout) {
                    return layout.detailLayoutSections;
                });
        },
        whenEditSections: function() {
            return fetchRecordTypeId(this)
                .then(getLayoutInfo)
                .then(function(layout) {
                    return layout.editLayoutSections;
                });
        },
        whenRelatedLists: function() {
            return fetchRecordTypeId(this)
                .then(getLayoutInfo)
                .then(function(layout) {
                    return layout.relatedLists;
                });
        }
    });

}).call(this, SFDC);;
(function($, SFDC, Path) {

    Polymer('force-ui-detail', {
        foredit: false,
        fieldlist: null,
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        ready: function() {
            this.autosync = false;
            this.super();
            this.render();
        },
        render: function() {
            var that = this;
            if (this.sobject) {
                SFDC.launcher.done(function() { renderView(that); });
            }
        },
        get model() {
            return this.$.force_sobject.model;
        },
        attributeChanged: function(attrName, oldVal, newVal) {
            this.super(arguments);
            this.async(this.render);
        }
    });

    // Returns whether the current view has an overriden layout.
    var isLayoutOverriden = function(elem) {
        var shadowRoot = elem.shadowRoot;
        while (shadowRoot.olderShadowRoot) {
            if (shadowRoot.olderShadowRoot.olderShadowRoot)
                shadowRoot = shadowRoot.olderShadowRoot;
            else break;
        }
        return shadowRoot.querySelector('shadow') != null;
    }

    // Given the recordtypeid, it fetches the related layout sections based on the view settings
    // Returns a promise, which gets resolved when the response is received from the salesforce
    var fetchLayoutSections = function(view) {
        // fetch layout sections (detail or edit) based on view setting
        return (view.foredit) ? view.whenEditSections()
            : view.whenDetailSections();
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
    var generateViewTemplate = function(view) {
        // Check if default layout is overriden. Don't do anything if yes.
        if (!isLayoutOverriden(view) && view.sobject) {
            if (view.fieldlist && view.fieldlist.trim().length) {
                // Parse the labels and generate fieldname to fieldlabel mapping.
                var fieldLabelMap = {};
                var fieldsArray = view.fieldlist.split(',');
                var fieldLabelsArray = view.fieldlabels ? view.fieldlabels.split(',') : [];
                for (var idx in fieldsArray) {
                    var label = fieldLabelsArray[idx];
                    if (label) fieldLabelMap[fieldsArray[idx]] = label.trim();
                }

                // Fetch field infos and then generate template
                return fetchFieldInfos(view.sobject, fieldsArray)
                    .then(function(fieldInfos) {
                        return compileTemplateForFields(fieldInfos, fieldLabelMap, view.foredit);
                    });
            } else {
                return fetchLayoutSections(view)
                    .then(compileTemplateForLayout)
            }
        }
    }

    // Renders the view based on the current layout settings
    function renderView(view) {

        var renderTemplate = function(templateInfo) {
            // Template info is null when there's no template generated
            if (templateInfo) {
                if (view.model.id) {
                    // Perform data fetch for the fieldlist used in template
                    view.$.force_sobject.fetch({ fieldlist: templateInfo.fields });
                }

                // Attach the template instance to the view
                var template = templateInfo.template;
                var templateModel = new SObjectViewModel(view.model, templateInfo.fieldInfos);
                $(view.$.viewContainer).empty().append(template.createInstance(templateModel));
            }
        };

        return generateViewTemplate(view)
            .then(renderTemplate);
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

        return compileTemplateForLayout([section]);
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
;

    Polymer('force-html-output', {
      value: null,
      valueChanged: function() {
        this.innerHTML = this.value;
      }
    })
  ;

    Polymer('force-selector-relatedlist', {
      related: null,
      models: [],
      updateModels: function() {
        var _self = this;
        var sobjectType = _self.related.sobject;
        _self.models = [];
        this.$.force_sobjects.collection.models
        .forEach(function(model) {
          var fieldValuesAsArray = [];
          var columns = _.pluck(_self.related.columns, 'field');
          columns = _.map(columns, function(col) {
            return col.replace(new RegExp("^" + sobjectType + "\."), "");
          });
          for (var i in columns) {
            fieldValuesAsArray.push(model.get(columns[i]));
          }
          var wrappedModel = {
            impl: model,
            id: model.id,
            fieldValues: fieldValuesAsArray
          }
          _self.models.push(wrappedModel);
        });
      }
    });
  ;

    Polymer('force-ui-relatedlist', {
      ready: function() {
        this.super();
        this.target = this.$.listview;
      }
    });
  ;
(function($, SFDC) {

    Polymer('force-sobject-relatedlists', {
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        relatedLists: [],
        attributeChanged: function(attrName, oldVal, newVal) {
            this.super(arguments);
            this.relatedLists = [];
            fetchRelatedLists(this);
        }
    });

    var fetchRelatedLists = function(view) {
        var relsToKeep = view.relationships ? view.relationships.split(',') : null;
        var parentType = SFDC.getSObjectType(view.sobject);

        var addConfigIfAllowed = function(related, childInfo, parentDescribe) {
            if (childInfo.objectDescribe.queryable) {
                view.relatedLists.push(related);
                generateQuery(view.recordid, related, parentDescribe);
            }
        }

        var generateRelatedListConfigs = function(relatedListInfo) {
            for (var idx in relatedListInfo) {
                var related = _.extend({}, relatedListInfo[idx]);
                if (!relsToKeep || _.contains(related.name)) {
                    var childType = SFDC.getSObjectType(related.sobject);
                    $.when(related, childType.getMetadata(), parentType.describe())
                    .then(addConfigIfAllowed);
                }
            }
        }

        $.when(view.whenRelatedLists())
        .then(generateRelatedListConfigs);
    }



    var generateQuery = function(recordid, related, describeResult) {
        var rel = _.findWhere(describeResult.childRelationships, {relationshipName : related.name});
        // Column names are used for generating the soql query
        var colNameList = _.union(_.pluck(related.columns, "name"), ['Id']);
        related.soql = "SELECT " + colNameList.join(",")
                + " FROM " + related.sobject
                + " WHERE " + rel.field + " = '" + recordid + "'"
                + " ORDER BY " + related.sort[0].column + (related.sort[0].ascending ? ' asc' : ' desc')
                + " LIMIT " + related.limitRows;

        // the column field value should be used for generating the smartsql
        var fieldList = _.union(_.pluck(related.columns, "field"), [related.sobject + '.Id']);
        var wrapFieldName = function(name) {
            return "{" + name.replace(/\./, ':') + "}";
        }
        related.smartSql = "SELECT " + _.map(fieldList, wrapFieldName).join(",")
                + " FROM {" + related.sobject + "}"
                + " WHERE {" + related.sobject + ":" + rel.field + "} = '" + recordid + "'"
                + " ORDER BY {" + related.sobject + ":" + related.sort[0].column + (related.sort[0].ascending ? '} asc' : '} desc')
                + " LIMIT " + related.limitRows;

        _.extend(related, {
            get query() {
                if (!SFDC.isOnline() && navigator.smartstore)
                    return navigator.smartstore.buildSmartQuerySpec(related.smartSql);
                else return related.soql;
            },
            get querytype() {
                return (!SFDC.isOnline() && navigator.smartstore) ? "cache" : "soql";
            }
        })
    }

}).call(this, jQuery, window.SFDC);