const express = require('express')
const app = express()
const port = 8081

var path = __dirname + '';
// Return statis files (*html, *js) from ...
// ... current folder.
app.use(express.static(path));

app.use(express.static('app'));

app.get('/*', (req, res) => {
    res.sendFile('/server/index.html');
});


app.listen(port, (err) => {
    if (err) {
        return console.err(`Unable to start server. Details ${err}`)
    }
    console.log(`server is listening on ${port}`)
})