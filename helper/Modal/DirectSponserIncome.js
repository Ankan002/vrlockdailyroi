import mongoose from "mongoose";

const DirectSponserIncome = mongoose.Schema({
    IncomeOwner:{
        default: "null",
        type: "String",
    },
    SentFrom:{
        default: "null",
        type: "String",
    },
    SendFromUserName:{
        default: "null",
        type: "String",
    },
    SentTo:{
        default: "null",
        type: "String",
    },
    SendToUserName:{
        default: "null",
        type: "String",
    },
    EarnedCoin:{
        default: "null",
        type: "String",
    },
    EarnedPercantage:{
        default: "null",
        type: "String",
    }   
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DirectSponserIncome || mongoose.model("DirectSponserIncome", DirectSponserIncome);