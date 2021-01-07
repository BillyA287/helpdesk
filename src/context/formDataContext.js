import React, { useContext, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

// created context here
const FormDataContext = React.createContext();

// created a custom hook to help us use the context
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used with the FormData Provider");
  }
  return context;
};

// defining the data store for values which gets returned on line 24
export const FormDataProvider = (props) => {
  const localData = localStorage.getItem("data");
  const [globalFormData, setGlobalFormData] = useState(JSON.parse(localData));

  
  const history = useHistory();
  const { location } = history;

  const submitForm = (formData) => {
    localStorage.setItem("data", JSON.stringify(formData));
    setGlobalFormData(() => ({ ...formData }));
    history.push({
      ...location,
      pathname: "/dashboard",
    });
  };

  const contextValue = useMemo(
    () => ({ globalFormData, setGlobalFormData, submitForm }),
    [globalFormData, setGlobalFormData]
  );

  return <FormDataContext.Provider value={contextValue} {...props} />;
};
