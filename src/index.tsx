import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import DataContextProvider from "./context/dataContext";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
