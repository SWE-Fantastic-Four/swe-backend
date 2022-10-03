import { Router } from "express";
import { User } from "../firebase.js";

// Update Username
const router = Router();

// Obtain user data
const obtainUser = async (username) => {
  const user = await User.doc(username).get();
  if (user.exists) {
    return (user.data())
  }
  else {
    throw new Error("Unable to obtain user data")
  }
}

// Create new User
const createNewUser = async (newUsername, userData) => {
  const user = User.doc(newUsername);
  try {
    await user.set(userData);
  } catch (error) {
    throw new Error("Unable to create new User")
  }
}

// Delete User
const deleteUser = async (username) => {
  try {
    await User.doc(username).delete();
  } catch (error) {
    throw new Error("Unable to delete user")
  }
}

router.post("/", async (req, res) => {
  const { oldUsername, newUsername } = req.body;
  let userData;
  
  // TODO: Use Promise.all to throw an error if any of the async tasks fail
  try {
    userData = await obtainUser(oldUsername);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  try {
    await createNewUser(newUsername, userData);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  try {
    await deleteUser(oldUsername);
    res.status(200).json({ oldUsername: oldUsername });
  } catch (error) {
    await deleteUser(newUsername);
    res.status(400).send(error.message);
    return;
  }
});

export default router;