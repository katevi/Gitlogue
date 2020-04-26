const DEFAULT_PORT = 8081;
const DEFAULT_SERVER_PATH = "/";

const express = require('express')
const app = express();

// Retrieve configuration values from environment ...
// ... variables. Set default if null.
var port = process.env.SERVER_PORT || DEFAULT_PORT; 
var serverPath = process.env.SERVER_PATH || DEFAULT_SERVER_PATH;

var path = __dirname + '';
// Return static files (*html, *js) from ...
// ... current folder.
app.use(express.static(path));

app.use(express.static('app'));

app.get('/*', (req, res) => {
    res.sendFile(`${serverPath}index.html`);
});


app.listen(port, (err) => {
    if (err) {
        return console.err(`Unable to start server. Details ${err}`)
    }
    console.log(`server is listening on ${port}`)
})
