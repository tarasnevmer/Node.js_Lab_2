const hbs = require("hbs");
const fs = require("fs");
const express = require("express");
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const citiesWeatherData = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

app.get('/', (req, res) => {
    res.render('index.hbs');
});


app.get('/weather', (req, res) => {
    res.render('weather', { cities: citiesWeatherData.cities });
});

app.get('/weather/:city', (req, res) =>{
    const cityName = req.params.city;
    const cityData = citiesWeatherData.cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
    if (cityData != null) {
        res.render('weather', { cityData: cityData, cities: citiesWeatherData.cities });
    } else {
        res.send('City not found');
    }
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});