import { Box, Card, styled } from '@mui/material';
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Login from "../src/components/Login/Login";
import { useRouter } from 'next/router'



function Overview() {

  const router = useRouter()






  
  if (typeof window !== "undefined") {
    

    if (sessionStorage.getItem("jwt")) {
      router.push("/purchasePack")
    }


}




  return (
   <>
    <Login />
   </>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
