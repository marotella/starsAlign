

let signUpForm = document.getElementById("sign-up");
let getHoroscopeBtn = document.getElementById("getHoroscope");
let loginForm = document.getElementById("login-form")


const signUpDisplayBtn = document.getElementById("signUpDisplay");
const logInDisplayBtn = document.getElementById("logInDisplay");
const updateDisplayBtn = document.getElementById("updateDisplay");
const logOutBtn = document.getElementById("logOut");
const ratingBtn = document.getElementById("rating-button")


const signUpSection = document.getElementById("sign-up");
const loginSection = document.getElementById("login-section");
const horoscopeInfoSection = document.getElementById("horoscope-info");
const ratingInfoSection = document.getElementById("rating-info");
const profileSection = document.getElementById("profile-section");
const averageRating = document.getElementById("average-rating");



async function createUser(event) {
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
    try {
        const response = await axios.post(`http://localhost:4000/api/users`, userData)
    } catch (error) {
        console.error(error);
    }
};

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    console.log(email)
    let loginData = {
        email: email
    }
    console.log(loginData)

    try {
        const response = await axios.post(`http://localhost:4000/api/login`, loginData, { withCredentials: true })
        console.log(response)
        currentUser = response.data
        console.log(currentUser)
        if (currentUser) {
            await setProfileAndHoroscopeData(currentUser); // Fetch both profile and horoscope data after login
            await getHoroscopeRating(currentUser);
        } else {
            console.error("Current user is undefined")
        }
    } catch (error) {
        console.log(error)
    }

};

async function logoutUser() {
    try{
        const response = await axios.delete('http://localhost:4000/api/logout', {
            withCredentials: true})
            console.log(response)
    }catch (error){
        console.error(error);
    }
}

async function fetchHoroscopeData(currentUser) {
    try {
        const userSign = currentUser.sign;
        console.log(`This is the ${userSign}`);
        const response = await axios.get(`http://localhost:4000/api/horoscope`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log(response)
        const data = await response.data;
        const sign = data.sign
        const horoscope = data.general;
        // const number = data.number
        // const color = data.color
        // const mantra = data.mantra
        // const remedy = data.remedy
        document.getElementById('sign').innerText = sign;
        document.getElementById('horoscope').innerText = horoscope;
        // document.getElementById('number').innerText = number;
        // document.getElementById('color').innerText = color;
        // document.getElementById('mantra').innerText = mantra;
        // document.getElementById('remedy').innerText = remedy;
    } catch (error) {
        console.error(error);
    }
};

async function setProfileData(currentUser) {
    document.getElementById('currentUserName').innerText = `Hi, ${currentUser.first_name}! Let's see what the stars have in store for you!`;
    document.getElementById('currentUserSign').innerText = `Your astrological sign is, ${currentUser.sign}!`
};

async function setProfileAndHoroscopeData(currentUser) {
    await setProfileData(currentUser); // Populate profile section
    await fetchHoroscopeData(currentUser); // Populate horoscope info
};

async function rateHoroscope(rating) {

    try {
        const response = await axios.post(
            `http://localhost:4000/api/rating`,
            { rating: rating },
            { withCredentials: true }
        );
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

async function getHoroscopeRating(currentUser) {
    try {
        const response = await axios.get(
            `http://localhost:4000/api/rating`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log(response);
        averageRating.innerText = `Your Stars Align horoscope accuracy rating is: ${response.data.roundedAverageRating}`;
    } catch (error){
        console.error(error);
    }
};

getHoroscopeBtn.addEventListener("click", fetchHoroscopeData);
signUpForm.addEventListener("submit", createUser);
loginForm.addEventListener("submit", loginUser);
ratingBtn.addEventListener("click", async (event) => {
        const rating = document.querySelector('input[name="rating"]:checked').value;
        console.log(rating);
        if (rating) {
            console.log(rating); // Check if the value is correctly retrieved
            await rateHoroscope(rating);
        } else {
            console.error("Rating not captured");
        }
    }
);
logOutBtn.addEventListener("click", logoutUser)