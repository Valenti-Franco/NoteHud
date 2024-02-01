"use client";
import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
