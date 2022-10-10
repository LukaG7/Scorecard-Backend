const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: String,
    holes: [{
        type: Schema.Types.ObjectId,
        ref: 'Hole'
    }],
    courseImg: String
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course;