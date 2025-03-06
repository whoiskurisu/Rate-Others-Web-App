const iconClose = document.querySelector(".icon-close");
// Icon close button
iconClose.addEventListener("click", () => location.href = "./");

document.querySelector(".form-box").addEventListener("submit", (event) => {
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
                window.location.href = `/home/${uname}`; // Redirect to homepage after successful login
            } else {
                alert(data.message);  // Show error message if login failed
            }
        });
});