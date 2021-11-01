const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./controllers/user.controller');
const Excercise = require('./controllers/excercise.controller');

require('dotenv').config()

const { Schema } = mongoose;

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', User.create);
app.get('/api/users', User.index);
app.get('/api/users/:_id/logs', User.find);

app.post('/api/users/:_id/exercises', Excercise.create);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
