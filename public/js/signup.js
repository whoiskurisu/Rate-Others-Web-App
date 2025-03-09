// Icon close function
const iconClose = document.querySelector(".icon-close");
iconClose.addEventListener("click", () => location.href = "./");

//----------------------------------------------------------------//

// Form handling for sign up
const form = document.querySelector('#form');

form.addEventListener('submit', event => {

    event.preventDefault();

    // Selecting values to send in req.body through POST method
    const fname = document.querySelector('#fname').value.trim();
    const lname = document.querySelector('#lname').value.trim();
    const uname = document.querySelector('#uname').value.trim().toLowerCase();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const cpassword = document.querySelector('#cpassword').value;
    const initialRating = 0;

    const data = {
        'FirstName': fname,
        'LastName': lname,
        'Username': uname,
        'Email': email,
        'Password': password,
        'RatingsGiven': initialRating,
        'RatingsReceived': initialRating,
    };

    if (password != cpassword) {
        alert("Passwords do not match")
        return;
    }

    fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // We have defined res.json with success: true
            if (data.message == "Success") {
                alert("Signed up successfully"); // Pop up for successful sign up
                window.location.href = '/login'; // Redirect on the client side
            } else {
                alert(data.message)
            }
        })
        .catch(() => console.log("ERROR"));
}
)