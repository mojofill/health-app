import axios from "axios";

function Test() {
    console.log(process.env.REACT_APP_API_KEY);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const options = {
    method: 'GET',
    url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
    params: {ingr: '1 apple'},
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

    return <p>{process.env.REACT_APP_API_KEY}</p>
}

export default Test;