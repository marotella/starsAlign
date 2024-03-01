// import axios from 'axios';


async function fetchData() {
    try {
        const response = await fetch('http://localhost:4000/horoscope');
        console.log(response)
        const data = await response.json();
        const sign = data.prediction.split(',')[0];
        const horoscope = data.prediction;
        const number = data.number
        const color = data.color
        const mantra = data.mantra
        const remedy = data.remedy
        document.getElementById('sign').innerText = sign;
        document.getElementById('horoscope').innerText = horoscope;
        document.getElementById('number').innerText = number;
        document.getElementById('color').innerText = color;
        document.getElementById('mantra').innerText = mantra;
        document.getElementById('remedy').innerText = remedy;
    } catch (error) {
        console.error(error);
    }
}

fetchData();