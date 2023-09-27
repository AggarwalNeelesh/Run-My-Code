import React, {useEffect} from 'react'
function POTD(props) {
    useEffect(() => {
        props.showAlert("Reload Page to see Problem of the day", "warning");
    }, [])
    
  return (
    <div className="container my-4">
        <h3 className="my-4" style={{textAlign: "Center", color:props.mode==="dark"?"white":"black"}}>Problem of the Day</h3>
        <div class="se-widget container" data-widget="yScz5I7ynO"></div>
    </div>
  )
}

export default POTD