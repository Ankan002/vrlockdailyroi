import PackageIHistory from '@/helper/Modal/PackageIHistory'
import initDB from '../../../helper/initDB'
import User from '../../../helper/Modal/User'
import Package from '../../../helper/Modal/Package'
import DirectSponserIncome from '../../../helper/Modal/DirectSponserIncome'


initDB()

export default async (req, res) => {
    const { packageId, id } = req.body






    const getPack = await Package.findById(packageId)

    // giving direct income 0.5%
    const getMainUser = await User.findById(id)
    const getUpperUser = await User.findById(getMainUser.UpperLineSponserUser)




    const per = Number(getUpperUser.Wallete) + Number(getPack.Amount) * 0.5 / 100

    const walls = Number(getUpperUser.Wallete) + Number(getPack.Amount)

    const findUpperUserPackage = await PackageIHistory.find({ PackageOwner: getMainUser.UpperLineSponserUser })

    if (findUpperUserPackage !== null) {

        const packagePer = Number(findUpperUserPackage.Amount) * 300 / 100

        // if (Number(getUpperUser.RechargeWallete) >=  Number(packagePer)) {

        const sumss = Number(getUpperUser.RechargeWallete) + Number(per)

        const updatePercantage = await User.findByIdAndUpdate({ _id: getUpperUser._id }, { RechargeWallete: sumss })

        await User.findByIdAndUpdate({ _id: getMainUser.UpperLineSponserUser }, { Wallete: per })


        const giveDirectSponserIncome = await DirectSponserIncome({

            IncomeOwner: getUpperUser._id,
            SentFrom: id,
            SendFromUserName: getMainUser.SponserCode,
            SentTo: getUpperUser._id,
            SendToUserName: getUpperUser.SponserCode,
            EarnedCoin: Number(getPack.Amount) * 0.5 / 100,
            EarnedPercantage: "0.5%"

        }).save()


        await User.findByIdAndUpdate({ _id: getUpperUser._id }, { Wallete: per })



        // }








    }

    // purchasing package for user
    const purchasePackage = await PackageIHistory({

        PackageOwner: id,
        PackageName: getPack.PackageName,
        Amount: getPack.Amount,
        LevelOpen: getPack.LevelOpen,
        TargetGoal: getPack.TargetGoal,
        ROI: getPack.ROI

    }).save()


    const updateOnUserModal = await User.findByIdAndUpdate({ _id: id }, { PackageName: getPack.PackageName, PackageAmount: getPack.Amount, PackageID: getPack._id })


    res.json("Package Purchased")








}