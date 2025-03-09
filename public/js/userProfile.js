// Pop-up container toggle
function togglePopup() {
    document.querySelector("#image-upload").classList.toggle("active");
}

//----------------------------------------------------------------//

const username = document.URL.split('/').pop();

// Fetching User Data
fetchData();

async function fetchData() {
    try {
        const userValue = await fetch(`http://localhost:5000/api/v1/users/${username}`);
        const userData = await userValue.json();

        const name = document.querySelector("#name-value");
        const ratingsGiven = document.querySelector("#given-ratings");
        const ratingsReceived = document.querySelector("#received-ratings");


        name.textContent = userData.FirstName + " " + userData.LastName;
        ratingsGiven.textContent = userData.RatingsGiven;
        ratingsReceived.textContent = userData.RatingsReceived;



        const userImage = await fetch(`http://localhost:5000/api/v1/users/${username}/images`);
        const userImageData = await userImage.json();

        if (userImageData.images) {
            const image = document.querySelector("#image")
            image.style.backgroundImage = `url('../images/profilePic/${userImageData.images}')`;
        } else {
            image.style.backgroundImage = "none";
        }

    } catch (error) {
        console.error(error);
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

    await fetch(`http://localhost:5000/upload/${username}`, {
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
