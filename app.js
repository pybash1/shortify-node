const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '/public')));

let urls = { '1a2b3': 'https://example.com' }

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function generateString(length) {
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}

app.get("/", function (req, res) {
    res.render('index', { totalUrls: urls })
})

app.get('/:shortUrl', async (req, res) => {
    const shortId = req.params.shortUrl
    const longUrl = urls[shortId]

    if (longUrl == undefined) {
        res.sendStatus(404)
    }
    else {
        res.redirect(longUrl)
    }

    // res.send(`<h1>${longUrl}</h1>`)
    
    // res.send(`<!DOCTYPE html>
    // <html>
    //     <head>
    //         <meta http-equiv="refresh" content="0; url=${longUrl}>
    //     </head>
    // </html>`)
})

app.post("/", function(req, res) {
    let shortUrl = generateString(5)
    
    urls[shortUrl] = req.body.longUrl
    
    res.render('short', { shortifiedUrl: `Shortified URL - https://127.0.0.1:3000/${shortUrl}` })
})

app.listen(3000, function(){
    console.log("Server is running at port 3000");
})
