import { useState } from "react";
import Alert from "./component/Alert";
import CodeExecution from "./component/CodeExecution";
import Navbar from "./component/Navbar";
import AllCodes from "./component/AllCodes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import ContactUs from "./component/ContactUs";


function App() {
  const [mode, setMode] = useState("light"); // whether dark mode is enabled or not
  const [alert, setAlert] = useState(null); // alert is an object
  // type : danger, success, primary ...
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode Enabled", "light");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark Mode Enabled", "dark");
    }
  };
  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} title="MyCodeExecuter" toggleMode={toggleMode} />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<CodeExecution mode={mode} showAlert={showAlert} />}/>
          <Route path="/allCodes" element={<AllCodes mode={mode} showAlert={showAlert}/>} />
          <Route path="/login" element={<Login mode={mode} showAlert={showAlert}/>} />
          <Route path="/register" element={<Register mode={mode} showAlert={showAlert}/>} />
          <Route path="/contact" element={<ContactUs mode={mode} showAlert={showAlert}/>} />
          {/* If None of the path matches , then it will show the default homepage */}
          <Route path="*" element={<CodeExecution mode={mode} showAlert={showAlert} />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
