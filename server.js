var express = require("express")
var path = require('path');
app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen('8080', () => {
    console.log('Love is in the air!')
})
