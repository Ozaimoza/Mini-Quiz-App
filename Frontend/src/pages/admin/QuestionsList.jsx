import React, { useEffect, useState } from "react";
import QuestionForm from "../../components/QuestionForm";
import { getAllQuestion } from "../../modules/fetchAdmin";
import EditQuestion from "../../components/editQuestionForm";
import Alert from "../../components/Alert";

const QuestionList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [deletedQuestion, setDeletedQuestion] = useState(null);

  // modal create
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal delete
  const openModalDel = (question) => {
    setDeletedQuestion(question);
    setModalDelOpen(true);
  };
  const closeModalDel = () => {
    setModalDelOpen(false);
  };

  // modal edit
  const openModalEdit = (question) => {
    setSelectedQuestion(question);
    setModalEditOpen(true);
  };
  const closeModalEdit = () => {
    setModalEditOpen(false);
  };

  const fetchAllQuestion = async () => {
    try {
      const response = await getAllQuestion();
      setQuestion(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllQuestion();
  }, []);

  return (
    <>
      <div className="bg-slate-50 w-full h-screen ">
        <div className="flex flex-col justify-center h-full">
          <div className="px-3 py-4 flex justify-center mx-52">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">
                    <h1 className="text-3xl">Question</h1>
                  </th>

                  <th className="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={openModal}
                    >
                      Create
                    </button>
                  </th>
                </tr>
                {question.map((question) => (
                  <tr
                    className="border-b hover:bg-gray-200 bg-gray-100"
                    key={question.question_id}
                  >
                    <td className="p-3 px-5">
                      <a href="">{question.question}</a>
                    </td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded 
                                    focus:outline-none focus:shadow-outline"
                        onClick={() => openModalEdit(question)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        // onClick={() => handleDelete(question.question_id)}
                        onClick={() => openModalDel(question)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <QuestionForm
        isOpen={modalOpen}
        onClose={closeModal}
        fetchAllQuestion={fetchAllQuestion}
      />
      <EditQuestion
        isOpen={modalEditOpen}
        onClose={closeModalEdit}
        questionData={selectedQuestion}
        fetchAllQuestion={fetchAllQuestion}
      />
      <Alert
        isOpen={modalDelOpen}
        onClose={closeModalDel}
        questionData={deletedQuestion}
        fetchAllQuestion={fetchAllQuestion}
      />
    </>
  );
};

export default QuestionList;
