// Icon close function
const unameCard = document.querySelector("#uname");
const username = document.URL.split('/').pop();
unameCard.addEventListener("click", () => location.href = `/userProfile/${username}`);

// Fetching User Data
fetchData();

async function fetchData() {
    try {
        const userValue = await fetch(`http://localhost:5000/api/v1/users/${username}`);
        const userData = await userValue.json();

        const usernameValue = document.querySelector("#uname-value");
        usernameValue.textContent = userData.Username;

        // const avgRating = document.querySelector("#avg-rating");
        // avgRating.textContent = userData.AvgRating;


    } catch (error) {
        console.log("Error fetching data");
    }
}