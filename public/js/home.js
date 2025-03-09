const username = document.URL.split('/').pop();

// Redirecting user to respective pages on click
const startRatingText = document.querySelector('#get-started-text');
startRatingText.addEventListener('click',() => {
    document.location.href = `/rate/${username}`
})

const userStats = document.querySelector('#userStats');
userStats.addEventListener('click',() => {
    document.location.href = `/userStats/${username}` 
})

const userProfile = document.querySelector('#userProfile');
userProfile.addEventListener('click',() => {
    document.location.href = `/userProfile/${username}` 
})