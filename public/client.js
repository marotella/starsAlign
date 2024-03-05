

let signUpForm = document.getElementById("sign-up");
let getHoroscopeBtn =document.getElementById("getHoroscope");
let loginForm = document.getElementById("login")
const signUpDisplayBtn = document.getElementById("signUpDisplay");
const logInDisplayBtn = document.getElementById("logInDisplay");
const updateDisplayBtn = document.getElementById("updateDisplay");
const logOutBtn = document.getElementById("logOut");

const signUpSection = document.getElementById("sign-up");
const loginSection = document.getElementById("login");
const horoscopeInfoSection = document.getElementById("horoscopeInfo");
const ratingInfoSection = document.getElementById("ratingInfo");

// Function to toggle section visibility
function toggleSection(section) {
    // Hide all sections
    signUpSection.style.display = "hide";
    loginSection.style.display = "hide";
    horoscopeInfoSection.style.display = "hide";
    ratingInfoSection.style.display = "hide";

    // Show the selected section
    section.style.display = "block";
}



async function fetchHoroscopeData(currentUser) {
    try {
        const userSign = currentUser.sign; 
        console.log(`This is the ${userSign}`);
        const response = await fetch(`http://localhost:4000/api/horoscope`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include' // Send credentials with the request
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch horoscope: ${response.statusText}`);
        }
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
        const response = await axios.post(`http://localhost:4000/api/login`, loginData, {withCredentials: true})
        console.log(response)
        currentUser = response.data
        console.log(currentUser)
        if (currentUser) {
            // await fetchHoroscopeData(currentUser)
            window.location.href = 'profile.html';

        } else {
            console.error("Current user is undefined")
        }
    } catch (error){
        console.log(error)
    }

}
getHoroscopeBtn.addEventListener("click", fetchHoroscopeData);
signUpForm.addEventListener("submit", createUser)
loginForm.addEventListener("submit", loginUser)

signUpDisplayBtn.addEventListener("click", function() {
    toggleSection(signUpSection);
});

logInDisplayBtn.addEventListener("click", function() {
    toggleSection(loginSection);
});

updateDisplayBtn.addEventListener("click", function() {
    // Add logic to show update profile section
});

