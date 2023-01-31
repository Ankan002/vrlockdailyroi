import React, { useState, useEffect } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Head from 'next/head';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ABI from '../src/Web3Resources/ABI';
import Web3 from 'web3';
import { useRouter } from 'next/router';


const PurchasePackage = () => {
  const router = useRouter();

  const [datas, setData] = useState('');

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    var JWT = localStorage.getItem('jwt');
    console.log(JWT);
    if (JWT == null) {
      router.push('/');
    }

    const { pid } = router.query;

    try {
      axios
        .patch('/api/Package/AllPackages', {
          id: pid
        })
        .then((acc) => {
          console.log(acc.data);
          setData(acc.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router.isReady]);

  const activatePackage = () => {
    var data = localStorage.getItem('jwt');
    var parsedData = JSON.parse(data);
    var ids = parsedData._id;
    console.log(ids);

    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            ABI,
            '0x26844ffd91648e8274598e6e18921a3e5dc14ade'
          );
          console.log(datas.PackagePrice);
          console.log(typeof datas.PackagePrice);
          let amount = web3.utils.toWei(datas.PackagePrice.toString());

          const one = await contract.methods
            .approve('0x531B05284aAb36fB15A57edeC2670404D025714a', amount)
            .send({ from: accounts[0] });
          const two = await contract.methods
            .transfer('0x531B05284aAb36fB15A57edeC2670404D025714a', amount)
            .send({ from: accounts[0] });

          console.log(two.blockHash);
          console.log('another');
          console.log(one.blockHash);

          try {
            axios
              .post('/api/Package/Admin/ActivatePackagePaid', {
                id: ids,
                packageId: packageId
              })
              .then((acc) => {
                console.log(acc.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert('install metamask extension!!');
    }
  };

  return (
    <>
      <Head>
        <title>Purchase Package</title>
      </Head>

      {datas ? (
        <Container maxWidth="lg">
          <h2 style={{ marginTop: 35 }}>Purchase Package</h2>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h1 style={{ fontWeight: 'bold', color: '#8C7CF0' }}>
                {datas.PackageName}
              </h1>
              <h3>Price : {datas.PackagePrice}$</h3>
              <h3>Monthly Reward : {datas.MonthlyReward}$</h3>
              <h3>Daily Reward : {datas.DailyReward}$</h3>
              <h3>Duration : {datas.Duration} Year</h3>
            </CardContent>
          </Card>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Button
              onClick={activatePackage}
              style={{ padding: 10 }}
              variant="outlined"
              size="small"
            >
              Activate Package
            </Button>
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
PurchasePackage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default PurchasePackage;
