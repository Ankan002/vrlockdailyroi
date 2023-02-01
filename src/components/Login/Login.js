import React, { useState, useEffect } from 'react';
import { Box, Card, styled } from '@mui/material';
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useRouter } from 'next/router'
import MyButton from "../MyButton"






const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userWalletId, setUserWalletId] = useState("")
  const [connectedToMetamask, setConnectedToMetamask] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const router = useRouter()


  // useEffect(() => {

  
  //   if(window.ethereum){
  
  //     window.ethereum.request({method:'eth_requestAccounts'})
  //     .then(res=>{
  //             // Return the address of the wallet
  //           console.log(res[0])
  //           setUserWalletId(res[0])
  //           try {
  //             axios
  //               .post('/api/authentication/login', {
  //                 wallAddress:res[0],
  //                 upperline:email
  //               })
  //               .then((acc) => {
  //                 console.log(acc.data)
  //                 console.log(acc.data.UpperLineSponserUser.length);
  //                 if (acc.data.UpperLineSponserUser.length > 0) {
                    
  //                             // sessionStorage.setItem("jwt", JSON.stringify(acc.data))
  //                             router.push("/dash")
                    
  //                 }
        
        
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //                 setIsLoading(false);
  //               });
  //           } catch (error) {
  //             console.log(error);
  //           }
         
           
  //     })
  //   }else{
  //     alert("install metamask extension!!")
  //   }


  // }, [])



  const handleLogin = () => {
    setIsLoading(true);

    try {
      axios
        .post('/api/authentication/login', {
          wallAddress:userWalletId,
          upperline:email
        })
        .then((acc) => {
          // setConnectedToMetamask(false)
          console.log(acc.data);
          setIsLoading(false)

          if (acc.data.goToAddWallet) {
            setAccountCreated(true)
            
          }else{
            
          sessionStorage.setItem("jwt", JSON.stringify(acc.data.datam))
          router.push("/dash")

          }


        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };




  const handleUpdateWallet = () => {
    setIsLoading(true);

    try {
      axios
        .post('/api/authentication/updateUpperLine', {
          wallAddress:userWalletId,
          upperline:email
        })
        .then((acc) => {
          // setConnectedToMetamask(false)
          console.log(acc.data);
          setIsLoading(false)
          setAccountCreated(true)

          sessionStorage.setItem("jwt", JSON.stringify(acc.data))
          router.push("/dash")



        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };



  const handleFourceLogin = () => {
    setIsLoading(true);

    try {
      axios
        .post('/api/authentication/login', {
          wallAddress:userWalletId,
          upperline:email
        })
        .then((acc) => {
          console.log(acc.data);
          setIsLoading(false)

          sessionStorage.setItem("jwt", JSON.stringify(acc.data))
          router.push("/dash")
          

        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };



  const connectWallet = () =>{


    if(window.ethereum){
      
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
              // Return the address of the wallet
              setConnectedToMetamask(true)
              console.log(res) 
              setUserWalletId(res[0])
      })


    }else{
      alert("install metamask extension!!")
    }



    
  }



  return (
    <Card style={{ backgroundImage: `url("http://www.vrblocksyield.com/assets/img/banner_bg.png")`, width: "100%", backgroundSize: "cover", height: "100%" }}>
      <div style={{ marginRight: 20 }}>
        {/* <div className="row mt-5">
          <div className="col-sm-6" >

          </div>
          <div className="col-sm-6" >
            <div style={{ right: 10 }}>
              <div style={{ textAlign: "right" }}>
                <button onClick={connectWallet} className='btn btn-primary m-2'>CONNECT</button>
                {
                  userWalletId ? 

                  <button  onClick={handleFourceLogin} className='btn btn-primary m-2'>{userWalletId.slice(0,5)+"-"+userWalletId.slice(-5)}</button>
                  :

                  <></>
                }
              </div>
            </div>

          </div>
        </div> */}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',


        }}
      >




        <Card style={{ borderColor: "red", borderWidth: 2 }}>









          <CardContent style={{ borderColor: "red", borderWidth: 2 ,width:400}}>


            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
              <img style={{ width: 80, height: 50 }} src='http://www.vrblocksyield.com/assets/img/Vrblocks.png' />
            </div>


            {/* <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              type="email"
              fullWidth
            /> */}

            {/* <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginTop: 20 }}
              label="Upperline"
              type="Upperline"
              fullWidth
            /> */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              {/* {
            isLoading ? 
            <Button
               
                style={{ padding: 10 }}
                variant="outlined"
                size="small"
              >
                LOADING ...
              </Button>


            :
          
              <Button
                onClick={handleLogin}
                style={{ padding: 10 }}
                variant="outlined"
                size="small"
              >
                REGISTER
              </Button>
         




          } */}

          {
            !connectedToMetamask &&
          <button onClick={connectWallet} className='btn btn-warning' style={{fontWeight:"bolder"}}>CONNECT METAMASK</button>
        }


          {
            connectedToMetamask && !accountCreated&&
            <>
            <button className='btn btn-warning' style={{fontWeight:"bolder"}}>{userWalletId.slice(0,15)}...</button> <br/>
            <button onClick={handleLogin} className='btn  mt-2' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>REGISTER / LOGIN</button>
            </>
          }


          {
            accountCreated &&
            <>
            
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginTop: 20 }}
              label="Upline Wallet Address"
              type="Upline Wallet Address"
              fullWidth
            /> <br/>
            <button onClick={handleUpdateWallet} className='btn  mt-4' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>UPDATE WALLET</button>


            </>
          }


          



              <div style={{ marginTop: 50 }}>

                

              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default Login;
