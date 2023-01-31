import initDB from '../../../helper/initDB';
import User from '../../../helper/Modal/User';
import PackageIHistory from '../../../helper/Modal/PackageIHistory';
import DailyRoi from '../../../helper/Modal/DailyRoi';
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi"
import Package from "../../../helper/Modal/Package"
import MySteps from "../../../helper/Modal/MySteps"

initDB();

export default async (req, res) => {
  const { ids ,steps} = req.body;


  

  if (!ids || !steps) {
    return res.status(500).json({error:"Not Provided All Parameter"})
  }



  var mids = ids

  var index = 1
  var ins = 1

  var mainUses = await User.findById(ids)

  var StepsCompleteUser = await User.findById(mids)
  var walls = StepsCompleteUser.PackageAmount

  const findhisData = await PackageIHistory.findOne({PackageOwner:ids})
  
  if (findhisData == null) {
    
    return res.json({message:"You have not purchased any package yet. First purchase any package and try again."})

  }

  var TodayDate = new Date()

  var FullDate = TodayDate.getDate() + "-" + TodayDate.getMonth() + "-" + TodayDate.getFullYear()

  const findUserOldSteps = await MySteps.findOne({StepsOwner:ids,StepsWalkedDate:FullDate})


  if (findUserOldSteps == null) {

    const createNewEntry = await MySteps({
      StepsOwner:ids,
      Steps:steps,
      StepsWalkedDate:FullDate

    }).save()
    
  }else{


    const sumSteps = Number(findUserOldSteps.Steps) + Number(steps)

    
    const updateSteps = await MySteps.findByIdAndUpdate({_id:findUserOldSteps._id},{Steps:sumSteps})





  }




  const findPackage = await Package.findOne({Amount:walls})

  const findGoal = findhisData.TargetGoal

  const findRois = Number(findhisData.Amount) * Number(findhisData.ROI.replace("%","")) /100


  // if (Number(steps) < Number(findGoal)) {
  //   return res.json({message:"You have not completed your daily goal target yet"})
  // }
  var giveRev = Number(StepsCompleteUser.Wallete) + Number(findRois)

  const packageAmountForThis =  Number(findhisData.Amount) * 300 /100

  console.log(packageAmountForThis)

  if (Number(mainUses.RechargeWallete) >= packageAmountForThis) {

  }else{
    const updateReward = await User.findByIdAndUpdate({_id:ids},{Wallete:String(giveRev.toFixed(0))})

    const sums = Number(mainUses.RechargeWallete) + Number(findRois)


    const updatePercantage = await User.findByIdAndUpdate({_id:ids},{RechargeWallete:sums})
  }
  
  
  
  const MakeRecordForDailyRoi = await DailyRoi({

    RoiOwner:ids,
    StepsWalked:steps,
    GiveRoiCoin:findRois,
    GiveRoiPercantage:findhisData.ROI,
    PurchasedPackageName:findhisData.PackageName,
    PurchasedPackageId:findhisData.Amount,

  }).save()


  var percan = 30 * 5 /100

  while (StepsCompleteUser.UpperLineSponserUser !== "null" && index <= 10) {
    // console.log(index)
    // console.log(StepsCompleteUser._id)

    const findUserPackage = await PackageIHistory.findOne({PackageOwner:StepsCompleteUser._id})

    const ThisUser = await User.findById(StepsCompleteUser._id)


  if (findUserPackage !== null) {

      // console.log(StepsCompleteUser.Name+` (${StepsCompleteUser.SponserCode}) `+"Got 5% Income")


  const packageAmountForThis =  Number(findUserPackage.Amount) * 300 /100



      const giveLevelReward = LevelDailyRoi({
        ROIOwner:StepsCompleteUser.UpperLineSponserUser,
        LevelEarned:index,
        coinEarned:percan,
        EarnedPercantage:"5%",
        rewardGetFrom:mids,
        rewardGetFromName:mainUses.Name
      }).save()
      console.log(StepsCompleteUser._id)
      const getUserOldWallet = await User.findById({_id:StepsCompleteUser._id})
      const sum = Number(getUserOldWallet.Wallete) + percan


      if (Number(ThisUser.RechargeWallete) >= packageAmountForThis) {

      }else{
        const updateThisUserWall = await User.findByIdAndUpdate({_id:StepsCompleteUser._id},{Wallete:String(sum.toFixed(0))})

        
        const sums = Number(ThisUser.RechargeWallete) + Number(percan)


        const updatePercantage = await User.findByIdAndUpdate({_id:StepsCompleteUser._id},{RechargeWallete:sums})



      }


  }else{
    // console.log(`${StepsCompleteUser.Name} ( ${StepsCompleteUser.SponserCode} ) Don't Have Any Package`)
    index = index-1
  
  }

    
    StepsCompleteUser = await User.findById(StepsCompleteUser.UpperLineSponserUser)
    index = index+1
    ins = ins+1
  }


res.status(200).json({"success":"Successfully Done"})
};