const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// getting-started.js
const mongoose = require('mongoose');
const config = require('./config/database')
mongoose.connect(config.database);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// checking db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

// requiring model schema
const userModel = require('./models/schema');

// requiring user route

const userRoute = require('./routes/user');

app.use('/', userRoute)


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3001, () => console.log('Example app listening on port 3001!'))