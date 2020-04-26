const express = require('express')
const app = express()
const port = 8081

app.use(express.static('app'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});


app.listen(port, (err) => {
    if (err) {
        return console.err(`Unable to start server. Details ${err}`)
    }
    console.log(`server is listening on ${port}`)
})
