import React from 'react'
import { useState, useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function GetCode(props){
  const [modifycode, setModifycode] = useState(true);
  const [id, setid] = useState(null);
  const [code, setcode] = useState("");
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");
  useEffect(() => {
    setid(props.code._id);
    setcode(props.code.code);
    setinput(props.code.input);
    setoutput(props.code.output);
  }, [])

  async function updatecode(){
    try{
    const response = await fetch(`http://localhost:5500/updatecode/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body : JSON.stringify({code: code, input:input, output: output, title: props.code.title, id:id, language:props.code.language})
      });
        const result = await response.json(response);
        props.showAlert("Code Updated Successfully", "success");
      }
      catch(e){
        props.showAlert("Code Updation failed, Unexpected Error", "danger");
      }
  }
  return (
    <Accordion className='mx-3 '>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header" 
        style={{
          backgroundColor: "#042743",
          color: "white",
          border: props.mode === "dark" ? "2px solid white" : "2px solid gery",
        }}
      >
        <Typography ><h5>{props.idx + 1}. {props.code.title}</h5></Typography>
      </AccordionSummary>
      <AccordionDetails style={{
          backgroundColor: props.mode === "dark" ? "grey" : "white",
          border: "2px solid grey"
        }}>
        <Typography >
          <div className="row">
            <div className="col">
                  <h5>Input :</h5>
                  <textarea
                  type="text"
                  className="form-control"
                  style={{
                      backgroundColor: props.mode === "dark" ? "#141414" : "white",
                      color: props.mode === "dark" ? "white" : "black",
                      border: "2px solid grey"
                  }}
                  name="input"
                  id="input"
                  value={input}
                  onChange={(e) =>
                    setinput(e.target.value == null ? null : e.target.value)
                  }
                  disabled={modifycode}
                  />
                  <br />
              </div>

              <div className="col">
                  <h5>Output :</h5>
                  <textarea
                  type="text"
                  className="form-control"
                  style={{
                      backgroundColor: props.mode === "dark" ? "#141414" : "white",
                      color: props.mode === "dark" ? "white" : "black",
                      border: "2px solid grey"
                  }}
                  name="input"
                  id="input"
                  value={output}
                  onChange={(e) =>
                    setoutput(e.target.value == null ? null : e.target.value)
                  }
                  disabled={modifycode}
                  />
                  <br />
              </div>
              </div>

              <h5> Code :</h5>

              <textarea
              className="form-control"
              style={{
                  backgroundColor: props.mode === "dark" ? "#141414" : "white",
                  color: props.mode === "dark" ? "white" : "black",
                  border: "2px solid grey"
              }}
              name="code"
              id="code"
              cols="100"
              rows="10"
              value={code}
              onChange={(e) =>
                setcode(e.target.value == null ? null : e.target.value)
              }
              disabled={modifycode}
              />
          <center>
            <ButtonGroup variant="outlined" className="my-2 mx-2" aria-label="outlined button group">
              <Button onClick={()=>{updatecode(props.code._id);}} hidden={modifycode} color="secondary">Update </Button>
              <Button onClick={()=>{setModifycode(!modifycode);}}>Modify</Button>
              <Button onClick={()=>props.deletecode(props.code._id)} color="secondary">Delete</Button>
            </ButtonGroup>
          </center>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
