import './Components/StaffApp.css'
import StaffApp from './Components/StaffApp'
import {useState,useEffect} from 'react';
import React from 'react';
import axios from 'axios'

function App() {
  const [staffDetails, setStaffDetails] = useState([])
  const [date, setDate] = useState( Date())

  useEffect(()=>{
    axios
    .get("https://sanjayrht.github.io/staff-app-api/staffDetails.json")
    .then((res) => {
      setStaffDetails(res.data)
      // console.log(res.data.staffDetails)
    })
    .catch(error => {
      console.log(error)
    })
  },[date])

  return (
    <div>
      <StaffApp staffDetails={staffDetails} reloadData={setDate}/>
    </div>
  );
}

export default App;
