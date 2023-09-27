import React from "react";
// import { useState } from "react";
function ViewCode(props) {
//   const [code, setCode] = useState("");
//   const [title, setTitle] = useState("");
//   const [input, setInput] = useState("");
//   const [language, setLanguage] = useState("");

  const getCodes = async () => {
    const response = await fetch("http://localhost:5500/allCodes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    try{
      const result = await response.json(response);
    //   setLanguages(result);
    console.log(result);
      props.showAlert("Codes Loaded", "success");
    //   setBool(true);
    }
    catch(e){
      props.showAlert("Code fetching failed, Unexpected Error", "danger");
    }
  };

  return (
    <>
    <h1>=============================================</h1>
    <input type="text" onClick={getCodes} />
      <div class="mb-3">
        <div className="row">
          <div className="col">
            <h5>Language :</h5>
            <div
              name="setLanguage"
              id="setLanguage"
              style={{
                backgroundColor: props.mode === "dark" ? "#141414" : "white",
                color: props.mode === "dark" ? "white" : "black",
                width: "200px",
                height: "30px",
                textAlign: "center",
                borderRadius: "3px",
              }}
            ></div>
          </div>

          <div className="col">
            <h5>Input Entered:</h5>
            <textarea
              type="text"
              className="form-control"
              style={{
                backgroundColor: props.mode === "dark" ? "#141414" : "white",
                color: props.mode === "dark" ? "white" : "black",
                border: "2px solid grey",
              }}
              name="setInput"
              id="setInput"
            />
            <br />
          </div>
        </div>
        <label for="code" class="form-label">
          Code
        </label>
        <textarea
          type="text"
          style={{
            backgroundColor: props.mode === "dark" ? "#141414" : "white",
            color: props.mode === "dark" ? "white" : "black",
            border: "2px solid grey",
          }}
          class="form-control"
          id="code"
          readOnly
        ></textarea>
      </div>
    </>
  );
}

export default ViewCode;
