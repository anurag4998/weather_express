const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { report } = require("process")
const geocode = require("../utils/geocode")
const forecast = require("../utils/forecast")

const app = express()

//define paths for express config
const dirpath = path.join(__dirname, "../public")
const viewpath = path.join(__dirname, "/templates/views")
const partialspath = path.join(__dirname, "/templates/partials")

//set up handlebar engine and views location
app.set("view engine", "hbs")
app.set("views", viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(dirpath))


app.get("", (req, resp) => {
    resp.render("index", {
        title: "Weather App",
        name: "Anurag "
    })
})

app.get("/about", (req, resp) => {
    resp.render("about", {
        title: "About",
        name: "Anurag "

    })
})

app.get("/help", (req, resp) => {
    resp.render("help", {
        title: "Help",
        name: "Anurag "

    })
})

app.get("/weather", (req, resp) => {
    if (!req.query.address) {
        return resp.send({
            error: "Enter a search parameter to get started"
        })
    }

    geocode(req.query.address, (error, { long, lat, location } = {}) => {

        if (error) {
            return resp.send({
                error
            })
        }

        forecast(long, lat, (error, forecastdata) => {
            if (error) {
                return resp.send({
                    error
                })
            }

            return resp.send({
                forecastdata,
                location,
                address: req.query.address
            })
        })
    })


})


app.get("/help/*", (req, res) => {
    res.render("helpnotfound", {
        title: "help page not found",
        name: "Anurag"
    })
})

app.get('*', (req, resp) => {
    resp.render("notfound", {
        title: "404 not found",
        name: "Anurag"
    })
})


app.listen(3000, () => {
    console.log("Up on port 3000")
})