const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const architectSchema = new Schema({
    // name: { type: String, required: true },
    // nationality: { type: String, required: true },
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    // buildings: [{ type: String, required: true }]
    
});

module.exports = mongoose.model('Architect', architectSchema);