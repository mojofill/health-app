const axios = require("axios");

console.log(process.env.REACT_APP_API_KEY);
const API_KEY = 'asdfa'

const options = {
  method: 'GET',
  url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
  params: {ingr: '1 large apple'},
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
    console.error(error);
});