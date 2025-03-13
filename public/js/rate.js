// Fetching data onload
window.onload = function () {
  loadImage();
};

async function loadImage() {
  const username = document.URL.split('/').pop();
  const ratedUsersData = await fetch(`http://localhost:5000/api/v1/users/${username}/ratings-data`);
  const ratedUsersJSON = await ratedUsersData.json();

  console.log(ratedUsersJSON.ratedUsers)


  fetch(`http://localhost:5000/api/v1/users/${username}/random-image`)
    .then(response => response.json())
    .then(data => {
      // Getting the username from the image url
      const username = data.imageUrl.split('/').pop().split('-')[0];
      // If the user has already been rated then load another image
      if (ratedUsersJSON.ratedUsers.includes(username)) {
        loadImage();
      } 
      // If the user has not been rated then load fetched image
      else {
        const image = document.getElementById("image");
        image.style.backgroundImage = `url('${data.imageUrl}')`
        image.style.backgorundSize = 'cover'
      }
    })
    .catch(error => console.error("Error fetching image:", error));
};

//----------------------------------------------------------------//

// Adding rating value to slider
const value = document.querySelector("#rating-value");
const input = document.querySelector(".slider");
value.textContent = `${input.value}/10`;
input.addEventListener("input", (event) => {
  value.textContent = `${event.target.value}/10`;
});

//----------------------------------------------------------------//

// Rating function
function rateSubmit() {
  const image = document.getElementById("image");
  const imageURL = image.style.backgroundImage
  const SentTo = imageURL.split('/').pop().split('-')[0];
  const SentBy = document.URL.split('/').pop();

  const data = {
    'sentBy': SentBy,
    'sentTo': SentTo,
    'ratingGiven': value.textContent.split('/')[0],
    'ratingReceived': value.textContent.split('/')[0],
  };

  fetch("http://localhost:5000/api/v1/rate", {
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
      if (data.success) {
        alert("Rating given successfully."); // Pop up for successful rating given and received
        location.reload(); // Reload page after giving rating (Ensure the same picture is not shown again)
      } else {
        alert("Error while rating.")
      }
    })
    .catch(() => console.log("ERROR"));
}