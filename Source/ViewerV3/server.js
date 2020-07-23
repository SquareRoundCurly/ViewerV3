
// PARAMETERS
const port = 1337;

// Built-in modules
var path = require('path');
var fs = require('fs');

// Vendor modules
var express = require('express');       // Public directory
const chokidar = require('chokidar');   // FS watcher

// Initialization
var app = express();                            // Init ExpressJS
var server = require('http').createServer(app); // Init HTTP server
var io = require('socket.io')(server);          // Create socket.io

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

// File system watcher
const watcher = chokidar.watch('../../Images', { persistent: true });   // Initialize watcher
watcher.on('add', path =>                                               // Add event listeners
{
    console.log(`File ${path} has been added`);
    fs.readFile(path, function (err, buf)
    {
        console.log(buf.length);
        io.emit('image', "data:image/jpg;base64," + buf.toString("base64"));
    });
});  

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

// Connection event (and disconnect)
io.on('connection', (socket) =>
{
    console.log('a user connected');

    fs.readFile('../../Images/S115_C413_02.jpg', function (err, data)
    {
        console.log('emitting S115_C413_02.jpg');
        console.log(data.length);
        socket.emit('image', "data:image/jpg;base64," + data.toString("base64"));
    });

    socket.on('disconnect', () =>
    {
        console.log('user disconnected');
    });
});

// Server start listening event
server.listen(port, function ()
{
    console.log('Listening on http://localhost:' + port + '/');
});
