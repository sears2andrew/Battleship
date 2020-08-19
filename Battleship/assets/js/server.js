//credit to professor nwanze. almost entirly based off of his class slides

//set up variables
const http = require('http');
const move = require('./aimoves.js');
const hostname = '127.0.0.1';
const port = 3000;
const url = require('url');

//create the server

const server = http.createServer((req, res) => {
    //set status and headers to allow access
    res.statusCode=200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    //call and return data from aimoves to the client
    move.aimov(function(data){
        res.end(JSON.stringify(data));
    },req);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});