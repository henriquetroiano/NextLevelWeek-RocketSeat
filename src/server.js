const express = require('express');
const server = express();
var reload = require('reload')

// configurar pasta publica
server.use(express.static('public'));


//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})


//configurar caminhos da app

server.get('/', function (req, res) {
  return res.render('index.html', { title: 'Titulo' })
})

server.get('/create-point', function (req, res) {
  return res.render('create-point.html')
})

server.get('/search-results', function (req, res) {
  return res.render('search-results.html')
})



server.listen(3000, () => {
  console.log('Servidor iniciado.  Acesse: http://localhost:3000')
})
reload(server)
