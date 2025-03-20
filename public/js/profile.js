// Pop-up container toggle
function togglePopup() {
    document.querySelector("#image-upload").classList.toggle("active");
}

//----------------------------------------------------------------//

// Onclick redirection to stats
document.querySelector('.rating').addEventListener('click', () => location.href = `/stats`)

// Fetching User Data
fetchData();

async function fetchData() {
    try {
        // Fetching User Data
        const userValue = await fetch(`http://localhost:5000/api/v1/users`);
        const userData = await userValue.json();

        const name = document.querySelector("#name-value");
        name.textContent = userData.FirstName + " " + userData.LastName;

        const usernameValue = document.querySelector("#uname-value");
        usernameValue.textContent = `@${userData.Username}`;

        // Fetching User Ratings
        const userRatingsValue = await fetch(`http://localhost:5000/api/v1/users/get-ratings-data`);
        const userRatingsData = await userRatingsValue.json();

        let receivedCount = 0;
        let userRating = 0;

        for (let i = 1; i <= 10; i++) {
            // Making sure the value is not 0
            if (userRatingsData.ratingReceived[i] > 0) {
                // Here i is the rating given and userData.ratingReceived[i] is the number of users who gave ratings
                userRating += i * userRatingsData.ratingReceived[i];
            }
            // To calculate the total number of users who gave ratings
            receivedCount += userRatingsData.ratingReceived[i];
        }
        // Average user rating = Total number of ratings received / Total number of users who gave ratings
        const avgRating = document.querySelector("#avg-rating");
        avgRatingValue = userRating / receivedCount;
        // For 0/0 case
        if (!avgRatingValue) {
            avgRating.textContent = "N/A";
        } else {
            avgRating.textContent = avgRatingValue.toFixed(2); // Upto 2 decimal places
        }

        // Fetching User Image
        const userImage = await fetch(`http://localhost:5000/api/v1/users/get-images`);
        const userImageData = await userImage.json();

        if (userImageData.images) {
            const image = document.querySelector("#image")
            image.style.backgroundImage = `url('../images/profilePic/${userImageData.images}')`;
        } else {
            image.style.backgroundImage = "none";
        }

    } catch (error) {
        console.log("Error fetching data");
    }
}

//----------------------------------------------------------------//

// Handling image previewing
const imageUpload = document.querySelector('#image-upload-input') // Form
imageUpload.addEventListener('change', function (event) {

    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        // Here the reader object's onload event has the .target.result property 
        // that gives the source of the image
        reader.onload = function (e) {
            const img = document.querySelector('#preview-image')
            img.style.backgroundImage = `url(${e.target.result})`; // Set image source
            img.style.backgroundSize = "cover";
        };

        reader.readAsDataURL(file); // Read file as a data URL
    }
})

//----------------------------------------------------------------//

// Handling image upload
async function handleFormSubmit(event) {

    event.preventDefault();

    const imageUpload = document.querySelector('#image-upload-input');

    // Making sure that the user selects a picture
    if (!imageUpload.files.length) {
        alert("Please select an image.");
        return;
    }

    const file = imageUpload.files[0];
    const formData = new FormData();
    formData.append("imageUpload", file); // Ensure this matches the field name in multer

    await fetch(`http://localhost:5000/upload`, {
        method: "POST",
        body: formData
    }).then(response => response.json())  // Wait for the response and convert to JSON
        .then(result => {
            if (result) {
                alert("File uploaded successfully!");
                location.reload(); // Refresh the page after successful upload
            } else {
                alert("Upload failed.");
            }
        })
}
