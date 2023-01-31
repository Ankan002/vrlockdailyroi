import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import CurrentWallete from '../../../src/components/CurrentWallete';
// import ABI from '../../../src/Web3Resources/ABI';
import Web3 from 'web3';
import { useRouter } from 'next/router';


function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState("")
  const [showWall, setShowWall] = useState(false)
  const [walleteAddress, setWalleteAddress] = useState("")
  const [mainLaykaValue, setMainLaykaValue] = useState("")
  const [data, setData] = useState("")
  const router = useRouter();


  useEffect(() => {
    const data = sessionStorage.getItem('jwt');

    const parser = JSON.parse(data);


    try {
      

      axios.post("/api/MyRecordsData/MyPackages",{
        id:parser._id
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
    
  
   
  }, [])
  











  const handleUpdateWallete = () => {


    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    try {
      axios.post("/api/updateWalletes", {
        id: parse._id,
        address: walleteAddress
      })
        .then((acc) => {
          console.log("updated")
          router.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }





  }







  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }

  const handleWithdraw = () => {

  };




  const datas = [

    { "key": "1", "ewg": "weg" },
    { "key": "2", "ewg": "weg" },
    { "key": "3", "ewg": "weg" },
    { "key": "4", "ewg": "weg" },
    { "key": "5", "ewg": "weg" },
    { "key": "6", "ewg": "weg" },
    { "key": "7", "ewg": "weg" },
    { "key": "10", "ewg": "weg" },
    { "key": "11", "ewg": "weg" },
    { "key": "12", "ewg": "weg" },
    { "key": "13", "ewg": "weg" },
    { "key": "14", "ewg": "weg" },
    { "key": "15", "ewg": "weg" }

  ]


  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>



      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>Package Activation History</h2>


        <div style={{ marginTop: 50 }}>

          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ color: "white" }} scope="col">S.N.</th>
                <th style={{ color: "white" }} scope="col">Package Name</th>
                <th style={{ color: "white" }} scope="col">Amount</th>
                <th style={{ color: "white" }} scope="col">Level Open</th>
                <th style={{ color: "white" }} scope="col">Target Goal</th>
                <th style={{ color: "white" }} scope="col">ROI</th>
                <th style={{ color: "white" }} scope="col">Date</th>
              </tr>
            </thead>
            <tbody>

              {
               data&& data.map((hit, index) => {
                  return <tr key={hit.key}>
                    <th style={{ color: "white" }} scope="row">{index + 1}</th>
                    <td style={{ color: "white" }}>{hit.PackageName}</td>
                    <td style={{ color: "white" }}>{hit.Amount}</td>
                    <td style={{ color: "white" }}>{hit.LevelOpen}</td>
                    <td style={{ color: "white" }}>{hit.TargetGoal}</td>
                    <td style={{ color: "white" }}>{hit.ROI}</td>
                    <td style={{ color: "white" }}>{hit.createdAt.slice(0,10)}</td>
                  </tr>
                })
              }


            </tbody>
          </table>





        </div>





      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
