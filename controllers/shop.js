const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.render('shop/index.ejs', {users: users})
})

module.exports = router