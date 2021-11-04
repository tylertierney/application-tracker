// import ApplicationListItem from "../../ApplicationList/Application";
import ApplicationListItem from "../ApplicationList/Application";

import { Flex, Button, Text, Box } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import NewApplication from "../NewApplication/NewApplication";

import "./home.css";

export interface ApplicationType {
  job_title: string;
  posting_link: string;
  company: string;
  found_via: string;
  office_loc: string;
  job_loc: string;
  linkedin_link: string;
  status: string;
  id: number;
  date?: Date;
}

interface IProps {
  data: ApplicationType[];
}

const Home: React.FC<IProps> = ({ data }) => {
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
      <Box w="100%" h="100%" maxW="800px" minW="400px">
        <NewApplication />
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
        </ul>
      </Box>
    </Flex>
  );
};

export default Home;
