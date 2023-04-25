import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

type Data = {
  payload: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(" req.method :", req.method);
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json({ payload: "John Doe" });
      break;
    case "POST":
      const { user, pass } = req.body;

      if (!(user && pass))
        return res.status(400).json({ payload: "Input is require" });

      let encryptPassword = await bcrypt.hash(pass, 10);
      const usertoken = jwt.sign({ name: user }, process.env.SECRET_KEY, {
        expiresIn: "2 days",
      });
      let obj = {
        user: user,
        pass: encryptPassword,
        token: usertoken,
        createDate: new Date().toISOString(),
      };
      const client = await clientPromise;
      const dbconnect = client.db("member");
      let checkUser = await dbconnect.collection("member").findOne({ user });
      if (checkUser) {
        console.log("Return to Registor");
        return res.status(200).json({ payload: "User has already!" });
      }

      let add = await dbconnect.collection("member").insertOne(obj);
      if (add.acknowledged == true) {
        console.log("save the object success!!!");
        return res.status(200).json({ payload: "Can access" });
      }
      break;

    default:
      res.status(200).json({ payload: `Not using this option` });
      break;
  }
}
