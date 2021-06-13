const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    name: String,
    location: String,
    architectId: String
});

module.exports = mongoose.model('Building', buildingSchema);