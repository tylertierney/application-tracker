import React from "react";
import Home from "./components/Home/Home";
import { useData } from "./context/dataContext";
import { Box } from "@chakra-ui/react";

const App = () => {
  const { data } = useData();

  return (
    <Box overflowX="hidden">
      <Home data={data} />
    </Box>
  );
};

export default App;
