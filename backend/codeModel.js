const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    title: String,
    language:String,
    input: String,
    code: String,
    output: String
});

module.exports = mongoose.model('codes', codeSchema);