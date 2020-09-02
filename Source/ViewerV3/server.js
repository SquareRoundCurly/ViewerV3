
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

/// Client JS library setup
// Bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));    // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));      // redirect bootstrap JS
// Packery
app.use('/packery', express.static(__dirname + '/node_modules/packery/dist/'));

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

// Create project table
db.run
(`CREATE TABLE IF NOT EXISTS projects
    (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        year INT NOT NULL,
        projectID INT NOT NULL UNIQUE,
        measurementTypes TEXT
    );
`);

// Mock project data
var projectCommand1 = "INSERT INTO projects (name,year,projectID, measurementTypes) VALUES ('0007_mintaprojekt', '2019', '7', 'x-sec');";
var projectCommand2 = "INSERT INTO projects (name,year,projectID, measurementTypes) VALUES ('0012_mintaprojekt', '2019', '12', 'x-sec xray');";
var projectCommand3 = "INSERT INTO projects (name,year,projectID, measurementTypes) VALUES ('0018_mintaprojekt', '2019', '18', 'x-sec');";
var projectCommand4 = "INSERT INTO projects (name,year,projectID, measurementTypes) VALUES ('0028_mintaprojekt', '2019', '28', 'x-sec xray shear');";

db.run(projectCommand1, function (err) { if (err !== null) console.log(err); });
db.run(projectCommand2, function (err) { if (err !== null) console.log(err); });
db.run(projectCommand3, function (err) { if (err !== null) console.log(err); });
db.run(projectCommand4, function (err) { if (err !== null) console.log(err); });

// Create layout table
db.run
(`CREATE TABLE IF NOT EXISTS layouts
    (
        id INTEGER PRIMARY KEY,
        year INT NOT NULL,
        projectID INT NOT NULL,
        measurementType TEXT NOT NULL,
        productID TEXT,
        sampleID TEXT,
        typeIDs TEXT
    );
`);

// Mock layout data
var layout1 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeIDs) VALUES ('2019', '7', 'x-sec', 'A1X', 'A1X', 'ECU1 ECU2 PM1 PM2 PM3 PM4');";
var layout2 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeIDs) VALUES ('2019', '7', 'x-sec', 'A2X', 'A2X', '');";
var layout3 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeIDs) VALUES ('2019', '7', 'x-sec', 'F1X', 'F1X', '');";
var layout4 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeIDs) VALUES ('2019', '7', 'x-sec', 'F2X', 'F2X', '');";
//var layout5 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeID) VALUES ('2019', '12', 'xray', '', '', '');";
//var layout6 = "INSERT INTO layouts (year,projectID, measurementType, productID, sampleID, typeID) VALUES ('2019', '12', 'x-sec', '', '', '');";

//db.run(layout1, function (err) { if (err !== null) console.log(err); });
//db.run(layout2, function (err) { if (err !== null) console.log(err); });
//db.run(layout3, function (err) { if (err !== null) console.log(err); });
//db.run(layout4, function (err) { if (err !== null) console.log(err); });

//db.run(layout5, function (err) { if (err !== null) console.log(err); });
//db.run(layout6, function (err) { if (err !== null) console.log(err); });

// Create layoutHTML table
db.run
(`CREATE TABLE IF NOT EXISTS layoutHTML
    (
	    id INTEGER PRIMARY KEY,
        year INT NOT NULL,
        projectID INT NOT NULL,
        measurementType TEXT NOT NULL,
        productID TEXT,
        sampleID TEXT,
        typeID TEXT,
        html TEXT
    );`
);


// Mock layoutHTML data
var html1 = `
<div class="grid-item grid-item--width2"><img src="Images/S115_C413_01.jpg" /></div>
    <div class="grid-item grid-item--height2"><img src="Images/S115_C413_02.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_03.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_04.jpg" /></div>
    <div class="grid-item grid-item--width2 grid-item--height2"><img src="Images/S115_C413_05.jpg" /></div>
    <div class="grid-item grid-item--width2"><img src="Images/S115_C413_06.jpg" /></div>
    <div class="grid-item grid-item--width2"><img src="Images/S115_C413_07.jpg" /></div>
    <div class="grid-item grid-item--height2"><img src="Images/S115_C413_08.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_08m.jpg" /></div>
    <div class="grid-item grid-item--width2"><img src="Images/S115_C413_09.jpg" /></div>
    <div class="grid-item grid-item--height2"><img src="Images/S115_C413_10.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_11.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_12.jpg" /></div>
    <div class="grid-item grid-item--width2 grid-item--height2"><img src="Images/S115_C413_13.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_14.jpg" /></div>
    <div class="grid-item grid-item--width2"><img src="Images/S115_C413_15.jpg" /></div>
    <div class="grid-item grid-item--height2"><img src="Images/S115_C413_16.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_01.jpg" /></div>
</div>
`;
var layoutHTML1 = "INSERT INTO layoutHTML (year,projectID, measurementType, productID, sampleID, typeID, html) VALUES ('2019', '7', 'x-sec', 'A1X', 'A1X', 'ECU1', '" + html1 +"');";

//db.run(layoutHTML1, function (err) { if (err !== null) console.log(err); });

