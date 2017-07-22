const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 12345;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now  = new Date().toString();
  var log  = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })

  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

// app.get('/',(req, res) => {
//   //res.send('Hello Express');
//   //res.send('<h1>Hello Express<h1>');
//   res.send({
//     name: 'Amit',
//     hobbies: ['Movies','Songs','Cricket'],
//     experience: [{
//       company:'IGCS',
//       experience:'2.8 year'
//     },
//   {
//     company: 'Ready assist',
//     experience: '3 Months'
//   }]
//   });
// });

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about',(req,res) => {
  //res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    isSuccess: false,
    message: 'Unable to handle request'
  });
});

// app.listen(12345, () => {
//   console.log('Server is up on port 12345');
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
