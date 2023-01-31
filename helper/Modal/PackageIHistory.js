import mongoose from "mongoose";

const PackageIHistory = mongoose.Schema({
    PackageOwner:{
        default: "null",
        type: "String",
    },
    PackageName:{
        default: "null",
        type: "String",
    },
    
    Amount:{
        default: "null",
        type: "String",
    },
    LevelOpen:{
        default: "null",
        type: "String",
    },
    TargetGoal:{
        default: "null",
        type: "String",
    },
    ROI:{
        default: "null",
        type: "String",
    }
   
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PackageIHistory || mongoose.model("PackageIHistory", PackageIHistory);