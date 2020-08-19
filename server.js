const rp = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const express = require('express')
const app = express()
const port = 3000

app.get("/", async (req, res) => {
    try {
        const url = `https://www.facebook.com/alviss.isaac`;
        const data = await crawlingProfile(url);
        console.log(data)
        res.status(201).json({ message: "ok" });
    } catch (error) {
        res.json({ message: "fail", error: error });
    }
});
async function crawlingProfile(url) {
    const body = await axios.get(url);
    const $ = cheerio.load(body.data);
    let result = {};
    result.name = $("#fb-timeline-cover-name").text();
    let ulist = $("#pagelet_eduwork>div>._4qm1>.uiList.fbProfileEditExperiences._4kg._4ks");
    let edu = [];
    for (let i = 0; i < ulist.children.length; i++) {
        const education = $("#pagelet_eduwork>div>._4qm1>.uiList.fbProfileEditExperiences._4kg._4ks>._43c8._5f6p.fbEditProfileViewExperience.experience").text()
        edu.push({
            education,
        });
    }
    result.education = edu;
    result.current_city = $(".uiList.fbProfileEditExperiences._4kg._4ks >#current_city").text();
    result.hometown = $(".uiList.fbProfileEditExperiences._4kg._4ks >#hometown").text();
    console.log("result: " + result);
    return result;
}
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})
