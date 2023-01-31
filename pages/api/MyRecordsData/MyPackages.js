import initDB from "../../../helper/initDB";
import PackageIHistory from "../../../helper/Modal/PackageIHistory";

initDB();

export default async (req, res) => {
  const { id } = req.body;


  const findMyPackage = await PackageIHistory.find({PackageOwner:id})


  res.json(findMyPackage)
};

