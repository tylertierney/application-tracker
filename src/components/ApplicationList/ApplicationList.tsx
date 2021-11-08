import { Box, Flex, Text, Divider } from "@chakra-ui/react";

import ApplicationListItem from "./ApplicationListItem/ApplicationListItem";

import { useRef, useState } from "react";

import Description from "./Description/Description";

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

interface Props {
  data: ApplicationType[];
  newApplicationIsOpen: Boolean;
}

const ApplicationList: React.FC<Props> = ({ data, newApplicationIsOpen }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const applicationListRef = useRef(null);

  const appArray = data?.map((app, index) => {
    return (
      <ApplicationListItem
        applicationListRef={applicationListRef}
        key={index}
        application={app}
        setSelectedApplication={setSelectedApplication}
      />
    );
  });

  return (
    <Box
      w="100%"
      h="100%"
      borderRadius="10px"
      padding="0.5rem 0rem"
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
      display="inline-flex"
      overflowX="hidden"
      className="hideScrollbar"
      ref={applicationListRef}
    >
      <Box h="100%" w="100%" minW="100%">
        <Box height="94%" overflowY="scroll" overflowX="hidden">
          <ul>
            <>{appArray}</>
          </ul>
          <Divider />
        </Box>
        <Flex
          height="6%"
          boxShadow="0px -14px 20px 0px rgb(0, 0, 0, 0.05)"
          w="100%"
          p="0.2rem 0.8rem"
          justify="flex-end"
          fontSize={newApplicationIsOpen ? "0.6rem" : "1.1rem"}
        >
          <Text fontSize="inherit">Total:&nbsp;</Text>
          <Text fontSize="inherit" fontWeight="bold">
            {data.length}
          </Text>
        </Flex>
      </Box>
      <Description
        applicationListRef={applicationListRef}
        selectedApplication={selectedApplication}
      />
    </Box>
  );
};

export default ApplicationList;
