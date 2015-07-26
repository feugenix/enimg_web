var http = require('http'),
    fs = require('fs'),
    checkHash = process.argv[2];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// https://level12.herokuapp.com/fd432f4e1.png
http.createServer(function (req, res) {
    if (req.url.indexOf(checkHash + '.png') === -1) {

        res.statusCode = 302;
        res.setHeader('Location', listOfBullshit[bullshitKeys[getRandomInt(0, bullshitKeys.length)]]);
        res.end('');

        return;
    }

    var num = getRandomInt(0, 9);

    fs.readFile(__dirname + '/img/test' + num + '.png', function(err, file) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.send('Херня какая-то, звоните оргам');
            res.end(err);
            return;
        }

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(file, 'binary');
    });
}).listen(process.env.PORT || 5000);

var listOfBullshit = {
        'salad_fingers_spoons': 'https://www.youtube.com/watch?v=OWBFKL6H7rI',
        'charlie_the_unicorn': 'https://www.youtube.com/watch?v=CsGYh8AacgY',
        'carrot': 'https://www.youtube.com/watch?v=P8kkPISzrEg',
        'baaa': 'https://www.youtube.com/watch?v=WQO-aOdJLiw',
        'mir_bobra': 'https://www.youtube.com/watch?v=k3rVaaI7XqU',
        'double_fedor_gribi': 'https://www.youtube.com/watch?v=vqIvq9KmugU',
        'jesus_rag': 'https://www.youtube.com/watch?v=6pdYjcfctVw',
        'jesus_sandals': 'https://www.youtube.com/watch?v=N9YmtlIk3VM'
    },
    bullshitKeys = Object.keys(listOfBullshit);
