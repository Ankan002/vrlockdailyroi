import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const findData = await DepositRecord.find({RecordOwner:id})

  res.json(findData)
};