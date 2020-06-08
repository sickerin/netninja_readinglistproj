import React, { createContext, useReducer, useEffect } from "react";
import bookReducer from "../reducers/bookReducer";

export const BookContext = createContext();

// ? why does it take in props??
export const BookContextProvider = (props) => {
  const initData = [
    { title: "book1", author: "1", id: 1 },
    { title: "book2", author: "2", id: 2 },
    { title: "book3", author: "3", id: 3 },
  ];
  const [books, dispatch] = useReducer(bookReducer, initData, () => {
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : initData;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
