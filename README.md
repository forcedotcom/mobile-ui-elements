# Mobile UI Elements (BETA) #

Mobile UI Elements is a free, open-source Force.com (unsupported) library to simplify the development of mobile apps. The library, based on the [Google’s Polymer framework](http://www.polymer-project.org), provides the fundamental building blocks for creating HTML5 apps that run well on smartphones and tablets. The elements can be mixed together to create fairly complex force.com applications and the apps can be deployed in the browser or embedded inside Container from the Salesforce Mobile SDK.
Note: The library is still in heavy development and is missing certain features as well as complete documentation.
This document is intended to introduce you to the app's architecture and design and make it as easy as possible for you to jump in, run it, and start contributing.

- What is it?
- Setup
- Available UI Elements
- Third-party Code
- FAQ
- Mobile UI Elements License

## What is it? ##
Mobile UI Elements is a set of web components built using [Google’s Polymer framework](http://www.polymer-project.org). The library utilizes the future of HTML5 standards, such as Custom Elements, ShadowDOM, Templates, HTML imports etc., to provide a set of new HTML tags that generate the Saleforce driven UI for your mobile application. It's built on top of [Salesforce Mobile SDK 2.0](http://www2.developerforce.com/en/mobile/services/mobile-sdk) and extends the open source frameworks such as [Backbone.js](http://backbonejs.org/) and [Undescore.js](http://underscorejs.org/) and [JQuery](http://jquery.com/). It also comes with some stylesheets, providing the responsive design for tablets and phones, and Sample Apps to showcase how to use them in a real application. You can easily combine and extend this library to develop UI specific to your application.

## Setup ##

### Global Dependencies

Install

* [node.js](http://nodejs.org)
* [GitHub Client](http://mac.github.com/) (with Git Terminal option)
* [Safari](http://www.apple.com/safari/)

and then open Terminal:

    $ sudo npm install -g grunt-cli

### Project Setup

    $ git clone git@github.com:ForceDotComLabs/mobile-ui-elements.git
    $ cd mobile-ui-elements
    $ npm install

To build the project and fetch all the dependencies, execute:

    $ grunt

To build the project for distribution, execute (all assets will be generated in dist directory):

    $ grunt dist

To run the sample app in Safari:

```
1. Open index.html in an editor
2. At line 25, plug in the salesforce session Id. You can use salesforce debugshell to get the session Id.
3. At line 26, plug in the instance url of the org. Eg. https://na1.salesforce.com
4. Open index.html in Safari and you should be able to browse a simple list and detail of an account.
```

### Salesforce Unmanaged Package

Install the unmanaged package in your salesforce org from [bit.ly/mobile-ui-elements](https://login.salesforce.com/packaging/installPackage.apexp?p0=04tU00000009eeb). This package contains all the UI Elements along with a sample app and the Polymer Sandbox tool.


## Available UI Elements ##
1. __force-ui-app__: force-ui-app element is a top level UI element that extends the `force-app` element and also provides the basic styling and structure for the application. This element also contains the `polymer-flex-layout` element to enable flexible sections on the page, esp. in single page view with split view panels.

	Supported attributes include:
	- `accesstoken`: (Required) Session ID or OAuth access token to make API calls to Salesforce.
	- `instanceurl`: (Optional) Default: Host url of current application. Host instance URL of the salesforce org to make API calls. Eg. https://na1.salesforce.com
	- `multipage`: (Optional) Default: false. When true, force-ui-app shows only one direct child, with class="page", at a time and allows navigation to other child elements.
	- `startpage`: (Optional) Default: first direct child element with class="page". Instance of the DOM element, with class="page", that should be shown first when the app loads.
	- `hideheader`: (Optional) Default: false. Show/Hide default header on the page.

	Example (when using inside Visualforce):

	```
	<force-ui-app accesstoken="{!$Api.Session_ID}"></force-ui-app>
	```

2. __force-ui-list__: force-ui-list element enables the rendering of list of records for any sobject. The element can be configured using various attributes, such as query, sobject and querytype, to show specific set of records. This element should always be a child of `force-ui-app` element.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to render a list.
	- `query`: (Optional) Default: null. SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
	- `querytype`: (Optional) Default: mru. Type of query (mru, soql, sosl, cache). Required if query attribute is specified.

	Example:

	```
	<force-ui-list sobject="Account" querytype="mru"></force-ui-list>
	```

3. __force-ui-detail__: force-ui-detail element enables the rendering of full view of a salesforce record. It extends the `force-sobject-layout` to fetch the page layout for the record. This element also embeds a `force-sobject` element to allow all the CRUD operations on an SObject. This element should always be a child of `force-ui-app` element.

	Supported attributes include:
	- All attributes of `force-sobject-layout` element.
	- `fieldlist`: (Optional) Default: All fields on the layout. Comma separated list of fields that should be displayed for the record.
    - `fieldlabels`: (Optional) Default: Actual field labels. Comma separated list of labels for fields provided in fieldlist attribute. The order of labels should be same as the order of fields in the fieldlist attribute.

	Example:

	```
	<force-ui-detail sobject="Account" recordid="001000000000AAA"></force-ui-detail>
	```

4. __force-selector-list__: force-selector-list is an extension of polymer-selector element and provides a wrapper around `force-sobject-collection` element. The element acts as a base for any list UI element that also needs the selector functionality. It automatically updates the selected attribute when a row has been clicked on.

	Supported attributes include:
	- All the attributes of the `polymer-selector` element.
	- `sobject`: (Required) Type of sobject on which you want to render a list
	- `query`: (Optional) SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
	- `querytype`: Type of query (mru, soql, sosl, cache). Required if query is specified.
	- `selected`: Id of the selected sobject.

	Properties:
	- `collection`: Returns an instance of Force.SObjectCollection with associated models.

	Methods:
	- `fetch`: Executes a fetch request on the underlying collection object based on the current config.

	Example:

	```
	<force-selector-list sobject="Account" querytype="mru"></force-selector-list>
	```

5. __force-sobject-collection__: force-sobject-collection is a low level polymer wrapper for the SmartSync `Force.SObjectCollection`, which auto manages the offline data store for caching (when running inside a container), provides a simple DOM based interface for SmartSync interactions, and allows other polymer elements to easily consume SmartSync.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to render a list
	- `query`: (Optional) SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
	- `querytype`: (Optional) Default: mru. Type of query (mru, soql, sosl, cache). Required if query attribute is specified.
	- `autosync`: (Optional) Default: true. Auto synchronize (fetch/save) changes to the model with the remote server/local store. If false, use fetch/save methods to commit changes to server or local store.
	- `maxsize`: (Optional) Default: -1. If positive

	Methods:
	- `fetch`: Initiates the fetching of records from the relevant data store (server/offline store).

	Example:

	```
	<force-sobject-collection sobject="Account" querytype="mru"></force-sobject-collection>
	```

6. __force-sobject__: force-sobject element wraps the SmartSync `Force.SObject` into a polymer element, providing auto management of the offline store for caching, a simpler DOM based interface to interact with Smartsync SObject Model, and allows other polymer elements to easily comsume smartsync.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to fetch the record
	- `recordid`: (Required) Id of the record that needs to be fetched.
	- `fieldlist`: (Optional) Default: All fields. Comma separated list of fields that need to be fetched for the record.
	- `idfield`: (Optional) Default: ID. Name of the ID field, especially for the cases of External Object.
	- `autosync`: (Optional) Default: true. Auto synchronize (fetch/save) changes to the model with the remote server/local store. If false, use fetch/save methods to commit changes to server or local store.
	- `mergemode`: (Optional) Default: "Overwrite". The merge model to use when saving record changes to salesforce.

	Methods:
	- `fetch`: Initiate the fetching of record data from the relevant data store (server/offline store).
	- `save`: Initiate the saving of record data to the relevant data store (server/offline store).
	- `delete`: Initiate the deleting of record data from the relevant data store (server/offline store).

	Example:

	```
	<force-sobject sobject="Account" recordid="001000000000AAA"></force-sobject>
	```

7. __force-sobject-store__: force-sobject-store element wraps the SmartSync `Force.StoreCache` into a polymer element. This element auto manages the lifecycle of the smartstore soup for each sobject type, auto creates index spec based on the lookup relationships on the sobject, provides a simpler DOM based interface to interact with Smartsync SObject Model and allows other polymer elements to easily comsume smartstore.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject that you would like to store in this cache.
	- `fieldstoindex`: (Optional) Addition fields (given by their name) that you want to have indexes on.

	Properties:
	- `cacheReady`: Returns a promise that on completion returns an instance of storecache if smartstore is available.

	Example:

	```
	<force-sobject-store sobject="Account"></force-sobject-store>
	```

8. __force-sobject-layout__: force-sobject-layout element provides the layout information for a particular sobject record. It wraps the `describeLayout` API call. The layout information is cached in memory for existing session and stored in smartstore for offline consumption. This object also provides a base definition for elements that depend on page layouts, such as force-ui-detail and force-sobject-related.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to fetch the layout
	- `hasrecordtypes`: (Optional) Default: false. If false, the element returns the default layout. Set true if the sobject has recordtypes or if you are unsure. If set to true, "recordid" or "recordtypeid" must be provided.
	- `recordtypeid`: (Optional) Default: null. Id of the record type for which layout has to be fetched. Required if "hasrecordtypes" is true and "recordid" is not provided.
	- `recordid`: (Optional) Default: null. Id of the record for which layout has to be fetched. Required if "hasrecordtypes" is true and "recordtypeid" is not provided.
	- `idfield`: (Optional) Default: ID. Name of the ID field, required especially for the cases of External Object.

	Methods:
	- `whenDetailSections`: Initiate the fetching of layout's detail view sections data from the relevant data store (server/offline store). Returns a promise, when complete, returns an array of all detail sections.
	- `whenEditSections`: Initiate the fetching of layout's edit view sections data from the relevant data store (server/offline store). Returns a promise, when complete, returns an array of all edit sections.
    - `whenRelatedLists`: Initiate the fetching of layout's related lists data from the relevant data store (server/offline store). Returns a promise, when complete, returns an array of all related list infos.

	Example:

	```
	<force-sobject-layout sobject="Account"></force-sobject-layout>
	```

9. __force-app__: force-app element is a top level element that builds the base for consuming all other force.com Mobile UI Elements. This element is required and should always be the parent element to all other UI Elements. This element manages all the Javascript dependencies for the elements and manages user session.

	Supported attributes include:
	- `accesstoken`: (Required) Session ID or OAuth access token to make API calls to Salesforce.
	- `instanceurl`: (Optional) Default: Host url of current application. Host instance URL of the salesforce org to make API calls. Eg. https://na1.salesforce.com

	Methods:
	- `launch`: Initiate the launch to start rendering all the other child elements. Cannot be done until the accesstoken and instanceurl are provided.

	Example (when using inside Visualforce):

	```
	<force-app accesstoken="{!$Api.Session_ID}"></force-app>
	```

10. __force-sobject-relatedlists__: force-sobject-relatedlists element enables the rendering of related lists of a sobject record. It extends the `force-sobject-layout` element to fetch the related lists configuraton from the page layout settings. a) Parses the related lists configuration for a particular sobject type, and b) If "recordid" attribute is provided, also generates a soql/cache query to fetch the related record items.

    Supported attributes include:
    - All attributes of force-sobject-layout
    - `relationships`: (Optional) Default: null. A comma separated list of relationship names that should only be fetched. If null, it fetches all related lists that are queryable.

    Properties:
    - `relatedLists`: An array of all the related list information.

    Example:

	```
	<force-sobject-relatedlists sobject="Account" recordid="001000000000AAA"></force-sobject-relatedlists>
	```

11. __force-selector-relatedlist__: force-selector-relatedlist element is an extension of p`olymer-selector` element and provides a wrapper around `force-sobject-collection` element. This is a base element for UI element that needs to render the related list for a record and also needs the selector functionality.

	Supported attributes include:
	- `related`: (Required) Object instance of each related list item from the array obtained via force-sobject-relatedlists element. The object must contain the query and querytype properties to fetch the related items

	Properties:
	- `models`: Returns an array of all the related records. Each item is an object with properties "impl", "id" and "fieldValues". "impl" is the instance of the Force.SObject. "id" is the ID of the current record. "fieldValues" is an array containing field values in the column/field order on the related list.

	Methods:
	- `updateModels`: Updates the "models" property on the element based on the current set of models in the collection.

	Example:

	```
	<force-selector-relatedlist related="{{related}}"></force-selector-relatedlist>
	```

12. __force-ui-relatedlist__: force-ui-relatedlist element is an extension of `force-selector-relatedlist` element and renders a list of related records to an sobject record.

	Supported attributes include:
    - All attributes of force-selector-relatedlist

    Properties:
    - `selected`: Returns the value of "idfield" of the selected records.

    Example:

	```
	<force-ui-relatedlist related="{{related}}"></force-ui-relatedlist>
	```

## Third-party Code ##

This library makes use of a number of third-party components:

- [Polymer](http://www.polymer-project.org/), a JavaScript library to add new extensions and features to modern HTML5 browsers. It's built on top of Web Components, and designed to leverage the evolving web platform on modern browsers.
- [jQuery](http://jquery.com), the JavaScript library to make it easy to write javascript.
- [Backbonejs](http://backbonejs.org), a JavaScript library providing the model–view–presenter (MVP) application design paradigm.
- [Underscorejs](http://underscorejs.org/), a utility-belt library for JavaScript.
- [Ratchet](http://maker.github.io/ratchet), Prototype iPhone apps with simple HTML, CSS, and JS components.


## FAQ ##

__Polymer is still "pre-alpha" project. How should I use it?__

Polymer as an overall project is still a work in progress. We feel that the underlying platform code leveraged for UI Elements is stable enough to start creating new apps for learning and prototyping purposes. Polymer will continue to be tweaked as the Web Components standard reaches its final stage. In the near future, a lot of Polymer features will be natively available in Chrome.

__Polymer doesn't work inside the WebView on Android below 4.4__

This is limitation of the older version of WebKit used for the WebView on pre 4.4 devices. Polymer does work in the Android Mobile browsers along with all of the popular evergreen browsers. If Android WebView is a real limitation, please let us know.

__Does it work with other devices?__

We got our samples to work on IE10 running on Windows Mobile, Safari on iOS6/7, Chrome, Safari, and Firefox

__What's the level of support for this project?__

Mobile UI Elements is an unsupported project. It's a way for us to share our code with the community that might be beneficial for certain use cases. We'd love to build a vibrant community for this project. A lot depends on the level of interest.

__I don't see any data show up in my components__

Please check the JavaScript console to be sure of the error. You might not be getting the data because your session has expired. If that's the case get a new session id. Or you might have enabled cross-domain scripting in Chrome or your other browser.


## Mobile UI Elements License ##
Copyright (c) 2013, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.