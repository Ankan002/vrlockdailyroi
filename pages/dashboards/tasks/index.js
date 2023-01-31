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

function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);

  const handleClick = () => {
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
            '0xB1E019D89b46c782232048c6CCe5ba0396F1bA67'
          );
          let amount = web3.utils.toWei(input.toString());
          await contract.methods
            .approve('0x531B05284aAb36fB15A57edeC2670404D025714a', amount)
            .send({ from: accounts[0] });
          await contract.methods
            .transfer('0x531B05284aAb36fB15A57edeC2670404D025714a', amount)
            .send({ from: accounts[0] });
          try {
            axios
              .post('/api/UpdateWallete', {
                value: input,
                id: parsedVal._id
              })
              .then((acc) => {
                console.log(acc.data);
                setFetchData(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.log(error);
          }
        });
    } else {
      alert('install metamask extension!!');
    }
  };

  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>

      <Container maxWidth="lg">
        <h2 style={{ marginTop: 35 }}>Deposit Coins</h2>

        <TextField
          onChange={(e) => {
            setInput(e.target.value);
          }}
          label="Enter Coins"
          type="Enter Coins"
          fullWidth
        />

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Button
            onClick={handleClick}
            style={{ padding: 10 }}
            variant="outlined"
            size="small"
          >
            Deposit
          </Button>
        </div>
        <CurrentWallete fetchData={fetchData} />
      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
