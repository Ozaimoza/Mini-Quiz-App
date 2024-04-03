const express = require("express");
const {
  register,
  login,
  logout,
  getUserById,
} = require("../controllers/userController");
const { SubmitAnswers } = require("../controllers/userAnswer");
const { authUserMiddleware } = require("../middleware/authMiddleware");
const { getAllQuestion } = require("../controllers/questionController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.use(authUserMiddleware);
router.get("/user/:userId", getUserById);
router.route("/question").post(SubmitAnswers).get(getAllQuestion);

module.exports = router;
