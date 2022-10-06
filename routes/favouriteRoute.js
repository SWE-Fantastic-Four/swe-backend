import { Router } from "express";
import { Routes, Users } from "../firebase.js";
import { FieldValue } from "@google-cloud/firestore";

const router = Router();

function fsArrayInclude(fsArray, searchItem) {
  for (let i = 0; i < fsArray.length; i++) {
    if (fsArray[i] === searchItem) {
      return true;
    }
  }
  return false;
}

router.post("/", async (req, res) => {

  const userRef = Users.doc(req.body.user);
  const routeRef = Routes.doc(req.body.route);

  try {
    const userSnapshot = await userRef.get();
    const routeSnapshot = await routeRef.get();

    if (!userSnapshot.exists || !routeSnapshot.exists) {
      throw new Error("unsuccessful: invalid user or route");
    }

    const userData = userSnapshot.data()
    const userFav = userData.Favourites

    if (fsArrayInclude(userFav, req.body.route)) {
      throw new Error("unsuccessful: route already saved by user")
    }

    const updateUserRes = await userRef.update({ Favourites: FieldValue.arrayUnion(req.body.route) })
    console.log(updateUserRes)
    res.status(200).send("successful: route added to favourites");

  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
})

export default router;