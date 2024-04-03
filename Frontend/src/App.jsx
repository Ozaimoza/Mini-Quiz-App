import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "./routes/adminRoute";
import { AppProvider } from "./components/AppContex";
import UserRouter from "./routes/userRoute";

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
