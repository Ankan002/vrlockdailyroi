import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";

initDB();

export default async (req, res) => {
  const { id,amount,hash } = req.body;



  const getUserWallet = await User.findById(id)



  var MyWallet = getUserWallet.Wallete    

  console.log(amount)
  
  if (MyWallet =="null") {
    console.log("heres")
    MyWallet = 0
  }
  console.log(MyWallet)


  var newWall = Number(MyWallet) + Number(amount)

  const updateWallet = await User.findByIdAndUpdate({_id:id},{Wallete:newWall})

  const DepositRecordss = DepositRecord({

    RecordOwner:id,
    OldWallet:MyWallet,
    DepositAmount:amount,
    Commision:"null",
    LykaToken:"null",
    TransactionHash:hash

  }).save()





  res.json("updated wallet")
};