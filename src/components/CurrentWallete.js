import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


const CurrentWallete = ({fetchData}) => {
    const [inputval, setInputval] = useState("");

    useEffect(() => {

       

        getData()





    }, []);


    const getData = () =>{
        if (typeof window !== "undefined") {
            
            const val = sessionStorage.getItem('jwt');
            const parsedVal = JSON.parse(val);
            console.log(parsedVal);
    
            try {
     
             axios.patch("/api/User",{
                 id:parsedVal._id
             })
             .then((acc)=>{
                 console.log(acc.data)
                 setInputval(acc.data.RechargeWallete)
             })
             .catch((err)=>{
                 console.log(err)
             })
             
            } catch (error) {
             console.log(error)
            }
        }
    }


    if (fetchData) {
        getData()
    }




  return (
    <div >


    <h3 style={{textAlign:"center",marginTop:30}}>Your Current Wallete Balance Is : {inputval}</h3>





    </div>
  )
}

export default CurrentWallete