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
    
    const updateItNow = await User.findByIdAndUpdate({ _id: findUser._id }, { UpperLineSponserUser: upperline })


    res.json(updateItNow)

  }

