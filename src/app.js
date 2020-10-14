const path = require("path")
const express = require("express")
const hbs = require('hbs')
const { send } = require("process")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs") // for templating
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Ilya"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Ilya"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "Example message",
        title: "Help page",
        name: "Ilya"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "Error with thee adress"
        })
    } else {
        geocode.geocode(req.query.adress, (error, data) => {
            if (error) {
                res.send({ error })
            } else {
                forecast.forecast(data, (error, forecastData) => {
                    if (error) {
                        return console.log(error)
                    }
                    res.send({
                        location: data.location,
                        temperature: forecastData,
                        feelsLike: forecastData.feelsLike
                    })
                    
                })
            }
            
        })
    }
})



app.get("/products", (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    } 

    res.send({
        products: []
    })
})

app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help page not found",
        name: "Ilya"
    })
})

app.get("*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Ilya"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})