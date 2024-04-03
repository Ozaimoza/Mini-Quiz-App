import React, { useEffect, useState } from "react";
import { getAllUser } from "../../modules/fetchAdmin";

const UserList = () => {
  const [user, setUser] = useState([]);

  const fetchAllUser = async () => {
    try {
      const response = await getAllUser();

      if (!response) {
        return "No Users";
      }

      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch data:", err.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
      <div className="bg-slate-50 w-full h-screen ">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Users</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Score</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {user.map((user) => (
                      <tr key={user.user_id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {user.full_name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div
                            className={`text-left font-medium ${
                              user.score < 70
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {user.score ? user.score : 0}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
