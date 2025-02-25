const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

module.exports = router

router.get('/', async (req, res) => {
    try {
        res.render('games/index.ejs')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})