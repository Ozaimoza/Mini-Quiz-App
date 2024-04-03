import React, { useState, useEffect } from "react";
import { getAllQuestion, submitAnswers } from "../../modules/fetchUser";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const fetchAllQuestion = async () => {
    try {
      const response = await getAllQuestion();
      setQuestions(response.data);
      setSelectedQuestion(response.data[0]);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllQuestion();
  }, []);

  const handleAnswerSelection = (questionId, answerId) => {
    // Membuat objek jawaban baru
    const newAnswer = {
      question_id: questionId,
      user_choice: answerId,
    };

    // Mencari apakah jawaban untuk pertanyaan saat ini sudah ada di dalam array
    const existingAnswerIndex = selectedAnswers.findIndex(
      (answer) => answer.question_id === questionId
    );

    // Jika jawaban untuk pertanyaan saat ini sudah ada di dalam array, perbarui nilainya
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      setSelectedAnswers(updatedAnswers);
    } else {
      // Jika jawaban untuk pertanyaan saat ini belum ada di dalam array, tambahkan jawaban baru ke dalam array
      setSelectedAnswers((prevState) => [...prevState, newAnswer]);
    }
  };

  const handleSubmit = async () => {
    const data = {
      userAnswers: selectedAnswers,
    };

    const response = await submitAnswers(data);

    console.log(data);
  };

  return (
    <>
      <div className="flex p-8 gap-8 w-screen">
        <div className=" bg-gray-100 w-1/5 h-[75vh] rounded-lg">
          <div className=" flex flex-col text-center p-2 font-bold text-xl">
            Soal
          </div>
          <div className="grid grid-cols-5 gap-2 p-2 max-h-64 justify-stretch">
            {questions.map((question, index) => (
              <button
                className="cursor-pointer rounded-md bg-blue-100 text-blue-500 text-xl border-blue-500 border
            font-bold shadow-2xl hover:scale-110 transition active:scale-90 h-10 "
                key={index}
                onClick={() => setSelectedQuestion(question)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="border-dashed border-t-2 border-blue-500 p-2">
            <button
              className="cursor-pointer rounded-md bg-blue-100 text-blue-500 text-xl border-blue-500 border
            font-bold shadow-2xl hover:scale-105 transition active:scale-100 h-10 w-full"
              onClick={handleSubmit}
            >
              {" "}
              SUBMIT
            </button>
          </div>
        </div>
        <div className="bg-gray-100 w-4/5 h-[75vh] rounded-lg p-4">
          <div className=" flex flex-col text-center p-2 font-bold text-xl">
            Pertanyaan
          </div>
          {selectedQuestion && (
            <>
              <div className="p-2 text-xl">{selectedQuestion.question}</div>
              {selectedQuestion.multiplecoice.map((answer) => (
                <div
                  className="flex items-center mb-4"
                  key={answer.multiple_choice_id}
                >
                  <input
                    type="radio"
                    name="answer"
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    value={answer.multiple_choice_id}
                    checked={
                      selectedAnswers.find(
                        (answer) =>
                          answer.question_id === selectedQuestion.question_id
                      )?.user_choice === answer.multiple_choice_id
                    }
                    onChange={() =>
                      handleAnswerSelection(
                        selectedQuestion.question_id,
                        answer.multiple_choice_id
                      )
                    }
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    {answer.answer}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
