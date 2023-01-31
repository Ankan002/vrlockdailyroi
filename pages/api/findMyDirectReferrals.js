import initDB from "../../helper/initDB";
import User from "../../helper/Modal/User";

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const getUserWallet = await User.find({UpperLineSponserUser:id})


  res.json(getUserWallet)
};
