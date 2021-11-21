import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
  const { db } = await connectToDatabase();
  const isLocationPinned = await db
    .collection("users")
    .findOne(
        {  _id: new ObjectId(session.userId),  pinnedLocations: req.query.weatherKey}
      )
  res.json({isPinned:isLocationPinned != null});
    }else{
      res.status(401)
    }
};