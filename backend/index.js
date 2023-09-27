const express = require("express");
const app = express();
const cors = require("cors");
const { createSubmission } = require("./createSubmission");
const { Languages } = require("./Languages");
const mongoose = require('mongoose');
const codeModel = require('./codeModel');


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  console.log("backend worked");
  res.send("Welcome to backend");
});

// Sending all the available languages
app.get("/getLanguages", async (req, res) => {
  let languages = await Languages();
  console.log("Languages Fetched Successfully");
  res.send(languages);
});

app.get("/allCodes", async (req, res) => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/myCodeExecuter');
    let data = await codeModel.find();
    console.log("All codes Fetched Successfully\n");
    console.log(data[0]);
    data = JSON.stringify(data);
    res.send(data);
  }
  catch(e){
    console.log("error",e);
    res.send({err:'Error'});
  }
});

// Delete the code from the database with given id
app.delete("/deletecode/:_id", async (req, res) => {
  try{
    console.log("delete "+req.params._id);
    await mongoose.connect('mongodb://127.0.0.1:27017/myCodeExecuter');
    let data = await codeModel.deleteOne(req.params);
    console.log("deleted "+data);
    res.send(data);
  }
  catch(e){
    console.log("error",e);
    res.send({err:'Error'});
  }
});


// Update the code from the database with given id
app.put("/updatecode/:_id", async (req, res) => {
  try{
    var id = req.params._id;
    await mongoose.connect('mongodb://127.0.0.1:27017/myCodeExecuter');
    let data = await codeModel.updateOne(req.params, {$set: req.body});
    res.send({"Sucess":data});
  }
  catch(e){
    console.log("error",e);
    res.send({err:'Error'});
  }
});

// Getting the request to execute the code and return output
app.post("/", async (req, res) => {
  var code = JSON.parse(req.body.code);
  var language = parseInt(req.body.language);
  var input = JSON.parse(req.body.input);
  var title = JSON.parse(req.body.title);
  console.log("Connected to Server");
  let result = await createSubmission(code, language, input);
  try{
    if(result.status.description === "Accepted"){
        await mongoose.connect('mongodb://127.0.0.1:27017/myCodeExecuter');
        console.log("Connected To database");
        let data = new codeModel({
          title: title,
          language: language,
          input: input,
          code: code,
          output: result.stdout
        });
        await data.save();
        console.log("data saved in database");
    }
  }catch(e){
    console.log('Data not saved in database '+e);
  }
  res.send(result);
});

// Listening to 5500 port
app.listen(5500);

/*
    The error I faced during the program was, when I submitted code to API for submission, I received a token
    and immediately I send to token to API to get the output
    But Sometimes the code was not completed and still processing at API , so it given a output null
    and when I test the endpoint again at the website of the API , It gives correct output for that token
    So I thought why I was not able to get the correct output for this token,
    I double checked my fetch method for token, But nothing seems to be wrong,
    Then I justed the entire response on the console and checked line by line.
    At one line I saw a strange thing, The status was 200, Which means there were no error,
    but the status description was 'Processing' , Then it clicked in my mind that ,While i submitted token to 
    get result , The code was still running so it hasen't return any output.

    So to rectify that error, I made a while loop , and keep on hitting the API again and again with that token until
    the Status description was changed from 'Processing' to 'Submitted' or 'Error'.
*/
