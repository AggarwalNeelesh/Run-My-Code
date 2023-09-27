const mongoose = require('mongoose');
module.exports.connectDatabase = async function () {
    await mongoose.connect('mongodb://localhost:27017/myCodeExecuter');
    const codeSchema = new mongoose.Schema({
        title: String,
        language:String,
        input: String,
        code: String,
        output: String
    });
    console.log("Connected To database");
    const codeModel = mongoose.Model('codes', codeSchema);
    return codeModel;
}