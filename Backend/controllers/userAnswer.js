const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UserAnswer {
  static SubmitAnswers = async (req, res) => {
    try {
      const { userAnswers } = req.body;

      // const userAnswers = [
      // { question_id: 5, user_choice: 11 },
      // { question_id: 6, user_choice: 13 },
      // { question_id: 4, user_choice: 7 },
      // { question_id: 7, user_choice: 18 },
      // { question_id: 8, user_choice: 21 },
      // ];

      const userId = req.user;

      // Menyimpan jawaban pengguna ke dalam database
      const savedAnswers = await Promise.all(
        userAnswers.map(async (answer) => {
          return await prisma.userAnswer.create({
            data: {
              user_id: parseInt(userId),
              question_id: answer.question_id,
              user_choice: answer.user_choice,
            },
          });
        })
      );

      // cek jawaban benar
      const getAllCorrectAnswer = await prisma.multipleChoice.findMany({
        where: {
          correct: true,
        },
      });

      // Objek untuk menyimpan hasil perbandingan
      const comparisonResult = {};

      // Loop melalui jawaban pengguna
      userAnswers.forEach((userAnswer) => {
        const { question_id, user_choice } = userAnswer;

        // Cari jawaban yang seharusnya berdasarkan question_id
        const correctAnswer = getAllCorrectAnswer.find(
          (answer) => answer.question_id === question_id
        );

        // Periksa apakah jawaban ditemukan
        if (correctAnswer) {
          // Bandingkan jawaban pengguna dengan jawaban yang seharusnya
          const isCorrect = user_choice == correctAnswer.multiple_choice_id;

          // Simpan hasil perbandingan
          comparisonResult[question_id] = isCorrect;
        }
      });

      let total = 0;

      // Iterasi melalui properti-properti objek
      for (const key in comparisonResult) {
        // Periksa jika nilai properti adalah true
        if (comparisonResult[key] === true) {
          // Tambahkan ke total
          total++;
        }
      }

      let score = Math.floor((total / getAllCorrectAnswer.length) * 100);

      //update score user
      const result = await prisma.user.update({
        where: { user_id: userId },
        data: {
          score: score,
        },
      });

      const response = {
        message: "Successfully submitted answers",
        data: result,
      };

      res.status(201).json(response);
      // res.status(201).json({ score, comparisonResult, getAllCorrectAnswer });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = UserAnswer;
