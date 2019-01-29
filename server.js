const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// heroku port || local
const port = process.env.PORT || 3000

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFileSync('server.log', log + '\n')
    next()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    // res.send({
    //     name: 'sander',
    //     age: 22
    // })

    res.render('home.hbs')
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        projects: [{ title: 'title 1', body: 'body 1' }, { title: 'title 2', body: 'body 2' }]
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})