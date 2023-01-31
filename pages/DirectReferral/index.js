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
  const [datas, setDatas] = useState("")
  const router = useRouter();











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





  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseDats = JSON.parse(datas)

    try {

      axios.post("/api/findMyDirectReferrals",{
        id:parseDats._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setDatas(acc.data)
      })
      .catch((err)=>{
        console.log(err)
      })


    } catch (error) {
      console.log(error)
    }
    
  
   
  }, [])
  


  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>



      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>Deposit Referral Team</h2>


        <div style={{ marginTop: 50 }}>

          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ color: "white" }} scope="col">S.N.</th>
                <th style={{ color: "white" }} scope="col">Name</th>
                <th style={{ color: "white" }} scope="col">SponserCode</th>
                <th style={{ color: "white" }} scope="col">ContactNumber</th>
                <th style={{ color: "white" }} scope="col">Wallete</th>
                <th style={{ color: "white" }} scope="col">Date</th>
              </tr>
            </thead>
            <tbody>

              {
               datas&&datas.map((hit, index) => {
                  return <tr key={hit.key}>
                    <th style={{ color: "white" }} scope="row">{index + 1}</th>
                    <td style={{ color: "white" }}>{hit.Name}</td>
                    <td style={{ color: "white" }}>{hit.SponserCode}</td>
                    <td style={{ color: "white" }}>{hit.ContactNumber}</td>
                    <td style={{ color: "white" }}>{hit.Wallete}</td>
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
