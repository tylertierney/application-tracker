import React from "react";
import Home from "./components/Home/Home";
// import data from "./data.json";
import { useData } from "./context/dataContext";
import { Box } from "@chakra-ui/react";

const App = () => {
  const { data, changeStatus } = useData();

  console.log(data);
  return (
    <Box overflowX="hidden">
      <Home data={data} />
    </Box>
  );
};

export default App;
