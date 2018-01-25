var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/connection.js');
var favicon = require('serve-favicon');
var sendmail = require('sendmail')();

var app = express();

app.use(favicon(path.join(__dirname, './public/images/favicon.png')))

// app.use(express.favicon(__dirname + './public/img/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/2', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index2.html'));
});

app.get('/mdinvest', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-mdinvest.html'))
});

app.get('/mdinvest/register/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));
})

app.get('/mdinvest/documents', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-documents.html'))
});

app.post('/mdinvest/register/', function(req, res) {

    var email = {
        emailAddress: '',
        emailLength: 0 
    };
    var token = { 
        token: undefined,
        tokenLength: 0
    };
    
    console.log('email: ', req.body.email);
    console.log('token: ', req.body.token);

    if (req.body.email !== undefined) {
        email.emailAddress = req.body.email;
        email.emailLength = req.body.email.length;
    };

    if (req.body.token !== undefined) {
        token.token = req.body.token;
        token.tokenLength = req.body.token.length;
    };

    console.log('email2: ', email.emailAddress);
    console.log('token2: ', token.token);

    if ( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.emailAddress) && token.token === undefined) {

        console.log('afasdjfalksjdfklasdf');
        sendmail({
            from: 'team@doctorpedia.com',
            to: email.emailAddress,
            subject: 'Welcome to Doctorpedia Investor Programme',
            html: 'One time access unique token: 872923'
        }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });

        res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));

    } else if (token.tokenLength > 5 && email.emailLength === 0) {
        return res.redirect('/mdinvest/documents');
        // res.sendFile(path.join(__dirname, './public/templates/career-documents.html'));
    }   

})



app.listen(8080, function() {
    console.log('Listening On http://localhost:8080/');
});

// app.listen(8080, '192.241.231.251', function() {
//     console.log('Listening On http://192.241.231.251:8080/');
// });
