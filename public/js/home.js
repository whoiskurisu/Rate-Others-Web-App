const startRatingText = document.querySelector('#get-started-text');
startRatingText.addEventListener('click',() => {
    document.location.href = '/rate'
})

const userStats = document.querySelector('#userStats');
userStats.addEventListener('click',() => {
    const username = document.URL.split('/').pop();
    document.location.href = `/userStats/${username}` 
})

const userProfile = document.querySelector('#userProfile');
userProfile.addEventListener('click',() => {
    const username = document.URL.split('/').pop();
    document.location.href = `/userProfile/${username}` 
})