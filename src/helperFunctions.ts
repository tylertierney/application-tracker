import axios from "axios";

export const determineBtnColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "blue.400";
    // break;
    case "Rejected":
      return "red.400";
    // break;
    case "Interview":
      return "green.400";
    // break;
    default:
      return "blue.400";
  }
};

export const determineBadgeColor = (jobType: string) => {
  switch (jobType) {
    case "Remote":
      return "blue";
    case "On-site/Hybrid":
      return "orange";
    default:
      return "blue";
  }
};

export const getDataFromLocalStorage = () => {
  const dataFromLocal: string | null = localStorage.getItem("jobapps-data");

  if (dataFromLocal === null) {
    return;
  }
  const parsedFromLocal: Array<Object> = JSON.parse(dataFromLocal);
  return parsedFromLocal;
};

export const getInitialDataFromAPI = () => {
  return axios
    .get("/api/applications")
    .then((res) => {
      console.log(res.data);
      return res;
    })
    .catch((err) => console.log(err));
};
