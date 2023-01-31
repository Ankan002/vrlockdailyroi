import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState("")
  const [showWall, setShowWall] = useState(false)
  const [walleteAddress, setWalleteAddress] = useState("")
  const [mainLaykaValue, setMainLaykaValue] = useState("")
  const [data, setData] = useState("")


  const router = useRouter();


  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }

  useEffect(() => {

    getData()
    
  }, [])
  
  
  
  const getData = () =>{

    const getData = sessionStorage.getItem("jwt")
    const parseData = JSON.parse(getData)

    // console.log(parseData._id)

    
    try {

      axios.post("/api/dashboardData/dashData",{
        id:parseData._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setData(acc.data)
      })
      .catch((err)=>{
        console.log(err)
      })  

    } catch (error) {
      console.log(error)
    }



  }

  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>


      <Container >

        <h2 style={{ marginTop: 35 }}>Dashboard</h2>


<div className="row" style={{marginTop:50}}>
  <div className="col-sm-4" >
   <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>

    <h6 style={{fontWeight:"bold",fontSize:20}}>Package Activated</h6>
    <h6>{data.Package == 0 ? "No Package Bought" : data.Package}</h6>


   </div>
  </div>
  <div className="col-sm-4" >
  <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>
  <h6 style={{fontWeight:"bold",fontSize:20}}>Available Token</h6>
    <h6>{data.AvalibleToken !== "null" ? data.AvalibleToken : "Not Avalible"}</h6>
</div>
  </div>
  <div className="col-sm-4" >
   <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>
   <h6 style={{fontWeight:"bold",fontSize:20}}>Earned Token</h6>
    <h6>{data.EarnedToken}</h6>
   </div>
  </div>

</div>



<div className="row" style={{marginTop:2}}>
  <div className="col-sm-4" >
   <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>
   <h6 style={{fontWeight:"bold",fontSize:20}}>Total ROI Income</h6>
    <h6>{data.TotalROIIncome}</h6>
   </div>
  </div>
  <div className="col-sm-4" >
  <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>
  <h6 style={{fontWeight:"bold",fontSize:20}}>Token Level Income ROI</h6>
    <h6>{data.TokenLevelIncomeROI}</h6>
</div>
  </div>
  <div className="col-sm-4" >
   <div style={{backgroundColor:"#171D37",padding:40,margin:10,borderColor:"#A5287C",borderWidth:2,borderStyle:"solid",borderRadius:10}}>
   <h6 style={{fontWeight:"bold",fontSize:20}}>Token Direct Referral</h6>
    <h6>{data.TokenDirectReferral}</h6>
   </div>
  </div>

</div>







      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
