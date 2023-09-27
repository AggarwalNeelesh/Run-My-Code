const axios = require("axios");

// Submitting the code, input and language to JUDGE0 CE API and getting a token
module.exports.createSubmission = async function (code, language, input) {
  //btoa() takes a string and encodes it to Base64.
  var encoded_code = btoa(code);
  var encoded_input = btoa(input);
  const options = {
    method: "POST",
    url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "d476650112mshce9dbca70399f75p1f18a8jsn398ffe13c414",
      "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
    },
    data: {
      language_id: language,
      source_code: encoded_code,
      stdin: encoded_input,
    },
  };
  // Variable to store output
  let output = "";
  try {
    // In response we got a token for sumitting the code
    const response = await axios.request(options);
    // Now we are sumitting the token again to get the output for the code
    output = await getSubmission(response.data.token);
    return output;
  } catch (e) {
    console.log("error occurred");
    output = {
      status: { description: "error" },
      stderr: `${e}\nInternal Error! Please try after some time`,
    };
  }
  return output;
};

// Submitting  token to get the output.
const getSubmission = async (token) => {
  // Incase any extra space was added
  token = token.trim();
  const options = {
    method: "GET",
    url: `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`,//Passing token
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "d476650112mshce9dbca70399f75p1f18a8jsn398ffe13c414",
      "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
    },
  };
  try {
    // Fetching the output of the code
    var response = await axios.request(options);
    // Sometimes code takes time to execute , so n response we get 'processing',
    // So we wait until any we receive concrete output 
    while (
      response.data.status.description == "Processing" ||
      response.data.status.description == "In Queue"
    ) {
      response = await axios.request(options);
    }
    return response.data;
  } catch (e) {
    return {
      status: { description: "error" },
      stderr: `${e}\nInternal Error! Please try after some time`,
    };
  }
};
