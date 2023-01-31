import mongoose from "mongoose";


const DepositRecord = mongoose.Schema({

    RecordOwner:{
        default: "null",
        type: "String",
    },
    OldWallet:{
        default: "null",
        type: "String",
    },
    DepositAmount:{
        default: "null",
        type: "String",
    },
    Commision:{
        default: "null",
        type: "String",
    },
    LykaToken:{
        default: "null",
        type: "String",
    },
    TransactionHash:{
        default: "null",
        type: "String",
    }
},
{
  timestamps: true,
})
export default mongoose.models.Depositr || mongoose.model("Depositr", DepositRecord);
