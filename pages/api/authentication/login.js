import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DailyRoi from "../../../helper/Modal/DailyRoi"
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi"
import PackageIHistory from "../../../helper/Modal/PackageIHistory"


initDB();

export default async (req, res) => {
  const { wallAddress, upperline } = req.body;

  console.log(" this is my upperline ==> "+upperline)

  if (!wallAddress) {
    return res
      .status(404)
      .json({ error: "You Have Not Provided All The Informations" });
  }

  const findUser = await User.findOne({ WalletAddress: wallAddress })

  console.log(findUser)

  if (findUser == null) {

    const createUser = await User({
      WalletAddress: wallAddress,
      UpperLineSponserUser: upperline
    }).save()

    return res.json({datam:createUser,goToAddWallet:true})

  }else{
    return res.json({datam:findUser,goToAddWallet:false})
  }

};