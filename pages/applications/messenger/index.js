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




  // useEffect(() => {

  //   try {


  //     axios.get("https://api.pancakeswap.info/api/v2/tokens/0x26844ffd91648e8274598e6e18921a3e5dc14ade")
  //       .then((acc) => {
  //         console.log(acc.data.data.price)
  //         setMainLaykaValue(acc.data.data.price)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })



  //   } catch (error) {
  //     console.log(error)
  //   }
















  //   if (typeof window !== "undefined") {

  //     const val = sessionStorage.getItem('jwt');
  //     const parsedVal = JSON.parse(val);
  //     console.log(parsedVal);

  //     try {

  //       axios.patch("/api/User", {
  //         id: parsedVal._id
  //       })
  //         .then((acc) => {
  //           console.log(acc.data)
  //           setWallete(acc.data.Wallete)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  // }, [])







  const handleWithdraw = () => {
    // setIsLoading(true)
    console.log('hello');
    const val = sessionStorage.getItem('jwt');
    const parsedVal = JSON.parse(val);
    // console.log(parsedVal);
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          const privateKey = '46ae261b30fd301b8b31373777bdc00d8df61cffb842fd93663477e8293ca284';
          const web3 = new Web3(window.ethereum);
          const tokenAddress = '0x7bb90728d8c1EbaC3e9066D3204fB49ab7f22D18';
          const fromAddress = '0x941C6cB23A4C4B75db27C955d93829DF4D00c5Df';
          const contract = new web3.eth.Contract(ABI, tokenAddress, {
            from: fromAddress
          });
          // let fNum =  input /  Number(mainLaykaValue)


          // console.log("My Blance ==>  "+fNum)
          let amount = web3.utils.toHex(web3.utils.toWei(String(input)));
          let data = contract.methods
            .transfer(amount, amount)
            .encodeABI(); // <====< here
          function sendErcToken() {
            let txObj = {
              gas: web3.utils.toHex(100000),
              to: tokenAddress,
              value: '0x00',
              data: data,
              from: fromAddress
            };
            web3.eth.accounts.signTransaction(
              txObj,
              privateKey,
              (err, signedTx) => {
                if (err) {
                  return callback(err);
                } else {
                  try {



                    const handleUpdateWallete = () => {


                      const userData = sessionStorage.getItem("jwt")
                      const parse = JSON.parse(userData)
                  
                      try {
                        axios.post("/api/withdraw/withdraw", {
                          id: parse._id,
                          amount: input
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



                    handleUpdateWallete()
                   






                  } catch (error) {
                    console.log(error);
    setIsLoading(false)

                  }

                  console.log(signedTx);
                  return web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    (err, res) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(res);
                      }
                    }
                  );
                }
              }
            );
          }

          sendErcToken();
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
    const parseData = JSON.parse(datas)

    axios.post("/api/MyRecords/findMyWithdraw", {
      id: parseData._id
    })
      .then((acc) => {
        console.log(acc.data)
        setDatas(acc.data)

      })
      .catch((err) => {
        console.log(err)
      })



  }, [])


  return (
    <>
      <Head>
        <title>Withdraw VR PAY</title>
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

        <h2 style={{ marginTop: 35 }}>Withdraw VR PAY</h2>

        <TextField
          onChange={(e) => {
            setInput(e.target.value);
          }}
          label="Enter Coins"
          type="Enter Coins"
          fullWidth
        />

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          {
            wallete == "null" ?
              <>
                <Button
                  onClick={() => setShowWall(true)}
                  style={{ padding: 10 }}
                  variant="outlined"
                  size="small"
                >
                  Add Wallete Address
                </Button>

              </>



              :

              <Button
                onClick={handleWithdraw}
                style={{ padding: 10 }}
                variant="outlined"
                size="small"
              >
                Withdraw
              </Button>
          }

        </div>

       











        {/* <CurrentWallete fetchData={fetchData} /> */}











        <div style={{ marginTop: 50 }}>



          <h4 style={{ fontWeight: "bold" }}>Withdraw History</h4>




          <table className="table">
            <thead>
              <tr>
                <th style={{ color: "white" }} scope="col">S.N.</th>
                <th style={{ color: "white" }} scope="col">Withdraw Amount</th>
                <th style={{ color: "white" }} scope="col">Old Balance</th>
                <th style={{ color: "white" }} scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {datas && datas.map((hit, index) => {
                return <tr key={hit._id}>
                  <th style={{ color: "white" }} scope="row">{index + 1}</th>
                  <td style={{ color: "white" }}>{hit.WithdrawAmount}</td>
                  <td style={{ color: "white" }}>{hit.OldWallet}</td>
                  <td style={{ color: "white" }}>{hit.createdAt.slice(0,10)}</td>
                </tr>
              })
              }


            </tbody>
          </table>


















        </div>



















      </Container>

      }


    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
