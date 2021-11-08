import { Flex, Text, Box } from "@chakra-ui/react";

import NewApplication from "../NewApplication/NewApplication";
import SortAndFilter from "../SortAndFilter/SortAndFilter";
import ApplicationList from "../ApplicationList/ApplicationList";

import "./home.css";

import { useState } from "react";

import { isMobile } from "react-device-detect";

import smoothscroll from "smoothscroll-polyfill";

import { handleSort } from "../../helperFunctions";

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
  descriptionFromLinkedin: string;
}

interface IProps {
  data: ApplicationType[];
}

const Home: React.FC<IProps> = ({ data }) => {
  smoothscroll.polyfill();

  const [sortingBy, setSortingBy] = useState("");

  data = handleSort(sortingBy, data);

  const [newApplicationIsOpen, setNewApplicationIsOpen] = useState(false);

  return (
    <Flex
      minW="100vw"
      maxW="100vw"
      minH="100vh"
      maxH="100vh"
      height="100vh"
      p="1rem"
      justify="flex-start"
      align="center"
      direction="column"
      overflowY="hidden"
      overflowX="hidden"
    >
      <Box
        w="100%"
        h={isMobile ? "82vh" : "100vh"}
        maxW="800px"
        minW="380px"
        p="0.2rem 0.8rem"
        overflowY="hidden"
      >
        <NewApplication
          newApplicationIsOpen={newApplicationIsOpen}
          setNewApplicationIsOpen={setNewApplicationIsOpen}
        />
        <SortAndFilter sortingBy={sortingBy} setSortingBy={setSortingBy} />
        <Box height={newApplicationIsOpen ? "30%" : "80%"}>
          {data === undefined || data === null || typeof data === "string" ? (
            <Flex justify="center" align="center" w="100%" h="100%">
              <Text fontSize="1.5rem">Add an application to get started!</Text>
            </Flex>
          ) : (
            <ApplicationList
              data={data}
              newApplicationIsOpen={newApplicationIsOpen}
            />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
