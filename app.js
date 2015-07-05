var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
    var num = Math.floor(Math.random() * 10);

    fs.readFile(__dirname + '/img/test' + num + '.png', function(err, file) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(err);
            return;
        }

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(file.toString('utf8'));
    });
}).listen(process.env.PORT || 5000);
