const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holeSchema = new Schema({
    par: Number,
    number: Number,
    yardage: Number,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
});

const Hole = mongoose.model('Hole', holeSchema)

module.exports = Hole;