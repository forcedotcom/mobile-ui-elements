# Mobile UI Elements (BETA) #

Mobile UI Elements is a free, open-source Force.com (unsupported) library to simplify the development of mobile apps. The library, based on the [Google’s Polymer framework](http://www.polymer-project.org), provides the fundamental building blocks for creating HTML5 apps that run well on smartphones and tablets. The elements can be mixed together to create fairly complex force.com applications and the apps can be deployed in the browser or embedded inside Container from the Salesforce Mobile SDK.
Note: The library is still in heavy development and is missing certain features as well as complete documentation.
This document is intended to introduce you to the app's architecture and design and make it as easy as possible for you to jump in, run it, and start contributing.

- What is it?
- Setup
- Available UI Elements
- Third-party Code
- Mobile UI Elements License

## What is it? ##
Mobile UI Elements is a set of web components built using [Google’s Polymer framework](http://www.polymer-project.org). The library utilizes the future of HTML5 standards, such as Custom Elements, ShadowDOM, Templates, HTML imports etc., to provide a set of new HTML tags that generate the Saleforce driven UI for your mobile application. It's built on top of [Salesforce Mobile SDK 2.0](http://www2.developerforce.com/en/mobile/services/mobile-sdk) and extends the open source frameworks such as [Backbone.js](http://backbonejs.org/) and [Undescore.js](http://underscorejs.org/) and [JQuery](http://jquery.com/). It also comes with some stylesheets, providing the responsive design for tablets and phones, and Sample Apps to showcase how to use them in a real application. You can easily combine and extend this library to develop UI specific to your application.

## Setup

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

To run the sample app in Safari:

```
1. Open index.html in an editor
2. At line 25, plug in the salesforce session Id. You can use salesforce debugshell to get the session Id.
3. At line 26, plug in the instance url of the org. Eg. https://na1.salesforce.com
4. Open index.html in Safari and you should be able to browse a simple list and detail of an account.
```

## Available UI Elements ##
1. __force-ui-app__: force-ui-app element is a top level UI element that extends the force-app element and also provides the basic styling and structure for the application. This element also contains the polymer-flex-layout element to enable flexible sections on the page, esp. in single page view with split view panels.

	Supported attributes include:
	- `accesstoken`: (Required) Session ID or OAuth access token to make API calls to Salesforce.
	- `instanceurl`: (Optional) Default: Host url of current application. Host instance URL of the salesforce org to make API calls. Eg. https://na1.salesforce.com
	- `multipage`: (Optional) Default: false. When true, force-ui-app shows only one direct child, with class="page", at a time and allows navigation to other child elements.
	- `startpage`: (Optional) Default: first direct child element with class="page". Instance of the DOM element, with class="page", that should be shown first when the app loads.
	- `hideheader`: (Optional) Default: false. Show/Hide default header on the page.

	Example: when using inside Visualforce:

	```
	<force-ui-app accesstoken="{!$Api.Session_ID}"></force-ui-app>
	```

2. __force-ui-list__: force-ui-list element enables the rendering of list of records for any sobject. The element can be configured using various attributes, such as query, sobject and querytype, to show specific set of records. This element should always be a child of force-ui-app element.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to render a list.
	- `query`: (Optional) Default: null. SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
	- `querytype`: (Optional) Default: mru. Type of query (mru, soql, sosl, cache). Required if query attribute is specified.

	Example:

	```
	<force-ui-list sobject="Account" querytype="mru"></force-ui-list>
	```

3. __force-ui-detail__: force-ui-detail element provides a quick and easy way to render full view of a salesforce record. This element can auto detect the record's relevant page layout and renders the details accordingly. The element can be configured by using the various attributes, such as sobject, recordid etc, to render layout of a particular record. This element should always be a child of force-ui-app element.

	Supported attributes include:
	- `sobject`: (Required) Type of sobject on which you want to render a list.
	- `recordid`: (Required) Id of the record that needs to be fetched.
	- `hasrecordtypes`: (Optional) Default: false. Mark this as true, if the sobject has multiple record types.
	- `recordtypeid`: (Optional) Default: None. If provided, the layout associated with this recordtypeid is rendered.

	Example:

	```
	<force-ui-detail sobject="Account" recordid="001000000000AAA"></force-ui-detail>
	```

## Third-party Code ##

This library makes use of a number of third-party components:

- [Polymer](http://www.polymer-project.org/), a JavaScript library to add new extensions and features to modern HTML5 browsers. It's built on top of Web Components, and designed to leverage the evolving web platform on modern browsers.
- [jQuery](http://jquery.com), the JavaScript library to make it easy to write javascript.
- [Backbonejs](http://backbonejs.org), a JavaScript library providing the model–view–presenter (MVP) application design paradigm.
- [Underscorejs](http://underscorejs.org/), a utility-belt library for JavaScript.
- [Ratchet](http://maker.github.io/ratchet), Prototype iPhone apps with simple HTML, CSS, and JS components.


## Mobile UI Elements License ##
Copyright (c) 2013, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.