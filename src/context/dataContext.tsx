import { useContext, createContext, useReducer } from "react";

import {
  getDataFromLocalStorage,
  getInitialDataFromAPI,
} from "../helperFunctions";

import axios from "axios";

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
  // const [data, dispatch] = useReducer(reducer, getInitialDataFromAPI());

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
    jobType: string,
    linkedin_link: string,
    date: Date
  ) => {
    let copyOfData = [...data];

    console.log(jobType);

    const currentDate = new Date();

    const id = copyOfData.length;

    const appObject = {
      job_title,
      posting_link,
      company,
      found_via,
      office_loc,
      linkedin_link,
      jobType,
      status: "Pending",
      id,
      date: currentDate,
    };

    copyOfData.unshift(appObject);

    localStorage.setItem("jobapps-data", JSON.stringify(copyOfData));

    axios
      .post("/updatedata", { data: copyOfData })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

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
