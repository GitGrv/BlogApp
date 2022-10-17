const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const { render } = require('ejs');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
const dbURI =
  'mongodb+srv://gaurav:Gaurav%40123@test.akvtxqd.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI, (err, result) => {
  if (err) console.log(err);
  else {
    app.listen(3000);
    console.log('connect to db');
  }
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'ABOUT PAGE' });
});
app.use('/blogs',blogRoutes);
app.use((req, res) => {
  
  res.status(404).render('404', { title: 'ERROR PAGE' });
});
