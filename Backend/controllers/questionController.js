const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Question {
  // Get All Question
  static getAllQuestion = async (req, res) => {
    try {
      const Data = await prisma.question.findMany({
        include: {
          multiplecoice: true,
        },
      });
      const response = {
        message: "success Get All Question",
        data: Data,
      };

      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
  // Get Question By Id
  static getQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;

      const Data = await prisma.question.findUnique({
        where: { question_id: parseInt(questionId) },
        include: {
          multiplecoice: true,
        },
      });

      const response = {
        message: "success Get Question",
        data: Data,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
  // Create Question
  static createQuestion = async (req, res) => {
    try {
      const admin_id = req.admin;
      // console.log(req.body);
      const { question } = req.body;

      const Data = await prisma.question.create({
        data: {
          question: question,
          admin_id: admin_id,
        },
      });

      const response = {
        message: "success Create Question",
        data: Data,
      };

      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  // Update Question
  static updateQuestion = async (req, res) => {
    try {
      const admin_id = req.admin;
      const { questionId } = req.params;
      const { question, correct_answer } = req.body;

      const Data = await prisma.question.update({
        where: {
          question_id: parseInt(questionId),
        },
        data: {
          question: question,
          admin_id: admin_id,
          correct_answer: correct_answer,
        },
      });

      const response = {
        message: "success Updated Question",
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

  static deleteQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const deleteAnswer = await prisma.multipleChoice.deleteMany({
        where: {
          question_id: parseInt(questionId),
        },
      });

      const deleteQuestion = await prisma.question.delete({
        where: {
          question_id: parseInt(questionId),
        },
      });

      const response = {
        message: "success Deleted Question",
        data: { question: deleteQuestion, answer: deleteAnswer },
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

module.exports = Question;
