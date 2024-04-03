const express = require("express");
const { register, login, logout } = require("../controllers/adminController");
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestionById,
} = require("../controllers/questionController");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createMultiChoice,
  updateMultiChoice,
} = require("../controllers/multiChoiceController");
const { getAllUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.use(authMiddleware);
router.route("/question").post(createQuestion).get(getAllQuestion);
router
  .route("/question/:questionId")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

router.route("/answer").post(createMultiChoice).put(updateMultiChoice);
// router.route("/answer/:multipleChoiceId").put();
router.get("/user", getAllUser);

module.exports = router;
