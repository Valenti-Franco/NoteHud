"use client";

import React, { useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";

// Create a new context for the global state
export const GlobalStateContext = createContext();

const SessionContext = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState("");
  const [categories, setCategories] = useState([]);

  return (
    <SessionProvider>
      {/* Provide the global state to the children components */}
      <GlobalStateContext.Provider
        value={{
          selectedCategories,
          setSelectedCategories,
          categories,
          setCategories,
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    </SessionProvider>
  );
};

export default SessionContext;
