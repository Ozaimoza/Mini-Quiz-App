import React from "react";
import { deleteQuestion } from "../modules/fetchAdmin";

const Alert = ({ isOpen, onClose, fetchAllQuestion, questionData }) => {
  const handleCloseModal = () => {
    onClose(); // Menutup modal
  };

  const handleDelete = async (id) => {
    try {
      //   console.log(id);
      await deleteQuestion(id);

      fetchAllQuestion();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-gray-800 bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p className="mb-4">
              Are you sure you want to delete this Question ?
            </p>
            <p className="mb-4">{questionData.question}</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(questionData.question_id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
