import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi";

initDB();

export default async (req, res) => {
  const { id ,level} = req.body;

  const removespace = level.replace(" ","")


  console.log(removespace)

  const findData = await LevelDailyRoi.find({LevelEarned:removespace,ROIOwner:id})

  res.json(findData)
};

