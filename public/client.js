

let signUpForm = document.getElementById("sign-up");
let getHoroscopeBtn =document.getElementById("getHoroscope");
let loginForm = document.getElementById("login")
let currentUser = null;


async function fetchHoroscopeData(currentUser) {
    try {
        const response = await fetch(`http://localhost:4000/api/horoscope`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUser })
        });
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

async function createUser (event) {
    event.preventDefault();
    const first_name = document.getElementById("first-name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const sign = document.getElementById("sign").value;

    let userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        sign: sign
    }
    try{
        const response = await axios.post(`http://localhost:4000/api/users`, userData) 
    } catch (error) {
        console.error(error);
    }
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    // console.log(email)
    let loginData = {
        email: email
    }
    // console.log(loginData)

    try {
        const response = await axios.post(`http://localhost:4000/api/login`, loginData)
        console.log(response)
        currentUser = response.data
        fetchHoroscopeData()
    } catch (error){
        console.log(error)
    }

}
getHoroscopeBtn.addEventListener("click", fetchHoroscopeData)
signUpForm.addEventListener("submit", createUser)
loginForm.addEventListener("submit", loginUser)