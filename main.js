
const http = require('http');
const fs = require('fs');
const {photos} = require('./variables.js');


const server = http.createServer((req, res) => {
    const {method, url} = req;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    res.setHeader('Content-Type', 'application/json');

    if (method === 'GET' && url === '/photos'){
        fs.writeFile('photos.txt', JSON.stringify(photos, null, 2), err => {
            if(err){
                res.writeHead(500);
                return res.end(JSON.stringify({error: 'Server error'}));
            };
            console.log('Files has been saved');
        })
        res.writeHead(200);
        res.end(JSON.stringify(photos));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({error: "Not Found"}));
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000...'); 
});