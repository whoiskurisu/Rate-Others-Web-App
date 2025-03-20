// Icon close button
const iconClose = document.querySelector(".icon-close");
iconClose.addEventListener("click", () => location.href = "./");

//----------------------------------------------------------------//

// Form handling for login
const form = document.querySelector('.form-box');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const uname = document.querySelector("#uname").value;
    const password = document.querySelector("#password").value;

    fetch("/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, password }),
        credentials: 'include',
    }).then(response => response.json())
        .then(data => {
            if (data.message == "Login successful") {
                window.location.href = `/home`; // Redirect to homepage after successful login
            } else {
                alert(data.message);  // Show error message if login failed
            }
        });
});