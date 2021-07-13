const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    name: String,
    location: String,
    architectId: String
    // name: { type: String, required: true },
    // location: { type: String, required: true },
    // architectId: { type: String, required: true }
});

module.exports = mongoose.model('Building', buildingSchema);