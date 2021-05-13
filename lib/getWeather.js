const fetch = require('node-fetch');
const fs = require('fs');

const getWeather = async (city, countryCode) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.API_KEY}`
    let data = await fetch(url);
    data = await data.json();
    return data;
}

module.exports = getWeather;