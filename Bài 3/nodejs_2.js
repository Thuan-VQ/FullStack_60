const http = require('http');
const info = require('./nodejs_1');
const Me = JSON.stringify(info.getJson())



const server = http.createServer((req, res) => {
    if(req.url === '/index') {
        res.end('<b> This is Homepage </b>')
    } else if( req.url === '/about') {
        res.end(Me)
    } else {
        res.end('<b> 404 not found </b>')
    }
})

server.listen(5000)