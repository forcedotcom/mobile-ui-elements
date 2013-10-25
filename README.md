# Mobile UI Elements (BETA) #

Mobile UI Elements is a free, open-source Force.com (unsupported) library to simplify the development of mobile apps. The library, based on the [Google’s Polymer framework](http://www.polymer-project.org), provides the fundamental building blocks for creating HTML5 apps that run well on smartphones and tablets. The elements can be mixed together to create fairly complex force.com applications and the apps can be deployed in the browser or embedded inside Container from the Salesforce Mobile SDK.
Note: The library is still in heavy development and is missing certain features as well as complete documentation.
This document is intended to introduce you to the app's architecture and design and make it as easy as possible for you to jump in, run it, and start contributing.

- What is it?
- Available UI Elements
- Third-party Code
- Mobile UI Elements License

## What is it? ##
Mobile UI Elements is a set of web components built using [Google’s Polymer framework](http://www.polymer-project.org). The library utilizes the future of HTML5 standards, such as Custom Elements, ShadowDOM, Templates, HTML imports etc., to provide a set of new HTML tags that generate the Saleforce driven UI for your mobile application. It's built on top of [Salesforce Mobile SDK 2.0](http://www2.developerforce.com/en/mobile/services/mobile-sdk) and extends the open source frameworks such as [Backbone.js](http://backbonejs.org/) and [Undescore.js](http://underscorejs.org/) and [JQuery](http://jquery.com/). It also comes with some stylesheets, providing the responsive design for tablets and phones, and Sample Apps to showcase how to use them in a real application. You can easily combine and extend this library to develop UI specific to your application.

## Available UI Elements ##
1. **force-ui-app **: force-ui-app element is a top level UI element that extends the force-app element and also provides the basic styling and structure for the application. This element also contains the polymer-flex-layout element to enable flexible sections on the page, esp. in single page view with split view panels. Supported attributes include: accesstoken, instanceurl, multipage, startpage, hideheader. Eg. when using inside Visualforce: `<force-ui-app accesstoken="{!$Api.Session_ID}"></force-ui-app>`
2. **force-ui-list **: force-ui-list element enables the rendering of list of records for any sobject. The element can be configured using various attributes, such as query, sobject and querytype, to show specific set of records. This element should always be a child of force-ui-app element. Supported attributes include: query, sobject, querytype. Eg. `<force-ui-list sobject="Account" querytype="mru"></force-ui-list>`
3. **force-ui-detail **: force-ui-detail element provides a quick and easy way to render full view of a salesforce record. This element can auto detect the record's relevant page layout and renders the details accordingly. The element can be configured by using the various attributes, such as sobject, recordid etc, to render layout of a particular record. This element should always be a child of force-ui-app element. Supported attributes include: sobject, recordid, hasrecordtypes, recordtypeid. Eg. `<force-ui-detail sobject="Account" recordid="001000000000AAA"></force-ui-detail>`


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