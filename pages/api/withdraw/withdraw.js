import initDB from "../../../helper/initDB";
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord";
import User from "../../../helper/Modal/User";

initDB();

export default async (req, res) => {
  const { id,amount ,hash} = req.body;

  const getUserWallet = await User.findById(id)



   var MyWallet = getUserWallet.Wallete



  if (MyWallet == "null") {
    MyWallet = 0
  }


  var crWall = Number(MyWallet)-Number(amount)


  const updateWallet = await User.findByIdAndUpdate({_id:id},{Wallete:crWall})



  const WithdrawRecordss = WithdrawRecord({

    RecordOwner:id,
    OldWallet:MyWallet,
    WithdrawAmount:amount,
    Commision:"null",
    LykaToken:"null",
    TransactionHash:hash

  }).save()




  res.json("updated wallet")
};