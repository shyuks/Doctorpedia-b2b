// import { setTimeout } from 'timers';

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
    res.sendFile(path.join(__dirname, './public/index3.html'));
});

app.get('/2', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index2.html'));
});

// app.get('/3', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/index3.html'));
// });

app.get('/domains', function(req, res) {
    res.sendFile(path.join(__dirname, './public/domains.html'));
});

app.get('/domains2', function(req, res) {
    res.sendFile(path.join(__dirname, './public/domains2.html'));
})

// MDContributor Routes
app.get('/mdcontributor', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-mdcontributor.html'))
});
app.get('/mdcontributor/register', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-mdcontributor-sub.html'));
})
app.get('/mdcontributor/documents', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-mdcontributor-documents.html'))
});

// MDInvestor Routes
app.get('/mdinvest', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-mdinvest.html'))
});
app.get('/mdinvest/register/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));
})
app.get('/mdinvest/documents', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/career-documents.html'))
});


// MDContributor forms
app.post('/mdcontributor/register', function(req, res) {

    console.log('req:body; ', req.body);
    var email = {
        emailAddress: '',
        emailLength: 0 
    };

    // var token = { 
    //     token: undefined,
    //     tokenLength: 0
    // };

    var info = {
        firstName: '',
        lastName: '',
        specialty: '',
        about: ''
    };

    // console.log('first name: ', req.body.firstName);
    // console.log('last name: ', req.body.lastName);    
    // console.log('profession: ', req.body.profession);        
    // console.log('email: ', req.body.email);
    // console.log('token: ', req.body.token);

    if (req.body.firstName !== undefined && req.body.lastName !== undefined) {
        info.firstName = req.body.firstName;
        info.lastName = req.body.lastName;
        info.specialty = req.body.profession;
        info.about = req.body.about
    }

    if (req.body.email !== undefined) {
        email.emailAddress = req.body.email;
        email.emailLength = req.body.email.length;
    };

    // if (req.body.token !== undefined) {
    //     token.token = req.body.token;
    //     token.tokenLength = req.body.token.length;
    // };

    // console.log('email2: ', email.emailAddress);
    // console.log('token2: ', token.token);

    if ( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.emailAddress)) {        

        sendmail({
            from: 'team@doctorpedia.com',
            to: 's.hong35@gmail.com',
            subject: 'New Potential CONTRIBUTOR, ' + info.firstName + ' ' + info.lastName,
            html: "Hello, " + "<br><br>" + 'A new CONTRIBUTOR is interested and requires contact.' + "<br><br>" +
                  "First Name: " + info.firstName + "<br>" +
                  "Last Name: " + info.lastName + "<br>" +
                  "Email: " + email.emailAddress + "<br>" +
                  "Specialty: " + info.specialty + "<br>" +
                  "About: " + info.about + "<br><br>" +
                  "Automated message from joindoctorpedia.com."
        }), function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
        }

        setTimeout(function() {
            return res.redirect('/mdcontributor');    
        }, 8000)

        // res.render('./public/templates/career-subscription.html');
        // res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));
        // res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));

    } 
    // else if (token.tokenLength > 5 && email.emailLength === 0) {
    //     return res.redirect('/mdinvest/documents');
        // res.sendFile(path.join(__dirname, './public/templates/career-documents.html'));
    // }   
})

// MDInvestor forms
app.post('/mdinvest/register', function(req, res) {

    console.log('investor req:body; ', req.body);
    var email = {
        emailAddress: '',
        emailLength: 0 
    };

    // var token = { 
    //     token: undefined,
    //     tokenLength: 0
    // };

    var info = {
        firstName: '',
        lastName: '',
        inviteCode: '',
    };

    // console.log('first name: ', req.body.firstName);
    // console.log('last name: ', req.body.lastName);    
    // console.log('profession: ', req.body.profession);        
    // console.log('email: ', req.body.email);
    // console.log('token: ', req.body.token);

    if (req.body.firstName !== undefined && req.body.lastName !== undefined) {
        info.firstName = req.body.firstName;
        info.lastName = req.body.lastName;
        info.inviteCode = req.body.inviteCode;
    }

    if (req.body.email !== undefined) {
        email.emailAddress = req.body.email;
        email.emailLength = req.body.email.length;
    };

    // if (req.body.token !== undefined) {
    //     token.token = req.body.token;
    //     token.tokenLength = req.body.token.length;
    // };

    // console.log('email2: ', email.emailAddress);
    // console.log('token2: ', token.token);

    // if ( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.emailAddress)) {        

        // sendmail({
        //     from: 'team@doctorpedia.com',
        //     to: email.emailAddress,
        //     subject: 'Welcome to Doctorpedia Investor Programme ' + info.firstName + " " + info.lastName,
        //     html: "Hello, " + info.firstName + " " + info.lastName + "<br><br>" + "Thank you so much for your interest in Doctorpedia, the worlds next medical technology playform. Looking at next steps, we'll need you to use our one time token to access our documents. If you have any additional questions, please feel free to reach out to our marketing managers (investor.relations@doctorpedia.com). <br><br> One time access unique token: " + Math.floor(Math.random()*90000) + 100 + "<br><br><br>" + "Best, <br> Jeremy Wosner"
        // }, function(err, reply) {
        //     console.log("error has occured")
        //     console.log(err && err.stack);
        //     console.dir(reply);
        // });

        sendmail({
            from: 'team@doctorpedia.com',
            to: 's.hong35@gmail.com',
            subject: 'New Potential INVESTOR ' + info.firstName + ' ' + info.lastName,
            html: "Hello, " + "<br><br>" + 'A new INVESTOR is interested and requires documentation.' + "<br><br>" +
                  "First Name: " + info.firstName + "<br>" +
                  "Last Name: " + info.lastName + "<br>" +
                  "Email: " + email.emailAddress + "<br>" +
                  "Invite Code: " + info.inviteCode + "<br><br>" +
                  "Automated message from joindoctorpedia.com."
        }), function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
        }

        setTimeout(function() {
            return res.redirect('/mdinvest');    
        }, 8000)

        // res.render('./public/templates/career-subscription.html');
        // res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));
        // res.sendFile(path.join(__dirname, './public/templates/career-subscription.html'));

    // } 
        // else if (token.tokenLength > 5 && email.emailLength === 0) {
        // return res.redirect('/mdinvest/documents');
        // res.sendFile(path.join(__dirname, './public/templates/career-documents.html'));
    // }   
})


app.post('/domains2', function(req, res, next) {

    console.log(req.body);
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phoneNumber;

    console.log('info: ', firstName)
    console.log('info: ', lastName)
    console.log('info: ', email)
    console.log('info: ', phone)
    

    if (firstName.length > 1 && lastName.length > 1 && email.length > 1 && phone.length > 1) {
        sendmail({
            from: 'team@doctorpedia.com',
            to: 's.hong35@gmail.com',
            subject: 'New Investor Lead: ' + firstName + " " + lastName,
            html: 'Here is a new lead: ' + phone + " and the email: " + email
        }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });
    }

    setTimeout(function() {
        return res.redirect('/domains2');    
    }, 3000)


})



app.listen(8080, function() {
    console.log('Listening On http://localhost:8080/');
});

// app.listen(8080, '192.241.231.251', function() {
//     console.log('Listening On http://192.241.231.251:8080/');
// });
