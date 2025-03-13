// Icon close function
const unameCard = document.querySelector("#uname");
const username = document.URL.split('/').pop();
unameCard.addEventListener("click", () => location.href = `/userProfile/${username}`);

// Fetching User Data
fetchData();

async function fetchData() {

    const userValue = await fetch(`http://localhost:5000/api/v1/users/${username}/ratings-data`);
    let userData = await userValue.json();

    const usernameValue = document.querySelector("#uname-value");
    usernameValue.textContent = userData.username;

    let givenCount = 0; // Default value for the total number of people who were rated by the user
    let receivedCount = 0; // Default value for the total number of people who gave ratings to the user
    let userRating = 0;

    for (let i = 1; i <= 10; i++) {

        const generalRatingReceived = document.createElement('div');
        generalRatingReceived.className = "general-ratings";

        const generalRatingGiven = document.createElement('div');
        generalRatingGiven.className = "general-ratings";

        const wrapperReceived = document.querySelector(i <= 5 ? '#wrapper1' : '#wrapper2');
        const wrapperGiven = document.querySelector(i <= 5 ? '#wrapper3' : '#wrapper4');

        generalRatingReceived.innerHTML = `<span class="general-ratings-title">rated '${i}'</span>
                                    <span class="rating-value" id="received${i}"></span>`;
        wrapperReceived.append(generalRatingReceived);

        generalRatingGiven.innerHTML = `<span class="general-ratings-title">rated '${i}'</span>
                                 <span class="rating-value" id="given${i}"></span>`;
        wrapperGiven.append(generalRatingGiven);

        if (i == 1 || i == 10) {
            const specialRatingReceived = document.querySelector(`#received${i}`)
            const specialRatingGiven = document.querySelector(`#given${i}`)

            specialRatingReceived.classList.add('special-rating')
            specialRatingGiven.classList.add('special-rating')

        }

        const given = document.querySelector(`#given${i}`)
        const received = document.querySelector(`#received${i}`)

        received.textContent = userData.ratingReceived[i];
        given.textContent = userData.ratingGiven[i];
        
        // To calculate the total number of ratings received
        if (userData.ratingReceived[i] > 0) {
            // Here i is the rating given and userData.ratingReceived[i] is the number of users who gave ratings
            userRating += i * userData.ratingReceived[i];
        }
        
        // To calculate the total number of people who were rated by the user
        givenCount += userData.ratingGiven[i];
        // To calculate the total number of people who gave ratings to the user
        receivedCount += userData.ratingReceived[i];
    }
    const allGiven = document.querySelector('#all-given-value')
    const allReceived = document.querySelector('#all-received-value')

    allGiven.textContent = givenCount;
    allReceived.textContent = receivedCount;

    // Average user rating = Total number of ratings received / Total number of users who gave ratings
    const avgRating = document.querySelector("#avg-rating");
    avgRatingValue = userRating / receivedCount;
    // For 0/0 case
    if (!avgRatingValue) {
        avgRating.textContent = "N/A";
    } else {
        avgRating.textContent = avgRatingValue.toFixed(2); // Upto 2 decimal places
    }

}