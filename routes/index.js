import { Router } from "express";
import test from "./test.js";
import saveRoute from "./saveRoute.js";
import createUser from "./createUser.js"
import updateUsername from "./updateUsername.js"
import handlelikes from "./handleLike.js"


const router = Router();
router.use("/test", test);
router.use("/routes/save", saveRoute);
router.use("/user/create", createUser); // TODO: change to /user/:username/create
router.use("/user/update/username", updateUsername);
router.use("/handlelikes", handlelikes )




export default router;
