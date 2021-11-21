import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne(
        {  _id: new ObjectId(session.userId)}
      )
  res.json({locations:user.pinnedLocations});
    }else{
      res.status(401)
      res.end()
    }
};