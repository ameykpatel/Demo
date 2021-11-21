import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req })
  console.log(req.body);
  const userPinnedLocations = await db
    .collection("users")
    .findOneAndUpdate(
        {  _id: new ObjectId(session.userId) },
        {
           $addToSet: {
            pinnedLocations: req.body.weatherKey
          }
        }
      );

  res.json(userPinnedLocations);
};