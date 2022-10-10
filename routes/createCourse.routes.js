const express = require('express')
const router = express.Router();

const createCourse = require('../models/createCourse.model');

router.post('/createcourse', (req, res, next) => {
    const { courseName, holes, parForEachHole, courseImg } = req.body;
    console.log(req.body)

    createCourse.create({
        courseName,
        holes,
        parForEachHole,
        courseImg
    })
    .then(createdCourse => {
        console.log(createdCourse)
        res.json({ message: 'POST works', createCourse: createdCourse })
    })
    .catch(err => console.log(err));
})

module.exports = router;
