import { useContext, createContext, useReducer } from "react";

import { getDataFromLocalStorage } from "../helperFunctions";

export const DataContext = createContext<any>(null);

const DataProvider: React.FC = ({ children }: any) => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "changeStatus":
        return action.payload;
      case "addNewApplication":
        return action.payload;
      case "deleteApplication":
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

  const addNewApplication = (
    job_title: string,
    posting_link: string,
    company: string,
    found_via: string,
    office_loc: string,
    job_loc: string,
    linkedin_link: string,
    date: Date
  ) => {
    let copyOfData = [...data];

    const currentDate = new Date();

    const id = copyOfData.length;

    const appObject = {
      job_title,
      posting_link,
      company,
      found_via,
      office_loc,
      job_loc,
      linkedin_link,
      status: "Pending",
      id,
      date: currentDate,
    };

    copyOfData.unshift(appObject);

    localStorage.setItem("jobapps-data", JSON.stringify(copyOfData));

    dispatch({ type: "addNewApplication", payload: copyOfData });
  };

  const deleteApplication = (id: number) => {
    let copyOfData = [...data];

    const foundAppIndex = copyOfData.findIndex((app) => {
      return app.id === id;
    });

    console.log(foundAppIndex);

    copyOfData.splice(foundAppIndex, 1);

    localStorage.setItem("jobapps-data", JSON.stringify(copyOfData));

    dispatch({ type: "deleteApplication", payload: copyOfData });
  };

  const ctx: any = {
    data,
    changeStatus,
    addNewApplication,
    deleteApplication,
  };

  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>;
};

export default DataProvider;

export const useData = () => useContext(DataContext);
