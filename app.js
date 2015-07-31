var http = require('http'),
    fs = require('fs'),
    checkHash = process.argv[2];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

// https://level12.herokuapp.com/fd432f4e1.png
http.createServer(function (req, res) {
    if (req.url.indexOf(checkHash + '.png') === -1) {

        res.statusCode = 302;
        res.setHeader('Location', listOfBullshit[bullshitKeys[getRandomInt(0, bullshitKeys.length)]]);
        res.end('');

        return;
    }

    var cookies = parseCookies(req),
        prev = cookies.csrft,
        num = getRandomInt(0, 9);

    console.log(prevTokens[num], prev);
    while (prevTokens[num] === prev)
        num = getRandomInt(0, 9);
    console.log(prevTokens[num], prev)

    fs.readFile(__dirname + '/img/test' + num + '.png', function(err, file) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.send('Херня какая-то, звоните оргам');
            res.end(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'nocache',
            'Expires': '0',
            'Set-Cookie': 'csrft=' + prevTokens[num],
        });
        res.end(file, 'binary');
    });
}).listen(process.env.PORT || 5000);

var prevTokens = {
    0: 'e611677057a13125f1cc272057d64b65',
    1: '7b1c38c9731d7354fb6072af6c5a6650',
    2: '5cbffa850922241d208c1758b1a156dc',
    3: '4b4b613b69e61bc1be3f82e7388937f5',
    4: '7fd380dced73721d820a9948b1a06108',
    5: 'f50f6c32ae08641129ac1700119304bc',
    6: '7a13d8a47c976a2a04b9f7e692b1e048',
    7: '3cf2b144cffb4f654f09eeea60c9668f',
    8: 'c9f8ee36c17399be6179b562e9e0af22'
};

var listOfBullshit = {
        'salad fingers spoons': 'https://www.youtube.com/watch?v=OWBFKL6H7rI',
        'charlie the unicorn': 'https://www.youtube.com/watch?v=CsGYh8AacgY',
        'Всё Равно - Морковь': 'https://www.youtube.com/watch?v=P8kkPISzrEg',
        'baaa': 'https://www.youtube.com/watch?v=WQO-aOdJLiw',
        'мир бобра': 'https://www.youtube.com/watch?v=k3rVaaI7XqU',
        'Двойной Фёдр - Грибы, отпустите меня!': 'https://www.youtube.com/watch?v=vqIvq9KmugU',
        'иисусья тряпка': 'https://www.youtube.com/watch?v=6pdYjcfctVw',
        'иисусьи сандали': 'https://www.youtube.com/watch?v=N9YmtlIk3VM',
        'narwhals': 'http://www.youtube.com/watch?v=ykwqXuMPsoc',
        'look at my horse': 'http://www.youtube.com/watch?v=GUl9_5kK9ts',
        'эйприл сиськи': 'http://www.youtube.com/watch?v=I-vfkporkQ0',
        'одинокий петух': 'https://www.facebook.com/video.php?v=857034744350960',
        'soviet mario': 'http://www.youtube.com/watch?v=Q_xQ-ns5whw',
        'red alert 3 soviet march': 'http://www.youtube.com/watch?v=0iOK3Echp78',
        'ENHANCED PLEASURE': 'http://www.youtube.com/watch?v=YWLLXFAiTcI',
        'smoke on the water japan version': 'http://www.youtube.com/watch?v=Tujga5JdP1M',
        'голубой вагон': 'http://www.youtube.com/watch?v=R0rLyAdNxZw',
        'meow': 'http://www.youtube.com/watch?v=QNwCojCJ3-Q',
        'Id like to teach': 'http://www.youtube.com/watch?v=QEPHLPmt914',
        'everyday i drinking': 'http://www.youtube.com/watch?v=QrU1hZxSEXQ',
        'Infornal Fuckъ - Конунг Олаф Моржовых Хер': 'http://www.youtube.com/watch?v=iFBU828ZzHE',
        'Mortal Kombat- Scorpion VS Noob Saibot': 'http://www.youtube.com/watch?v=HLyEmV98D3M',
        'Группа Ноль - Человек и кошка': 'http://www.youtube.com/watch?v=iLme_PlskEg',
        'BATMETAL': 'http://www.youtube.com/watch?v=qatmJtIJAPw',
        'What is love Jim Carrey': 'http://www.youtube.com/watch?v=jFnqQbtHeDE',
        'Сказка про Мышу': 'http://www.youtube.com/watch?v=IMSGGmSKJBM',
        'Сударь с котофеем': 'https://www.youtube.com/watch?v=6ujrFw3P5I8'
    },
    bullshitKeys = Object.keys(listOfBullshit);
