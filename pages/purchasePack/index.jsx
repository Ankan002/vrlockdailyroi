import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ErrorOutlineSharp } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ABI from "../../src/Web3Resources/ABI"
import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DashboardTasks() {
  const [datas, setDatas] = useState('');
  const [purId, setPurId] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [mainLaykaValue, setMainLaykaValue] = useState("")

  const router = useRouter();

  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }

  useEffect(() => {
    try {


      axios.get("https://api.pancakeswap.info/api/v2/tokens/0x26844ffd91648e8274598e6e18921a3e5dc14ade")
      .then((acc)=>{
        console.log(acc.data.data.price)
        setMainLaykaValue(acc.data.data.price)
      })
      .catch((err)=>{
        console.log(err)
      })

    } catch (error) {
      console.log(error)
    }
    getData();
  }, []);

  const getData = () => {
    const data = sessionStorage.getItem('jwt');

    const parser = JSON.parse(data);

    console.log(parser);
    try {
      axios
        .put('/api/Package/AllPackages', {
          ids: parser._id.replace(/"/g, '')
        })
        .then((acc) => {
          console.log(acc.data);
          setDatas(acc.data);
          setPurId(acc.data.myPurchasedPackage);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivatePackage = (packageId) => {
    const data = sessionStorage.getItem('jwt');

    const parser = JSON.parse(data);

    try {
      axios
        .post('/api/Package/ActivatePackage', {
          id: parser._id.replace(/"/g, ''),
          packageId
        })
        .then((acc) => {
          // console.log(acc.data);
          window.alert('Package Activated');
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivatePackageAdmin = (packageId,price) => {


 var TotCharge = Number(price) / Number(mainLaykaValue)

    const openMetaMask = () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              ABI,
              "0x26844ffd91648e8274598e6e18921a3e5dc14ade"
            );
            let amount = web3.utils.toWei(String(TotCharge));
            setIsLoading(true)
           const one = await contract.methods
              .approve("0xCE4131EBfD188c2Ea67Ff20db1ae8C1731775ba8", amount)
              .send({ from: accounts[0] });
            const two = await contract.methods
              .transfer("0xCE4131EBfD188c2Ea67Ff20db1ae8C1731775ba8", amount)
              .send({ from: accounts[0] });
              setIsLoading(false)

              const data = sessionStorage.getItem('jwt');

              const parser = JSON.parse(data);
          
              try {
                axios
                  .post(
                    '/api/Package/Admin/ActivatePackagePaid',
                    {
                      id: parser._id.replace(/"/g, ''),
                      packageId
                    },
                    {
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                    }
                  )
                  .then((acc) => {
                    // console.log(acc.data);
                    // window.alert('Package Activated');
                       toast("Package Activated")

          setIsLoading(false);

                    getData();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast("Payment Declined")

                  });
              } catch (error) {
                console.log(error);
             setIsLoading(false);
             toast("Payment Declined")


              }
  
           
           
           
          })
          .catch((err) => {
            console.log(err)
            setIsLoading(false);

          });
      } else {
        alert("install metamask extension!!");
      }
    };


    openMetaMask()

  };

  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>



      <Container maxWidth="lg">
      <ToastContainer />
        <h2 style={{ marginTop: 35 }}>Purchase Package</h2>

        <div className="container ">
          {
            !isLoading ? 

          <div className="row">
            {datas ? (
              datas.ActivePackages.map((hit, index) => {
                if (hit.PackagePrice == 'Free') {
                  return;
                }

                if (hit.PackageName == 'skipMe') {
                  return;
                }

                return (
                  <div key={hit._id} className="col-sm-3 mt-4">
                    <div
                      style={{
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderRadius: 15,
                        paddingBottom: 15
                      }}
                      className="container"
                    >
                      <h5
                        style={{ fontWeight: 'bolder' }}
                        className="mt-3 text-center"
                      >
                        {hit.PackagePrice == 'Free' ? 'Free' : hit.PackageName}
                      </h5>

                      <div className="row">
                        <div className="col-sm-6">
                          <p className="text-center">
                            Package Price : {hit.PackagePrice}
                            {hit.PackagePrice == 'Free' ? '' : '$'}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-center">
                            Valid For : {hit.Duration} Month
                          </p>
                        </div>
                      </div>

                      <div className="text-center">
                        {hit.PackagePrice == 'Free' ? (
                          <>
                            {hit.PackagePrice < purId ? (
                              <button
                                style={{ width: '100%' }}
                                className="btn btn-secondry"
                              >
                                Activate
                              </button>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <>
                            {datas.packStat ? (
                              <button
                                style={{ width: '100%' }}
                                className="btn btn-secondary"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="currentColor"
                                  className="bi bi-shield-lock-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleActivatePackageAdmin(hit._id,hit.PackagePrice)
                                }
                                style={{ width: '100%' }}
                                className="btn btn-primary"
                              >
                                Activate
                              </button>
                            )}
                          </>
                         
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}

            {datas ? (
              datas.OtherLockedPackages.map((hit, index) => {
                if (hit.PackagePrice == 'Free') {
                  return;
                }

                if (hit.PackageName == 'skipMe') {
                  return;
                }

                return (
                  <div key={hit._id} className="col-sm-3 mt-4">
                    <div
                      style={{
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderRadius: 15,
                        paddingBottom: 15
                      }}
                      className="container"
                    >
                      <h5
                        style={{ fontWeight: 'bolder' }}
                        className="mt-3 text-center"
                      >
                        {hit.PackagePrice == 'Free' ? 'Free' : hit.PackageName}
                      </h5>

                      <div className="row">
                        <div className="col-sm-6">
                          <p className="text-center">
                            Package Price : {hit.PackagePrice}
                            {hit.PackagePrice == 'Free' ? '' : '$'}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <p className="text-center">
                            Valid For : {hit.Duration} Month
                          </p>
                        </div>
                      </div>

                      <div className="text-center">
                        {hit.PackagePrice == 'Free' ? (
                          <>
                            {hit.PackagePrice < purId ? (
                              <button
                                style={{ width: '100%' }}
                                className="btn btn-secondry"
                              >
                                Activate
                              </button>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <button
                            style={{ width: '100%' }}
                            className="btn btn-secondary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-shield-lock-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                              />
                            </svg>
                          </button>

                          // <button
                          // onClick={()=>handleActivatePackageAdmin(hit._id)}
                          //   style={{ width: '100%' }}
                          //   className="btn btn-primary"
                          // >
                          //   Purchase
                          // </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}



<br />


          </div>
            :
              <></>


          }

            {
              isLoading ? 
              <div style={{textAlign:"center"}}>


              <img className='img-fluid' style={{width:200}} src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif" alt="" />


              <h3>Your Payment Process Is Started...</h3>
              <h6>please don't refresh or close window until payment get confirmed.</h6>

              </div>


              :




              <></>
            }










        </div>
      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
