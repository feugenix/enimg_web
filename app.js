var http = require('http'),
    fs = require('fs');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

http.createServer(function (req, res) {
    var num = getRandomInt(0, 9);

    fs.readFile(__dirname + '/img/test' + num + '.png', function(err, file) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(err);
            return;
        }

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(file, 'binary');
    });
}).listen(process.env.PORT || 5000);
