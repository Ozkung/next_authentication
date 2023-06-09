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
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json({ payload: "John Doe" });
      break;
    case "POST":
      const { name, pass } = req.body;
      if (!(name && pass))
        return res.status(400).json({ payload: "Input is require" });

      let encryptPassword = await bcrypt.hash(pass, 10);
      const usertoken = jwt.sign({ name: name }, process.env.SECRET_KEY, {
        expiresIn: "2 days",
      });
      let obj = {
        name: name,
        pass: encryptPassword,
        token: usertoken,
        favorite: [],
        createDate: new Date().toISOString(),
      };
      const client = await clientPromise;
      const dbconnect = client.db("member");
      let checkUser = await dbconnect.collection("member").findOne({ name });
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
