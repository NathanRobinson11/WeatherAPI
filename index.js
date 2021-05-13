const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const getWeather = require('./lib/getWeather');

const app = express();

app.engine('hbs', hbs({
    extname:'.hbs'
}));

app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.render('index')
});

app.post('/', async (req, res) =>{
    let {city, countryCode} = req.body;
    let data = await getWeather(city, countryCode);
    console.log(data)
    if(data.message == "city not found"){
        data.name = "Invalid Input"
    }

    res.render('index', {data});
});

app.listen(3000, () =>{
    console.log("Listening to port 3000")
});