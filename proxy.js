var http = require('http'),
    httpProxy = require('http-proxy'),
    express = require('express');

// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({ secure: true });

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = require('http').createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  var host = req.headers['x-host'];
  var target = host || 'http://localhost:8080';
  proxy.web(req, res, { target: target });

});

//
// Listen for the `error` event on `proxy`.
server.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
server.on('proxyRes', function (res) {
  console.log('RAW Response from the target', JSON.stringify(res.headers, true, 2));
});

server.listen(process.env.PORT || 9000);
console.log('Listening on port %d', server.address().port);


/***** SETUP EXPRESS SERVER FOR DESIGNER ****/

// Create express application (http://expressjs.com) ###
var app = express();
app.use(express.static(__dirname));
var appServer = app.listen(8080, function() {
    console.log('Listening on port %d', appServer.address().port);
});