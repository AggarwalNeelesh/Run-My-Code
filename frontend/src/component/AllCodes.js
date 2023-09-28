import React from 'react'
import { useState, useEffect } from "react";
import GetCode from './GetCode';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function AllCodes(props) {
  const [Codes, setCodes] = useState([]);
  // bool varible is used so that we fetch data from backend only once not multiple times
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if(bool===false){
      setBool(true);
      getAllCodes();
    }
  })
  
  async function deletecode(id){
    console.log("Delete Function Called "+id);
    // try{
    // console.log("delete "+id);
    // const response = await fetch(`http://localhost:5500/deletecode/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   });
    //     const result = await response.json(response);
    //     props.showAlert("Code Deleted Successfully", "success");
    //     getAllCodes();
    //   }
    //   catch(e){
    //     props.showAlert("Code Deletion failed, Unexpected Error", "danger");
    //   }
  }
  
  const getAllCodes = async () => {
    const response = await fetch("http://localhost:5500/allCodes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    try{
      const result = await response.json(response);
      setCodes(result.reverse());
      props.showAlert("All Codes Loaded Successfully", "success");
    }
    catch(e){
      props.showAlert("Codes fetching failed, Unexpected Error", "danger");
    }
  };
  if(Codes.length==0){
    return (
      <div class="container my-4">
        No Code Available for preview.
      </div>
    )
  }
  else{
    return (
      <>
        <div className='mx-4 my-4 '>
        <h4 className="my-4 mx-2" style={{color: props.mode === "dark" ? "white" : "black"}}>Preview Previous Codes :</h4>
          {
            Codes.map((code, i)=>{
              return <GetCode code={code} key={i} idx={i} mode={props.mode} deletecode={deletecode} showAlert={props.showAlert}/>
            })
          }
        </div>
      </>
    )
  }

  
}

export default AllCodes