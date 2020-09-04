
const weatherform = document.querySelector("form")
const searchElement = document.querySelector("input")
const dataTag = document.getElementById("data")
const errorTag = document.getElementById("error")

weatherform.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;
    errorTag.textContent = "Loading.."

    fetch("/weather?address=" + location).then((resp) => {
        resp.json().then((data) => {
            if (data.error) {
                errorTag.textContent = data.error
            }

            else {
                dataTag.textContent = data.location
                errorTag.textContent = data.forecastdata

            }
        })
    })
})
