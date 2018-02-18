const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {

  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  })

  next()

})

app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Nice to meet you!'
  })
})


app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMenssage: 'Unable to furfil this request'})
})

app.listen(port);
