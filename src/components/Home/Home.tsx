// import ApplicationListItem from "../../ApplicationList/Application";
import ApplicationListItem from "../ApplicationList/Application";

import { Flex, Text, Box } from "@chakra-ui/react";

import NewApplication from "../NewApplication/NewApplication";
import SortAndFilter from "../SortAndFilter/SortAndFilter";

import "./home.css";

import { useState } from "react";
import { getInitialDataFromAPI } from "../../helperFunctions";
import axios from "axios";

export interface ApplicationType {
  job_title: string;
  posting_link: string;
  company: string;
  found_via: string;
  office_loc: string;
  linkedin_link: string;
  jobType: string;
  status: string;
  id: number;
  date?: Date;
}

interface IProps {
  data: ApplicationType[];
}

const Home: React.FC<IProps> = ({ data }) => {
  const [sortingBy, setSortingBy] = useState("");

  if (sortingBy === "Status") {
    data.sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
  }

  const appArray = data.map((app, index) => {
    return <ApplicationListItem key={index} application={app} />;
  });

  return (
    <Flex
      minW="100vw"
      minH="100vh"
      p="1rem"
      justify="flex-start"
      align="center"
      direction="column"
    >
      <Box w="100%" h="100%" maxW="800px" minW="380px">
        <button onClick={() => console.log(getInitialDataFromAPI())}>
          api
        </button>
        <NewApplication />
        <SortAndFilter sortingBy={sortingBy} setSortingBy={setSortingBy} />
        <ul
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            padding: "0.5rem 0rem",
            boxShadow: "0px 0px 10px 1px rgb(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
        >
          {appArray}
          <Flex w="100%" p="0.2rem 0.8rem" justify="flex-end">
            <Text fontSize="0.8rem">Total: {data.length}</Text>
          </Flex>
        </ul>
      </Box>
    </Flex>
  );
};

export default Home;
