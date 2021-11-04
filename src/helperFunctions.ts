export const determineBadgeColor = (status: string) => {
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

export const getDataFromLocalStorage = () => {
  const dataFromLocal: string | null = localStorage.getItem("jobapps-data");

  if (dataFromLocal === null) {
    return;
  }
  const parsedFromLocal: Array<Object> = JSON.parse(dataFromLocal);
  return parsedFromLocal;
};
