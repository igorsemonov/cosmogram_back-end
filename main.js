
const http = require('http');
const fs = require('fs');
const {photos} = require('./variables.js');

fs.writeFile('photos.txt', JSON.stringify(photos, null, 2), err => {
    if(err){
        res.writeHead(500);
        return res.end(JSON.stringify({error: 'Server error'}));
    };
});

const server = http.createServer((req, res) => {
    const {method, url} = req;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");    
    res.setHeader('Content-Type', 'application/json');

    if (method === "OPTIONS") {
        return res.writeHead(200);
    };

    if (method === 'GET' && url === '/photos'){
        res.writeHead(200);
        res.end(JSON.stringify(photos));
    }
    else if (method === 'POST' && url === '/photos'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newItem = JSON.parse(body);
            newItem.id = photos.length + 1;
            photos.push(newItem);
            fs.writeFile('photos.txt', JSON.stringify(photos, null, 2), err => {
                if(err){
                    res.writeHead(500);
                    return res.end(JSON.stringify({error: 'Server error'}));
                };
            })
            res.writeHead(201);
            res.end(JSON.stringify(newItem));
        });
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({error: "Not Found"}));
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000...'); 
});