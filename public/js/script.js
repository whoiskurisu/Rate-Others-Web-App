

// // call the api and send commands and data (clien-side)
// export async function apicall(func, args = null) {
//     // send request
//     let reqData = {
//         method: "POST",
//         header: "application/json",
//         body: JSON.stringify({ "func": func, "args": args })
//     }

//     return fetch('./privAPI', reqData).then(response => {
//         if (!response.ok) {
//             throw new Error("REsponse wasnt OK");
//         }
//         return response.json();
//     }).then(data => {
//         console.log(data)
//         // parse json
//         // TODO check status

//         return data;
//     }).catch(error => {
//         console.log("Fetcching error", error);
//         throw error;
//     })
// }
