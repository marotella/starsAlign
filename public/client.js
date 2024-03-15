
//FORMS
let signUpForm = document.getElementById("sign-up");
let getHoroscopeBtn = document.getElementById("getHoroscope");
let loginForm = document.getElementById("login-form")

// BUTTONS/LINKS
const signUpDisplayBtn = document.getElementById("signUpDisplay");
const logInDisplayBtn = document.getElementById("logInDisplay");
const updateDisplayBtn = document.getElementById("updateDisplay");
const logOutBtn = document.getElementById("logOut");
const ratingBtn = document.getElementById("rating-button")

//SECTIONS
const userSection = document.getElementById("user-section");
const dataSection = document.getElementById("data-section");
const signUpSection = document.getElementById("sign-up");
const loginSection = document.getElementById("login-section");
const horoscopeInfoSection = document.getElementById("horoscope-info");
const ratingInfoSection = document.getElementById("rating-info");
const profileSection = document.getElementById("profile-section");

//ELEMENTS 
const averageRating = document.getElementById("average-rating");
const sign = document.getElementById("sign");


//Toggles Dispaly for User Authentication 
function toggleSections() {
    userSection.style.display = userSection.style.display === "none" ? "flex" : "none";
    dataSection.style.display = dataSection.style.display === "flex" ? "none" : "flex";
}

function toggleRating() {
    ratingInfoSection.style.display = ratingInfoSection.style.display === "flex" ? "none" : "flex"

}

//Creates a user for the platform
async function createUser(event) {
    event.preventDefault();
    const first_name = document.getElementById("first-name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const sign = document.getElementById("user-sign").value;

    let userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        sign: sign
    }
    try {
        const response = await axios.post(`http://localhost:4000/api/users`, userData)
        alert("Your account was successfully created! Log in to see if your Stars Align!")
    } catch (error) {
        console.error(error);
    }
};

//Logs in a user and navigates to the profile/data section.
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
            await setProfileAndHoroscopeData(currentUser); 
            await getHoroscopeRating(currentUser);
            toggleSections(); 

        } else {
            console.error("Current user is undefined")
        }
    } catch (error) {
        console.log(error)
    }

};

// Ends the user session 
async function logoutUser() {
    try{
        const response = await axios.delete('http://localhost:4000/api/logout', {
            withCredentials: true})
            console.log(response)
            toggleSections(); 

    }catch (error){
        console.error(error);
    }
}

//Retrieves horoscope data from the API
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
        document.getElementById('user-sign').innerText = userSign.toUpperCase();
        document.getElementById('horoscope').innerText = horoscope;
    } catch (error) {
        console.error(error);
    }
};

//Organizes dispalying the profile data 
async function setProfileData(currentUser) {
    document.getElementById('currentUserName').innerText = `Hi, ${currentUser.first_name}! Let's see what the stars have in store for you!`;
    document.getElementById('currentUserSign').innerText = `Your astrological sign is, ${currentUser.sign.toUpperCase()}!`
};

// Calls the necessary data for the current users profile. 
async function setProfileAndHoroscopeData(currentUser) {
    await setProfileData(currentUser); 
    await fetchHoroscopeData(currentUser); 
};

// Rates the horoscope for the day and updates the average rating.
async function rateHoroscope(rating, currentUser) {

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

//Retrieves average rating for user and displays in the profile
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


// EVENT LISTENERS
signUpForm.addEventListener("submit", createUser);
loginForm.addEventListener("submit", loginUser);
ratingBtn.addEventListener("click", async (event) => {
        const rating = document.querySelector('input[name="rating"]:checked').value;
        console.log(rating);
        if (rating) {
            console.log(rating); 
            await rateHoroscope(rating);
            await getHoroscopeRating(currentUser); // Call getHoroscopeRating after rating is submitted
            toggleRating()

        } else {
            console.error("Rating not captured");
        }
    }
);
logOutBtn.addEventListener("click", logoutUser, toggleRating)


