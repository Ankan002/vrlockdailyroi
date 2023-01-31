import mongoose from "mongoose";


const WithdrawRecord = mongoose.Schema({

    RecordOwner:{
        default: "null",
        type: "String",
    },
    OldWallet:{
        default: "null",
        type: "String",
    },
    WithdrawAmount:{
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
export default mongoose.models.WithdrawRec || mongoose.model("WithdrawRec", WithdrawRecord);
