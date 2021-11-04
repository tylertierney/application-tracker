import { useContext, createContext, useReducer } from "react";

import { getDataFromLocalStorage } from "../helperFunctions";

export const DataContext = createContext<any>(null);

const DataProvider: React.FC = ({ children }: any) => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "changeStatus":
        return action.payload;
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, getDataFromLocalStorage());

  const changeStatus = (id: number, newStatus: string) => {
    let copyOfData = [...data];

    copyOfData.forEach((app) => {
      if (app.id === id) {
        app.status = newStatus;
      }
    });

    localStorage.setItem("jobapps-data", JSON.stringify(copyOfData));

    dispatch({ type: "changeStatus", payload: copyOfData });
  };

  const ctx: any = {
    data,
    changeStatus,
  };

  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>;
};

export default DataProvider;

export const useData = () => useContext(DataContext);
