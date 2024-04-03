const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Choice {
  //create
  static createMultiChoice = async (req, res) => {
    try {
      const { question_id, answers } = req.body;

      const mappedAnswers = answers.map((answer) => ({
        question_id: question_id,
        answer: answer.answer,
        correct: answer.correct,
      }));

      const Data = await prisma.multipleChoice.createMany({
        data: mappedAnswers,
      });

      const response = {
        message: "success Created Answer",
        data: Data,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //update

  static updateMultiChoice = async (req, res) => {
    try {
      const { multiple_choice_id, answer, correct } = req.body;

      const Data = await prisma.multipleChoice.update({
        where: {
          multiple_choice_id: multiple_choice_id,
        },
        data: {
          answer: answer,
          correct: correct,
        },
      });

      const response = {
        message: "success Updated Answer",
        data: Data,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = Choice;
