const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()
let port = 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFileSync('log.txt', log + '\n')
    next()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.send({
        name: 'sander',
        age: 21
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        yeah: 'FUCKYEAH!'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}:..`)
})