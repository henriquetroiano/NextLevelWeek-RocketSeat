var express = require('express');
var app = express();
var path = require('path');
var reload = require('reload')

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });


app.listen(5500, () => {
    console.log('Ouvindo a http://127.0.0.1:5500')
});

reload(app)
