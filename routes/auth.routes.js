const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const User = require('../models/User.model');

router.post('/signup', (req, res, next) => {

    const { username, password } = req.body;
    console.log(req.body.username)

    User.create({
        username,
        password: bcryptjs.hashSync(password)
    })
    .then(createdUser => {
        console.log(createdUser)
        res.json({ message: 'POST working', user: createdUser });
    })
    .catch(err => console.log(err));
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({
        username: username
    })
    .then(foundUser => {
        console.log(foundUser);
        if(!foundUser){
            res.send('no matching user')
            return;
        }

        const isValidPassword = bcryptjs.compareSync(password, foundUser.password)

        if(!isValidPassword) {
            res.send('incorrect password')
            return;
    }
        res.json('success')
    })
    .catch(err => {
        res.send(err)
    })
});

module.exports = router;