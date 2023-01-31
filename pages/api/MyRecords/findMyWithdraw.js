import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord";

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const findData = await WithdrawRecord.find({RecordOwner:id})

  console.log(findData)

  res.json(findData)
};