import React, { useEffect, useState } from "react";
import { updateMultiChoice, updateQuestionById } from "../modules/fetchAdmin";

const EditQuestion = ({ isOpen, onClose, questionData, fetchAllQuestion }) => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", correct: true },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ]);

  const handleCloseModal = () => {
    onClose(); // Menutup modal
  };

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAnswerChange = (index, e) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].answer = value;
      return updatedAnswers;
    });
  };

  const handleCorrectAnswerChange = (index, e) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].correct = value === "Benar"; // Assuming "Benar" means correct
      return updatedAnswers;
    });
  };

  // Update

  const handleUpdate = async () => {
    try {
      // update question
      const id = questionData.question_id;
      const data = {
        question: questionText,
      };
      await updateQuestionById(id, data);

      // update multiple choice
      answers.map(async (answer) => {
        await updateMultiChoice(answer);
      });

      fetchAllQuestion();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  useEffect(() => {
    if (questionData) {
      setQuestionText(questionData.question);
      setAnswers(questionData.multiplecoice);
    }
  }, [questionData]);

  // useEffect(() => {
  //   if (answers) {
  //     console.log(questionData);
  //     console.log(answers);
  //   }
  // }, [answers]);

  return (
    <>
      {isOpen && answers && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 opacity-75"
            onClick={handleCloseModal}
          ></div>
          <div className="relative bg-white rounded-2xl border shadow-xl p-10 max-w-7xl">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-5/6 text-center">
                Edit Question
              </h1>
              {/* Question */}
              <div className="flex justify-start w-[75vw]">
                <label
                  htmlFor="question"
                  className="block mb-2 justify-start w"
                >
                  Question:
                </label>
              </div>
              <textarea
                id="question"
                name="question"
                value={questionText}
                onChange={handleQuestionChange}
                className="resize-none border-2 rounded-lg w-[75vw] h-12 px-4"
              />
              {/* Multiple Answer */}
              <div className="flex justify-start w-[75vw]">
                <label className="block mb-2 justify-start w">Answers:</label>
              </div>
              {answers.map((answer, index) => (
                <div key={index} className="flex space-x-4">
                  <textarea
                    className="resize-none border-2 rounded-lg w-[65vw] h-16 px-4"
                    value={answer.answer}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                  <select
                    className="border-2 rounded-lg px-4 py-2"
                    value={answer.correct ? "Benar" : "Salah"} // Menentukan nilai default dropdown berdasarkan nilai correct
                    onChange={(e) => handleCorrectAnswerChange(index, e)}
                  >
                    <option value="Benar">Benar</option>
                    <option value="Salah">Salah</option>
                  </select>
                </div>
              ))}
              <button
                className="bg-green-500 text-white rounded-md font-semibold px-4 py-3 w-full 
              active:scale-95 active:duration-100 hover:bg-green-600"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditQuestion;
