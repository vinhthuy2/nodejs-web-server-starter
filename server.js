'use strict';
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
//

app.set('view engine', 'hbs');

// register middleware --> intercept every coming request with this callback
// next() to move on
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs',{});
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Welcome to Some Website',
        message: 'Here are some messages.',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send('Error Handle Found');
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});