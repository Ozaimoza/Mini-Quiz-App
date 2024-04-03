import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

export function AppProvider({ children }) {
  const token = Cookies.get("token");
  // const userid = Cookies.get("currentUser");
  // console.log(userid);
  return (
    <AppContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
