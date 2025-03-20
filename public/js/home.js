// Redirecting user to respective pages on click
const startRatingText = document.querySelector('#get-started-text');
startRatingText.addEventListener('click', () => {
    document.location.href = `/rate`
})

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', () => {

    fetch('/logout', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            window.location.href = '/login'; // Redirect to login page
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
})

const stats = document.querySelector('#stats');
stats.addEventListener('click', () => {
    document.location.href = `/stats`
})

const profile = document.querySelector('#profile');
profile.addEventListener('click', () => {
    document.location.href = `/profile`
})

