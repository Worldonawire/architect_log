const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const architectSchema = new Schema({
    name: String,
    nationality: String    
});

module.exports = mongoose.model('Architect', architectSchema);