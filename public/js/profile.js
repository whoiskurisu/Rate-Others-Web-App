// Pop-up container toggle
function togglePopup() {
  document.querySelector("#image-upload").classList.toggle("active");
}

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

// Since we have given the form's 'method' and 'action' attribute as 'post' and '/upload' respectively,
// it automatically calls the API. Hence, we do not need to implement the fetch function for it.
