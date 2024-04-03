const express = require("express");
const router = express.Router();
const adminRouter = require("./adminRoute");
const userRouter = require("./userRoute");

router.use("/admin", adminRouter);
router.use("/", userRouter);

module.exports = router;
