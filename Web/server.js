var http = require('http').createServer(httpHandler);
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(http)

http.listen(8080);

function httpHandler(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    
    console.log("Requested: " + filename);
    
    switch(filename) {
        case "./":
            loadPage('./home/index.html', res);
            break;
        case './climate':
            loadPage('./climate/index.html', res);
            break;
        case './audio':
            loadPage('./audio/index.html', res);
            break;
        case './settings':
            loadPage('./settings/index.html', res);
            break;
        case './navigation':
            loadPage('./nav/index.html', res);
            break;
        default:
            loadPage(filename, res);
    }
}

function loadPage(page, res) {
    fs.readFile(page, function(err, data) {
        if(err) {
            pageNotFound(res);
            return;
        }
        res.writeHead(200);
        res.write(data);
        return res.end();
    });
}
function pageNotFound(res) {
    fs.readFile('./404.html' , function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Page Not Found");
        }
        res.writeHead(404);
        res.write(data);
        return res.end();
    })
}

io.sockets.on('connection', function(socket) {
    socket.on('hello', function(data) {
        console.log(data);
    });
});
