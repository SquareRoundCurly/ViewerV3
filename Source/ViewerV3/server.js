
// PARAMETERS
const port = 1337;

// Built-in modules
var path = require('path');
var fs = require('fs');

// Vendor modules
var express = require('express');               // Public directory
const chokidar = require('chokidar');           // FS watcher
const sqlite3 = require('sqlite3').verbose();   // DB

// Initialization
var app = express();                            // Init ExpressJS
var server = require('http').createServer(app); // Init HTTP server
var io = require('socket.io')(server);          // Create socket.io

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Client JS library setup
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

// Get static resource dir 'public'
var dir = path.join(__dirname, 'public');

var resultIterator = 0;
var result = [];

// Database
let db = new sqlite3.Database('./database/test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
});

// Create image table
db.run
(`CREATE TABLE IF NOT EXISTS images
    (
	    id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE
    );`
);

fs.readdir('../../Images', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files
    files.forEach(function (file) {
        var name = file.split('.')[0];
        var filePath = path.join('../../Images', file);
        var command = 'INSERT INTO images (name,path) VALUES (\'' + name + '\', \'' + filePath + '\');';
        console.log(command);
        db.run(command, function (err) { if (err !== null) console.log(err); });
    });
});

// File system watcher
const watcher = chokidar.watch('../../Images', { persistent: true });   // Initialize watcher
watcher.on('add', path =>                                               // Add event listeners
{
    console.log(`File ${path} has been added`);
    fs.readFile(path, function (err, buf) {
        io.emit('image', "data:image/jpg;base64," + buf.toString("base64"));
    });
});  

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

app.get('/', function (req, res) {
    res.render('pages/home');
});

app.get('/search', function (req, res) {
    res.render('pages/search');
});

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
        socket.emit('image', "data:image/jpg;base64," + data.toString("base64"));
    });

    socket.on('SearchBtn', function (data) {
        Search(data.serial, data.type);
        console.log("emitting array of size : " + result.length);
    });

    if (result.length > 0) {
        socket.emit('searchResult', { result: result[0] });
        resultIterator += 1;
    }

    socket.on('searchDigested', function () {
        if (resultIterator < result.length) {
            socket.emit('searchResult', { result: result[resultIterator] });
            resultIterator += 1;
        }
    });

    socket.on('disconnect', () =>
    {
        console.log('user disconnected');
    });
});

function Search(serial, type) {
    console.log("Search action");

    // Clear results array
    result = [];
    resultIterator = 0;

    // Log search parameters
    console.log("Serial : " + serial);
    console.log("Type : " + type);

    // Construct command
    console.log("Constructed query");
    var command = 'SELECT name, path FROM images WHERE name LIKE \'' + serial + '%\';';
    console.log(command);

    // Get results from SELECT
    db.all(command, [], (err, rows) => {

        if (err !== null) {
            console.log(err);
        }

        console.log("Found " + rows.length + " results");
        rows.forEach((row) => {
            console.log("name : " + row.name + "\t" + "path : " + row.path);
            console.log("Sending : " + JSON.stringify(row));
            
            fs.readFile(row.path, function (err, buf) {
                row.data = "data:image/jpg;base64," + buf.toString("base64");
                result.push(JSON.stringify(row));
            });

            
        });
    });
}

// Server start listening event
server.listen(port, function ()
{
    console.log('Listening on http://localhost:' + port + '/');
});


// Close the database connection
//db.close((err) => {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Close the database connection.');
//});