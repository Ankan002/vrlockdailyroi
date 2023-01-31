import initDB from "../../../helper/initDB";
import DailyRoi from "../../../helper/Modal/DailyRoi";

initDB();

export default async (req, res) => {
  const { id } = req.body;


  const findMyPackage = await DailyRoi.find({RoiOwner:id})


  res.json(findMyPackage)
};

