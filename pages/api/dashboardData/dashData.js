import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DirectSponserIncome from "../../../helper/Modal/DirectSponserIncome";
import PackageIHistory from "../../../helper/Modal/PackageIHistory";
import DailyRoi from "../../../helper/Modal/DailyRoi";
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi";

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const UserData = await User.findById(id)

  const FindPack = await PackageIHistory.findOne({PackageOwner:id})

  console.log(UserData)

  var earnedToken = 0

  const findDirectSponserIncome = await DirectSponserIncome.find({IncomeOwner:id})

  findDirectSponserIncome.map((hit)=>{
    return earnedToken = earnedToken + Number(hit.EarnedCoin)
  })

  var earnD = 0



  const findEarnToken = await DailyRoi.find({RoiOwner:id})

  findEarnToken.map((hit)=>{
    return earnD = earnD + Number(hit.GiveRoiCoin)
  })



  var levEarn = 0



  const findLevelEarn = await LevelDailyRoi.find({ROIOwner:id})

  findLevelEarn.map((hit)=>{
    return levEarn = levEarn + Number(hit.coinEarned)
  })










  res.json({
    Package:FindPack ? FindPack.PackageName : "0",
    AvalibleToken:UserData.Wallete,
    EarnedToken:earnedToken,
    TotalROIIncome:earnD,
    TokenLevelIncomeROI:levEarn,
    TokenDirectReferral:earnedToken
  })
};