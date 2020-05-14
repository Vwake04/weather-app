console.log("Hello World")

fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});


// fetch("http://localhost:3000/weather?address=Diu India").then(res => {
//     res.json().then(data => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.Longitude,data.Latitude,data.Name);
//         }
//     });
// });

const locationText = document.querySelector("input");
const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchAddress = locationText.value;
    fetch("http://localhost:3000/weather?address=" + searchAddress ).then(res => {
        res.json().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.Longitude,data.Latitude,data.Name);
            }
        });
    });
})