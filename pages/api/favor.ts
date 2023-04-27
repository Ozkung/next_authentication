import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  payload: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const { method } = req;
  switch (method) {
    case "GET":
      //   get fovor
      let id: any = req.query.id;

      const data = await client
        .db("member")
        .collection("member")
        .findOne({ _id: new ObjectId(id) });
      res.status(200).json({ payload: data });
      break;
    case "POST":
      //   save favor
      const { uid, item_id } = req.body;

      const userShow: any = await client
        .db("member")
        .collection("member")
        .findOne({ _id: new ObjectId(uid) });
      userShow.favorite.push(item_id);
      let entity: any = new Set(userShow.favorite);
      const dataPost = await client
        .db("member")
        .collection("member")
        .updateOne({ _id: new ObjectId(uid) }, { $set: { favorite: entity } });
      res.status(200).json({ payload: dataPost.acknowledged });
      break;

    default:
      res.status(200).json({ payload: `Not using this option` });
      break;
  }
}
