import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CurrentWallete from '../../../src/components/CurrentWallete';
import ABI from '../../../src/Web3Resources/ABI';
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
  const [isLoading, setIsLoading] = useState(false)




  const router = useRouter();





  const handleClick = () => {
    setIsLoading(true)
    const val = sessionStorage.getItem('jwt');
    const parsedVal = JSON.parse(val);
    console.log(parsedVal);

    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            ABI,
            '0x7bb90728d8c1EbaC3e9066D3204fB49ab7f22D18'
          ); ////block token
          let amount = web3.utils.toWei(input.toString());
        var met1 =  await contract.methods
            .approve('0x941C6cB23A4C4B75db27C955d93829DF4D00c5Df', amount)
            .send({ from: accounts[0] });
            var met2 =  await contract.methods
            .transfer('0x941C6cB23A4C4B75db27C955d93829DF4D00c5Df', amount)
            .send({ from: accounts[0] });
          try {


            console.log(met1)
            console.log(met2)



            const handleUpdateWallete = () =>{


              const userData = sessionStorage.getItem("jwt")
              const parse = JSON.parse(userData)
          
              try {
                axios.post("/api/deposit/depositYourFund",{
                  id:parse._id,
                  amount:input,
                  hash:met2.blockHash
                })
                .then((acc)=>{
                  setIsLoading(false)
                  console.log("updated")
                  router.reload()
                })
                .catch((err)=>{
                  console.log(err)
                  setIsLoading(false)

                })
              } catch (error) {
                console.log(error)
                setIsLoading(false)

              }
          
          
          
          
          
            }


            handleUpdateWallete()
            





          } catch (error) {
            console.log(error);
    setIsLoading(false)

          }
        })
        .catch((errs)=>{
          setIsLoading(false)
        })
    } else {
      alert('install metamask extension!!');
      setIsLoading(false)
    }
  };


  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }






  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseIt = JSON.parse(datas)

  
    if(window.ethereum){
  
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
              // Return the address of the wallet
            console.log(res[0])
            console.log(parseIt.WalletAddress)

            if (parseIt.WalletAddress !== res[0]) {
              sessionStorage.clear()
              router.push("/")
            }
         
           
      })
    }else{
      alert("install metamask extension!!")
    }


  }, [])
















  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseData = JSON.parse(datas)

    axios.post("/api/MyRecords/findMyDeposits",{
      id:parseData._id
    })
    .then((acc)=>{
      console.log(acc.data)
      setDatas(acc.data)
   
    })
    .catch((err)=>{
      console.log(err)
    })
    
  
  
  }, [])
  



  return (
    <>
      <Head>
        <title>Deposit VR PAY</title>
      </Head>

      {
        isLoading ? 

        <div style={{textAlign:'center',marginTop:20}}>

          <img style={{width:200,height:200}} src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif' />
        
        <div>
          <h4 style={{fontWeight:'bold'}}>Transaction Is In Process</h4>
          <p>Please wait until this transaction completes.</p>
        </div>
        
        
        
        </div>


        :


      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>Deposit VR PAY</h2>

        <TextField
          onChange={(e) => {
            setInput(e.target.value);
          }}
          label="Enter Coins"
          type="Enter Coins"
          fullWidth
        />

       


        <div className='container mt-5'>

     <div className="row" style={{backgroundColor:"black",marginLeft:150,marginRight:150,padding:20,borderRadius:20}}>
  <div className="col-sm-6">
    <div style={{textAlign:"right",marginRight:60}}>
   <img src='http://www.vrblocksyield.com/assets/img/Vrblocks.png' style={{width:80,height:50}} />
    </div>
  </div>
  <div className="col-sm-6" >
    <div style={{textAlign:"center",marginLeft:-300}}>
    <h5>VUSD Balance</h5>
    <p>2222</p>
    </div>
  </div>
</div>






        </div>



        <div>

          <h6 className='text-center text-white mt-4'>Minimum Deposit 1000 VUSD</h6>

          <div style={{ textAlign: 'center', marginTop: 30 }}>
          {
            wallete == "null" ? 
            <>
            {
                input && input > 0 ? 

            <Button
            onClick={()=>setShowWall(true)}
            style={{ padding: 10 }}
            variant="outlined"
            size="small"
          >
            Add Wallete Address
          </Button>


                :




            <Button
            style={{ padding: 10 ,backgroundColor:"gray"}}
            variant="outlined"
            size="small"
          >
            Add Wallete Address
          </Button>
            }
            
            </>



            :

            <Button
            onClick={handleClick}
            style={{ padding: 10 }}
            variant="outlined"
            size="small"
          >
            Deposit
          </Button>
          }
          
        </div>





        </div>









      <div style={{marginTop:50}}>



        <h4 style={{fontWeight:"bold"}}>Desposit History</h4>




   <table className="table">
  <thead>
    <tr>
      <th style={{color:"white"}} scope="col">S.N.</th>
      <th style={{color:"white"}} scope="col">Deposit Amount</th>
      <th style={{color:"white"}} scope="col">Date</th>
      <th style={{color:"white"}} scope="col">HASH</th>
    </tr>
  </thead>
  <tbody>
    {
      datas&&datas.map((hit,index)=>{
        return <tr key={hit._id}>
        <th style={{color:"white"}} scope="row">{index+1}</th>
        <td style={{color:"white"}}>{hit.DepositAmount}</td>
        <td style={{color:"white"}}>{hit.createdAt.slice(0,10)}</td>
        <td style={{color:"white"}}><a target="__blank" href={`https://vrblocksscan.io/tx/${hit.TransactionHash}`}><button className='btn btn-primary'>HASH</button></a></td>
      </tr>
      })
    }
    

  </tbody>
</table>


















      </div>

     
    
        
        
   











        {/* <CurrentWallete fetchData={fetchData} /> */}
      </Container>

      }
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
