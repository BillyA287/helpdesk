import React, { useState, createContext } from "react";

export const FormsContext = createContext();

export const FormsProvider = (props) => {
  // hook for staff data
  let newRow = [];
  const [staffRows, setStaffRows] = useState(newRow);

  //hook for ticket data
  let row = [];
  const [rows, setRows] = useState(row);

  return (
    <FormsContext.Provider
      value={{ staffRows: [staffRows, setStaffRows], rows: [rows, setRows] }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};

