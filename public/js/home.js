// Redirecting user to respective pages on click
const startRatingText = document.querySelector('#get-started-text');
startRatingText.addEventListener('click',() => {
    document.location.href = `/rate`
})

const stats = document.querySelector('#stats');
stats.addEventListener('click',() => {
    document.location.href = `/stats` 
})

const profile = document.querySelector('#profile');
profile.addEventListener('click',() => {
    document.location.href = `/profile` 
})