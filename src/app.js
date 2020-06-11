// Required library packages
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");
const { geoCode, geoLocation } = require("./utils/utils");
const mqtt = require("./utils/mqtt");

// Express app, and path initialisation  
const app = express();
const port = process.env.PORT || 3000;
const viewDirectory = path.join(__dirname,"../templates/view")
const publicDirectory = path.join(__dirname, "../public");
const partialDirectory = path.join(__dirname, "../templates/partials");
// console.log(publicDirectory)

// View-engine and views
app.set("view engine", "hbs");
app.set("views", viewDirectory);
hbs.registerPartials(partialDirectory);

// Static templates
app.use(express.static(publicDirectory));

// Routes 
app.get("/", (req, res) => {
    res.render("index", {
        name: "Home"
    })
});

app.get("/about", (req, res) => {
    res.render("about", {
        name: "About you"
    })
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Get Help From Here"
    })
});

app.get("/weather", (req, res) => { 
    if(req.query.address){
        geoCode(req.query.address, (error, response) => {
            if(error){
                return res.send({error});
            }

            const { lat, lon } = response;
            geoLocation(lat, lon, (error, response) => {
                const { lat, lon, name, current } = response;
                if(error){
                   return res.send({error}); 
                }
                // console.log(current);
                res.send({
                    Latitude: lat,
                    Longitude: lon,
                    Name: name,
                    current
                });
            });
        });
    }
});

app.post("/:status", (req, res) => {
    let status = false;
    const device = new mqtt("mqtt://test.mosquitto.org");
    if(req.params.status === "on"){
        status = true;
    } else if (req.params.status === "off"){
        status = false;
    }
    device.changeState("light", "mobile", status);
    res.status(201).send({
        message: "Viola!"
    });
});

app.use((req, res) => {
    res.send({error:"ERROR"});
})

// Server port forwarding 
app.listen(port, () => {
    console.log(chalk.green(`Server is up and running at port ${port}!`));
});




