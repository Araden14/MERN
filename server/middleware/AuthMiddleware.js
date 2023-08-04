import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) {
        res.locals.user = user;
        next()       
      } else {
        return res.json({ status: false })
      }
    }
  })

}
export default userVerification;
