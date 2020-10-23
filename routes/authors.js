const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (req, res) => {
    // By default, we search for all the authors
    let searchOptions = {}

    // Use the query string from the URI
    if (req.query.name != null && req.query.name !== '') {
        // Use a regular expression to perform the search
        // The i flag means it's case insensitve
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        // Get all the authors using mongoose and the search regular expression, if a valid search query was provided
        const authors = await Author.find(searchOptions)

        // We need to pass in the query so the input can use it as a value when the page is re-rendered after the search
        res.render('authors/index', {authors: authors, searchOptions: req.query})
    } catch {
        // Redirect user to home page if something goes wrong
        res.redirect('/')
    }
})

// New author route
router.get('/new', (req, res) => {
    // The new author page, according to the ejs code, requires an author model
    // Here we pass in an empty author since we're creating a new one on the new author page
    // But for the edit author page, which uses the same form field, we would like to initialize the name
    // input (text box) with the name of the author being edited
    // In the ejs code, we can pass in and access the 'author' variable via a json object
    res.render('authors/new', {author: new Author()})
})

// Create author route
router.post('/', async (req, res) => {
    // This route does not render, it creates (CRUD)
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        console.log(`Created author: ${newAuthor}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

module.exports = router
