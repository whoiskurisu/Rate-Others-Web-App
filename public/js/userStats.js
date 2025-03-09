// Icon close function
const unameCard = document.querySelector("#uname");
const username = document.URL.split('/').pop();
unameCard.addEventListener("click", () => location.href = `/userProfile/${username}`);

// Fetching User Data
fetchData();

async function fetchData() {

    const userValue = await fetch(`http://localhost:5000/api/v1/users/${username}`);
    let userData = await userValue.json();

    const usernameValue = document.querySelector("#uname-value");
    usernameValue.textContent = userData.Username;

    let givenCount = 0;
    let receivedCount = 0;
    let userRating = 0;

    for (let i = 1; i <= 10; i++) {
        const given = document.querySelector(`#given${i}`)
        const received = document.querySelector(`#received${i}`)

        given.textContent = userData.RatingGiven[i];
        received.textContent = userData.RatingReceived[i]

        // To calculate the total number of ratings received
        if (userData.RatingReceived[i] > 0) {
            // Here i is the rating given and userData.RatingReceived[i] is the number of users who gave ratings
            userRating += i * userData.RatingReceived[i];
        }

        // To calculate the total number of users who were rated
        givenCount += userData.RatingGiven[i];
        // To calculate the total number of users who gave ratings
        receivedCount += userData.RatingReceived[i];
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