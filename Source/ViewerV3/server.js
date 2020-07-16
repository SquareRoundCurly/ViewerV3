'use strict';

// Built-in Modules
var http = require('http');
var fs = require('fs');

// Port declaration
var port = process.env.PORT || 1337;

// Event connect to server
http.createServer(function (req, res) {
    fs.readFile('HTML/Index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(port);