var html2 = `
<div class="grid-item"><img src="Images/S115_C413_12.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_02.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_13.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_07.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_11.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_06.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_07.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_08.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_08m.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_09.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_10.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_11.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_12.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_13.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_14.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_15.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_16.jpg" /></div>
    <div class="grid-item"><img src="Images/S115_C413_01.jpg" /></div>
</div>
`;

var layoutHTML2 = "INSERT INTO layoutHTML (year,projectID, measurementType, productID, sampleID, typeID, html) VALUES ('2019', '7', 'x-sec', 'A1X', 'A1X', 'ECU2', '" + html1 + "');";

db.run(layoutHTML2, function (err) { if (err !== null) console.log(err); });

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

app.get('/layout', function (req, res) {
    res.render('pages/layout');
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
    // Connection
    console.log('a user connected');

    // TODO: remove this
    fs.readFile('../../Images/S115_C413_02.jpg', function (err, data)
    {
        console.log('emitting S115_C413_02.jpg');
        socket.emit('image', "data:image/jpg;base64," + data.toString("base64"));
    });

    // Search event
    socket.on('SearchBtn', function (data) {
        Search(data.serial, data.type);
        console.log("emitting array of size : " + result.length);
    });

    // Search result emission
    if (result.length > 0) {
        socket.emit('searchResult', { result: result[0] });
        resultIterator += 1;
    }

    // Ready for next search result emission
    socket.on('searchDigested', function () {
        if (resultIterator < result.length) {
            socket.emit('searchResult', { result: result[resultIterator] });
            resultIterator += 1;
        }
    });

    socket.on('ProjectSearchBtn', function (data) {
        SearchProject(data.year, data.project);
    });

    socket.on('ProjectMeasurementTypeSearch', function (data) {
        SearchProjectMeasurementType(data.year, data.projectID, data.measurementType);
    });

    socket.on('RequestLayoutHTML', function (data) {
        HandleRequestLayoutHTML(data.year, data.projectID, data.measurementType, data.sampleID, data.typeID);
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

function SearchProject(year, projectID) {
    console.log('Searching for project : ' + projectID + ' in year : ' + year);

    // Construct command
    console.log("Constructed query");
    var command = "SELECT name, year, projectID, measurementTypes FROM projects WHERE year = " + year + " AND projectID = " + projectID + ";";
    console.log(command);

    // Get results from SELECT
    var projectResult = { name: "", year: -1, projectID: -1, measurementTypes: "" };
    db.all(command, [], (err, rows) => {

        if (err !== null) {
            console.log(err);
        }

        var success = false;
        console.log("Found " + rows.length + " results");
        if (rows.length == 1) {
            console.log("Found matching project");
            success = true;
        }
        else if (rows.length == 0) {
            console.log("No such project matching year and projectID");
        }
        else {
            console.log("Incorrect project query, multiple results matching parameters");
        }

        if (success) {
            console.log("Found project name : " + rows[0].name);
            projectResult.name = rows[0].name;
            projectResult.year = rows[0].year;
            projectResult.projectID = rows[0].projectID;
            projectResult.measurementTypes = rows[0].measurementTypes;
        }

        io.sockets.emit("projectSearchResult", projectResult);
    });
}

function SearchProjectMeasurementType(year, projectID, measurementType) {
    console.log('Searching for project : ' + projectID + ' in year : ' + year + ' with measurement type : ' + measurementType);

    // Construct command
    console.log("Constructed query");
    var command = "SELECT year, projectID, measurementType, productID, sampleID, typeIDs FROM layouts WHERE year = " + year + " AND projectID = " + projectID + " AND measurementType = '" + measurementType + "';";
    console.log(command);

    // Get results from SELECT
    var layoutResults = [];
    db.all(command, [], (err, rows) => {

        if (err !== null) {
            console.log(err);
        }

        var success = false;
        console.log("Found " + rows.length + " results");
        if (rows.length >= 1) {
            console.log("Found matching layout(s)");
            success = true;
        }
        else {
            console.log("No such layout matching year and projectID and measurementType");
        }

        if (success) {
            rows.forEach((row) => {
                var layoutResult = { sampleID: "", typeIDs: "" };
                layoutResult.sampleID = row.sampleID;
                layoutResult.typeID = row.typeIDs;
                layoutResults.push(layoutResult);
            });
        }

        io.sockets.emit("ProjectMeasurementTypeSearchResult", layoutResults);
    });
}

function HandleRequestLayoutHTML(year, projectID, measurementType, sampleID, typeID) {
    // Construct command
    console.log("Constructed query");
    var command = "SELECT html FROM layoutHTML WHERE year = " + year + " AND projectID = " + projectID + " AND measurementType = '" + measurementType + "' AND sampleID = '" + sampleID + "' AND typeID = '" + typeID + "';";
    console.log(command);

    // Get results from SELECT
    db.all(command, [], (err, rows) => {

        if (err !== null) {
            console.log(err);
        }

        var success = false;
        console.log("Found " + rows.length + " results");
        if (rows.length == 1) {
            console.log("Found matching HTML");
            success = true;
        }
        else {
            console.log("No such HTML matching year and projectID and measurementType and sampleID and typeID");
        }

        if (success) {
            io.sockets.emit("RequestedLayoutHTML", rows[0].html);
        }
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