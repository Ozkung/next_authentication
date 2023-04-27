import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

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

      let killport = userShow.favorite.find((item: any) => item == item_id);
      if (killport) {
        let clone = _.cloneDeep(userShow.favorite);
        let index = _.indexOf(clone, item_id);
        clone.splice(index, 1);
        await client
          .db("member")
          .collection("member")
          .updateOne({ _id: new ObjectId(uid) }, { $set: { favorite: clone } });
        return res.status(200).json({ payload: "kill that" });
      }

      userShow.favorite.push(item_id);

      const dataPost = await client
        .db("member")
        .collection("member")
        .updateOne(
          { _id: new ObjectId(uid) },
          { $set: { favorite: _.uniq(userShow.favorite) } }
        );
      res.status(200).json({ payload: dataPost.acknowledged });
      break;

    default:
      res.status(200).json({ payload: `Not using this option` });
      break;
  }
}
