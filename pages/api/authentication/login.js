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

  var findUser = await User.findOne({ WalletAddress: wallAddress })

  console.log(findUser)

  if (findUser == null) {

    const createUser = await User({
      WalletAddress: wallAddress,
      UpperLineSponserUser: upperline
    }).save()

    return res.json({datam:createUser,goToAddWallet:true})

  }else{


    var Dates = new Date()
    var getDay = Dates.getDate()
    var getMonth = Dates.getMonth()+1
    var getYear = Dates.getFullYear()

    const findTodayROIData = await DailyRoi.find({RoiOwner:findUser._id,Date:`${getYear}-${getMonth}-${getDay}`}).sort({datefield: -1})
    const findTodayROIDataOld = await DailyRoi.find({RoiOwner:findUser._id}).sort({_id:-1})

    console.log(findTodayROIData)

    if (findTodayROIData.length == 0) {

      if (findTodayROIDataOld.length > 0) {
        
              const lastDataDate = findTodayROIDataOld[0].Date


              const date1 = new Date(lastDataDate);
              const date2 = new Date(`${getYear}-${getMonth}-${getDay}`);
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

              var num = 0


              while (Number(num) < Number(diffDays)) {
                const giveReward = await DailyRoi({
                  RoiOwner:findUser._id,
                  StepsWalked:"0",
                  GiveRoiCoin:"20",
                  GiveRoiPercantage:"0.5",
                  PurchasedPackageName:"wegwe",
                  Date:`${getYear}-${getMonth}-${getDay}`
                }).save()
                num = num +1
              }

              var index = 1
              var percan = 30 * 5 /100



              // while (findUser.UpperLineSponserUser !== "null" && index <= 15) {
                
              //   const findUserPackage = await PackageIHistory.findOne({PackageOwner:findUser._id})
            
              //   const ThisUser = await User.findById(findUser._id)          
            
              
            
            
            
              //     const giveLevelReward = LevelDailyRoi({
              //       ROIOwner:findUser.UpperLineSponserUser,
              //       LevelEarned:index,
              //       coinEarned:percan,
              //       EarnedPercantage:"5%",
              //       rewardGetFrom:findUser._id,
              //       rewardGetFromName:"null"
              //     }).save()
              //     console.log(findUser._id)
              //     const getUserOldWallet = await User.findById({_id:findUser._id})
              //     const sum = Number(getUserOldWallet.Wallete) + percan
            
              //   var findSecUser = await User.findOne({WalletAddress:findUser.UpperLineSponserUser})
              //   if (findSecUser !== null) {
              //     findUser = await User.findById(findUser._id)                  
              //   }else{
              //     findUser = "null"
              //     index = index+1
              //   }
              // }
        
      }else{

        const giveReward = await DailyRoi({
          RoiOwner:findUser._id,
          StepsWalked:"0",
          GiveRoiCoin:"20",
          GiveRoiPercantage:"0.5",
          PurchasedPackageName:"wegwe",
          Date:`${getYear}-${getMonth}-${getDay}`
        }).save()
      }

      console.log("saved data")

      
    }










    return res.json({datam:findUser,goToAddWallet:false})
  }

};