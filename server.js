const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n' ,(err) => {
    if (err) {
      console.log('unable to load');
    }
  })
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello EXpress!</h1>');
  res.send({
    name: 'Luke',
    likes: [
      'Biking',
      'Cites'
    ]
  });

res.render('home.hbs', {
    pageTitle: 'Home Page',
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
  res.send({
    errorMessage: 'Some error appears'
  });
});


app.listen(port, () => {
  console.log("Port " + port);
});
