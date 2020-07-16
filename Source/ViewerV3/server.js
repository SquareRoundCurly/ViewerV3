
// PARAMETERS
const port = 1337;

// Built-in modules
var path = require('path');
var express = require('express');
var fs = require('fs');

// Init ExpressJS
var app = express();

// Get static resource dir 'public'
var dir = path.join(__dirname, 'public');

// Create mime dictionary for basic resource types
var mime =
{
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

// Event GET
app.get('*', function (req, res)
{
    // Get file from request
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    console.log(file);
    // Check if file path is correct
    if (file.indexOf(dir + path.sep) !== 0)
    {
        return res.status(403).end('Forbidden');
    }

    // Get file type
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    console.log(type);

    // Stream file
    var stream = fs.createReadStream(file);

    // If stream opened successfully, pipe it back
    stream.on('open', function ()
    {
        res.set('Content-Type', type);
        stream.pipe(res);
    });

    // If stream didn't open successfully return 404
    stream.on('error', function ()
    {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(port, function ()
{
    console.log('Listening on http://localhost:' + port + '/');
});
