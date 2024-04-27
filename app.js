require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 3000;


// Connect to DB
connectDB();    

app.use (express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.use(expressLayouts);
app.set('layout', './layouts/main');    
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));


app.listen(port, () => console.log(`App listening on port ${port}!`));