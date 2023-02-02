import mongoose from "mongoose";

const CareerRewardSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reward_level: {
        type: String,
        required: true,
    },
    reward_granted: {
        type: String,
        required: true
    },
    time_granted: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.CareerReward || mongoose.model("CareerReward", CareerRewardSchema);
