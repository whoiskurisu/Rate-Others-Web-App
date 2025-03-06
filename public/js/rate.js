// const rootDir = window.location.origin; //server url
// let IMAGE_URLS = [];
// let img_index = 0;
// let total_imgs = 0;
// let page_index = 1;

// let bool;

// window.onload = function () {
//   getImageUrls().then(loadIMG());
// };

// // handles fetching of image URLs
// async function getImageUrls(n = 5, page = 1) {
//   apicall("sendImgURIs").then((resp) => {
//     // get the image URLs
//     console.log("Gettingnew img urls");
//     IMAGE_URLS = resp.imgURIs;

//     // set some variables
//     total_imgs = IMAGE_URLS.length;
//     console.log(total_imgs);
//   });
// }

// // handles the indexing of images and paging
// // fetches new URLs as required
// async function checkImgIndex(direction) {
//   //right = true  and left =false
//   if (direction) {
//     //right btn
//     console.log(img_index);
//     if (img_index == total_imgs - 1) {
//       //end of img bufferr
//       page_index += 1;
//       getImageUrls((page = page_index));
//       console.log("all img viewd", total_imgs);
//       img_index = 0;
//     } else {
//       img_index += 1;
//     }
//   } else {
//     //left btn
//     console.log(img_index);
//     if (img_index == 0) {
//       //beginning of img bufferr
//       if ((page_index == 1) & (img_index == 0)) {
//         alert("you are at the very beginning . NO LEFT!");
//         return;
//       } else {
//         page_index -= 1;
//         getImageUrls((page = page_index));
//         img_index = total_imgs - 1;
//       }
//     } else {
//       img_index = img_index ? img_index - 1 : 0; //prevent index from going negative
//     }
//   }
// }

// // handles image change events & retieving of image data and showing them
// async function loadIMG() {
//   // show images
//   try {
//     const image = document.querySelector("#image");
//     image.style.backgroundImage = `url("../../uploads/cat.jpg")`; // initial image

//     const buttonRight = document.querySelector("#right-arrow");
//     const buttonLeft = document.querySelector("#left-arrow");

//     buttonRight.addEventListener("click", rightBtn);
//     buttonLeft.addEventListener("click", leftBtn);

//     function rightBtn() {
//       checkImgIndex(true).then(() => {
//         image.style.backgroundImage = `url("${rootDir}/uploads/${IMAGE_URLS[img_index]}")`;
//         console.log(
//           "right",
//           `${img_index}`,
//           `url("${rootDir}/uploads/${IMAGE_URLS[img_index]}")`
//         ); //DEV
//       });
//     }

//     function leftBtn() {
//       checkImgIndex(false).then(() => {
//         image.style.backgroundImage = `url("${rootDir}/uploads/${IMAGE_URLS[img_index]}")`;
//         console.log(
//           "right",
//           `${img_index}`,
//           `("${rootDir}/uploads/${IMAGE_URLS[img_index]}"`
//         ); // DEV
//       });
//     }
//   } catch (error) {
//     console.log("Error");
//   }
// }

// // FIXME want to import this function from script.js
// // call the api and send commands and data (clien-side)
// async function apicall(func, args = null) {
//   // send request
//   let reqData = {
//     method: "POST",
//     header: "application/json",
//     body: JSON.stringify({ func: func, args: args }),
//   };

//   return fetch(`${window.location.origin}/privAPI`, reqData)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("REsponse wasnt OK");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // parse json
//       // TODO check status

//       return data;
//     })
//     .catch((error) => {
//       console.log("Fetcching error", error);
//       throw error;
//     });
// }

const value = document.querySelector("#rating-value");
const input = document.querySelector(".slider");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

window.onload = function() {
    loadImage();
  };

function loadImage() {
    fetch("http://localhost:5000/random-image")
    .then(response => response.json())
    .then(data => {
      if (data.imageUrl) {
        const image = document.getElementById("image");
        image.style.backgroundImage = `url('${data.imageUrl}')`
        image.style.backgorundSize = 'cover'  
      }
    })
    .catch(error => console.error("Error fetching image:", error));
};