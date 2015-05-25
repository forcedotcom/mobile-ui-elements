# Mobile UI Elements (BETA) #

## Upgrade Steps ##
To get the latest Polymer library and all the bug fixes, please re-run `npm install`, `bower install` and `grunt` commands.


### [Try out the Designer!!](https://sfdc-designer.herokuapp.com)
### [Watch this Designer video!!](http://youtu.be/67FjSemJ7uQ)
### [Material Design Contact Manager](https://sfdc-sobject-editor.herokuapp.com/)
### [Source Code: Material Design Contact Manager](https://github.com/ForceDotComLabs/paper-sobject-editor)


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
Mobile UI Elements is a set of web components built using [Google’s Polymer framework](http://www.polymer-project.org). The library utilizes the future of HTML5 standards, such as Custom Elements, ShadowDOM, Templates, HTML imports etc., to provide a set of new HTML tags that generate the Saleforce driven UI for your mobile application. It's built on top of [Salesforce Mobile SDK](http://www2.developerforce.com/en/mobile/services/mobile-sdk) and extends the open source frameworks such as [Backbone.js](http://backbonejs.org/) and [Undescore.js](http://underscorejs.org/) and [JQuery](http://jquery.com/). It also comes with some stylesheets, providing the responsive design for tablets and phones, and Sample Apps to showcase how to use them in a real application. You can easily combine and extend this library to develop UI specific to your application.

## Setup ##

### Global Dependencies

Install

* [node.js](http://nodejs.org)
* [GitHub Client](http://mac.github.com/) (with Git Terminal option)
* [Safari](http://www.apple.com/safari/)

and then open Terminal:

    $ sudo npm install -g grunt-cli

### Project Setup

    $ git clone https://github.com/ForceDotComLabs/mobile-ui-elements.git
    $ cd mobile-ui-elements
    $ npm install
    $ bower prune (Do this if you are updating an old copy of mobile-ui-elements to remove core-bind dependency.)
    $ bower install

To build the project, execute:

    $ grunt

To build the project for distribution, execute (all assets will be generated in dist directory):

    $ grunt dist

Run a local node server:

	$ node proxy.js	

You can now launch the [Sample App](http://localhost:9000/index.html). It will go through the OAuth flow to obtain user session and render data.

To create a mobile sdk app, run the following command. Make sure that the [forceios](https://www.npmjs.org/package/forceios) tool is already installed:
	
	$ grunt create_app

## Available UI Elements ##
1. __force-signin__: This element allows an easy way to initiate OAuth into salesforce via web or mobile SDK.
    
    Supported attributes include:
    - `auto`: (Optional) Automatically trigger user authentication as soon as the component is ready. If accesstoken and instanceurl are set via attributes, OAuth will not trigger automatically.
    - `consumerkey`: (Optional) Consumer key for initiating OAuth based salesforce authentication. It's required only for web based applications. For SDK based applications, specify the consumer key in the bootconfig.json.
    - `callbackurl`: (Optional) Callback URL property for OAuth based authentication. It's required only for web based applications. For SDK based applications, specify the callback URL in the bootconfig.json.
    - `loginurl`: (Optional) Login Host for salesforce authentication. It's required only for web based applications. For SDK based applications, specify the login host in application settings. Default value is https://login.salesforce.com
    - `proxyurl`: (Optional) Custom proxy host setting for web based application. If specified, all the HTTP requests will be sent to this proxy host with "Salesforce-Endpoint" header for actual host URL. This allows cross-domain calls restricted by browsers.
    - `usePopupWindow`: (Optional) Set as true if you want OAuth flow to be started in a new child window.
    - `accesstoken`: Salesforce session ID for API requests. It is set by the component after successful completion of Salesforce OAuth.
    - `instanceurl`: Salesforce instance URL for API requests. It is set by the component after successful completion of Salesforce OAuth.
    - `id-url`: Salesforce user identity URL. It is set by the component after successful completion of Salesforce OAuth.
    - `userInfo`: (Read Only) Returns basic user information of currently active session. It is set by the component after successful completion of Salesforce OAuth.

    Methods:
    - `authenticate`: Authenticate the user with salesforce via OAuth.
    - `logout`: Initiates the logout of the current user session.

    Events:
    - `success`: when the OAuth flow is successfully completed and the accesstoken is obtained from salesforce.
    - `error`: when OAuth flow ends in an error.
    - `offline`: when the device is offline and authentication cannot complete. The UI Elements are launched with empty session in that scenario.

	Example (when using inside Visualforce):

	```
	<force-signin consumerkey="CONSUMER_KEY_FROM_SALESFORCE_CONNECTED_APP" callbackurl="https://mycallback.com"></force-signin>
	```

2. __force-sobject-collection__: This element provides a custom component for `Force.SObjectCollection` from Mobile SDK's SmartSync JS. It allows apps to easily fetch a list of records from a salesforce sobject in both online & offline modes. For Offline use, the application should first create a Smartstore soup with same name as the target sobject.

    Supported attributes include:
    - `sobject`: (Required) Name of Salesforce sobject against which fetch operations will be performed.
    - `query`: (Optional) SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
    - `querytype`: (Optional) Default: mru. Type of query (mru, soql, sosl, cache). Required if query attribute is specified.
    - `autosync`: (Optional) Auto synchronize (fetch/save) changes to the model with the remote server/local store. If false, use fetch/save methods to commit changes to server or local store.
    - `maxsize`: (Optional) Default: -1. If positive, limits the maximum number of records fetched.

    Methods:
    - `fetch`: Initiates the fetching of records from the relevant data store (server/offline store).
    - `reset`: Replaces all the existing contents of the collection and initiates autosync if enabled.

    Events:
    - `reset`: when the collection's entire contents have been replaced.
    - `sync`: when the collection has been successfully synced with the server
    - `error`: when a request to remote server has failed.

    Example:

    ```
    <force-sobject-collection sobject="Account" querytype="mru"></force-sobject-collection>
    ```

3. __force-sobject__: This element provides a custom component for `Force.SObject` from Mobile SDK's SmartSync JS. It allows apps to easily perform CRUD operations against a salesforce sobject in both online & offline modes. For Offline use, the application should first create a Smartstore soup with same name as the target sobject.

    Supported attributes include:
    - `sobject`: (Required) Name of Salesforce sobject against which CRUD operations will be performed.
    - `recordid`: (Required) Id of the record on which CRUD operations will be performed.
    - `fieldlist`: (Optional) Default: All fields. List of field names that need to be fetched for the record. Provide a space delimited list. Also the field names are case sensitive.
    - `autosync`: (Optional) Auto synchronize (fetch/save) changes to the model with the remote server/local store. If false, use fetch/save methods to commit changes to server or local store.
    - `cachemode`: (Optional) Default `SFDC.cacheMode()`. The cache mode (server-first, server-only, cache-first, cache-only) to use during CRUD operations.
    - `mergemode`: (Optional) Default `Force.MERGE_MODE.OVERWRITE`. The merge model to use when saving record changes to salesforce.
    - `fields`: Returns a map of fields to values for a specified record. Update this map to change SObject field values.

    Methods:
    - `fetch`: Initiate the fetching of record data from the relevant data store (server/offline store).
    - `save`: Initiate the saving of record data to the relevant data store (server/offline store).
    - `destroy`: Initiate the deleting of record data from the relevant data store (server/offline store).

    Events:
    - `save`: when the data has been successfully saved to the server.
    - `sync`: when the data has been successfully synced with the server.
    - `destroy`: when a record is deleted.
    - `error`: when a request to remote server has failed.
    - `invalid`: when the data validation fails on the client.

    Example:

    ```
    <force-sobject sobject="Account" recordid="001000000000AAA"></force-sobject>
    ```

4. __force-sobject-store__: This element provides a custom component for `Force.StoreCache` from Mobile SDK's SmartSync JS. It allows an app to quickly create and manage Smartstore soup for a salesforce sobject.

    Supported attributes include:
    - `sobject`: (Required) Type of sobject that you would like to store in this cache.
    - `fieldstoindex`: (Optional) Addition fields (given by their name) that you want to have indexes on.
    - `cacheReady`: Returns a promise to track store cache creation progress.
    - `cache`: Returns an instance of Force.StoreCache when it's ready to store/retrieve data.
    - `cacheForOriginals`: Returns an instance of Force.StoreCache to be used to keep data copy for conflict resolution.

    Methods:
    - `destroy`: Removes the soup from smartstore. Returns a promise to track the completion of process.

    Events:
    - `store-ready`: Fires this event when the store cache has been successfully created and ready to use.
    - `store-destroy`: Fires this event when the store cache has been successfully removed.

    Example:

    ```
    <force-sobject-store sobject="Account"></force-sobject-store>
    ```

5. __force-sobject-layout__: This web component provides the layout information for a particular sobject type or record. Layout information is cached in memory for existing session and is also stored in smartstore if used with Mobile SDK. `force-ui-detail` and `force-sobject-related` use this web component to obtain layout information.

    Supported attributes include:
    - `sobject`: (Required) Name of Salesforce sobject for which layout info will be fetched.
    - `hasrecordtypes`: (Optional) Default: false. If false, the element returns the default layout. Set true if the sobject has recordtypes or if you are unsure. If set to true, `recordid` or `recordtypeid` must be provided.
    - `recordtypeid`: (Optional) Default: null. Id of the record type for which layout has to be fetched. Required if `hasrecordtypes` is true and `recordid` is not provided.
    - `recordid`: (Optional) Default: null. Id of the record for which layout has to be fetched. Required if `hasrecordtypes` is true and `recordtypeid` is not provided.
    - `layout`: (Read Only) Returns an object with the complete layout information.
    
    Methods:
    - `fetch`: Method to manually initiate the fetching of layout information.

    Example:

    ```
    <force-sobject-layout sobject="Account"></force-sobject-layout>
    ```

6. __force-sobject-relatedlists__: This element allows fetching related lists configuration of a sobject record. It embeds the `force-sobject-layout` element to fetch the related list setup from the page layout. If `recordid` attribute is provided, it also generates a soql/cache query to fetch the related record items.

    Supported attributes include:
    - `sobject`: (Required) Name of Salesforce sobject for which related list info will be fetched.
    - `recordid`: (Required) Id of the record for which related list queries will be generated. These queries can be used for fetching related records.
    - `hasrecordtypes`: (Optional) Default: false. If false, the element returns the default layout. Set true if the sobject has recordtypes or if you are unsure. If set to true, `recordid` or `recordtypeid` must be provided.
    - `recordtypeid`: (Optional) Default: null. Id of the record type for which layout has to be fetched. Required if `hasrecordtypes` is true and `recordid` is not provided.
    - `relationships`: (Optional) Default: null. A list of relationship names that should only be fetched. If null, it fetches all related lists that are queryable.
    - `relatedLists`: Returns an array of all the related list information.

    Example:

    ```
    <force-sobject-relatedlists sobject="Account" recordid="001000000000AAA"></force-sobject-relatedlists>
    ```

7. __force-ui-app__: This element is a top level UI element that provides the basic styling and structure for the application. This element uses polymer layout features to enable flexible sections on the page. This is useful in single page view with split view panels. All the children of the main section must have the class "content" specified on them to apply the right styles.

	Supported attributes include:
	- `multipage`: (Optional) Default: false. When true, force-ui-app shows only one direct child, with class="page", at a time and allows navigation to other child elements.
	- `startpage`: (Optional) Default: first direct child element with class="page". Instance of the DOM element, with class="page", that should be shown first when the app loads.

	Example (when using inside Visualforce):

	```
	<force-ui-app multipage></force-ui-app>
	```

8. __force-ui-list__: This element enables the rendering of simple list of salesforce records driven by a `force-sobject-collection`. It uses the iron-selector element to detect record selection based on user's tap actions. This element should always be a child of `force-ui-app` element to inherit the appropriate styles.

	Supported attributes include:
	- `sobject`: (Required) Name of Salesforce sobject for which record list will be generated.
    - `query`: (Optional) SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
    - `querytype`: (Optional) Default: mru. Type of query (mru, soql, sosl, cache). Required if query attribute is specified.
    - `labelfield`: (Optional) Default: "Name". Name of the field to be used as label on each list element.
    - `sublabelfield`: (Optional) Name of the field to be used as the sublabel on each list element.
    - `selected`: Returns the value of "idfield" of the selected records.

	Example:

	```
	<force-ui-list sobject="Account" querytype="mru"></force-ui-list>
	```

9. __force-ui-detail__: This element enables the rendering of full view of a salesforce record. This element uses the `force-sobject-layout` element to fetch the page layout for the record. This element also embeds a `force-sobject` element to allow all the CRUD operations on an SObject. This element should always be a child of `force-ui-app` element to inherit the default styles.

	Supported attributes include:
	- `sobject`: (Required) Name of Salesforce sobject for which detail view will be rendered.
    - `recordid`: (Required) Id of the record for which detail view will be rendered.
    - `hasrecordtypes`: (Optional) Default: false. If false, the element returns the default layout. Set true if the sobject has recordtypes or if you are unsure. If set to true, `recordid` or `recordtypeid` must be provided.
    - `recordtypeid`: (Optional) Default: null. Id of the record type for which layout has to be fetched. Required if `hasrecordtypes` is true and `recordid` is not provided.
	- `fieldlist`: (Optional) Default: All fields on the layout. A list of fields that should be displayed for the record.
    - `fieldlabels`: (Optional) Default: Actual field labels. A list of labels for fields provided in fieldlist attribute. The order of labels should be same as the order of fields in the fieldlist attribute.
    - `foredit`: (Optional) Default: false. Display edit view of the detail.

	Example:

	```
	<force-ui-detail sobject="Account" recordid="001000000000AAA"></force-ui-detail>
	```

10. __force-ui-relatedlist__: This element renders a list of records for a SObject's related list configuration.  It uses the iron-selector element to detect record selection based on user's tap actions. This element should always be a child of `force-ui-app` element to inherit the default styles.

	Supported attributes include:
    - `related`: (Required) Related list configuration obtained from `force-sobject-relatedlist`.
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
- [Ratchet](http://goratchet.com), Prototype iPhone apps with simple HTML, CSS, and JS components.


## FAQ ##

__Polymer is still "alpha" project. How should I use it?__

Polymer as an overall project is still a work in progress. We feel that the underlying platform code leveraged for UI Elements is stable enough to start creating new apps for learning and prototyping purposes. Polymer will continue to be tweaked as the Web Components standard reaches its final stage. Various building blocks of Web Components, including Shadow DOM, are now natively supported in Chrome. This enables better performance for your mobile applications.

__Polymer doesn't work inside the WebView on Android below 4.4__

This is limitation of the older version of WebKit used for the WebView on pre 4.4 devices. Polymer does work in the Android Mobile browsers along with all of the popular evergreen browsers. If Android WebView is a real limitation, please let us know.

__Does it work with other devices?__

We got our samples to work on IE10 running on Windows Mobile, Safari on iOS6/7, Chrome, Safari, and Firefox

__What's the level of support for this project?__

Mobile UI Elements is an unsupported project. It's a way for us to share our code with the community that might be beneficial for certain use cases. We'd love to build a vibrant community for this project. A lot depends on the level of interest.

__I don't see any data show up in my components__

Please check the JavaScript console to be sure of the error. You might not be getting the data because your session has expired. If that's the case get a new session id. Or you might have enabled cross-domain scripting in Chrome or your other browser.


## Mobile UI Elements License ##
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
