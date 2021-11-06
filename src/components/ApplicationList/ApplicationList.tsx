import { Box, Flex, Text, Divider } from "@chakra-ui/react";

import ApplicationListItem from "./Application";

import { useRef } from "react";

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
  const applicationListRef = useRef(null);

  const appArray = data?.map((app, index) => {
    return (
      <ApplicationListItem
        applicationListRef={applicationListRef}
        key={index}
        application={app}
      />
    );
  });

  console.log(applicationListRef);

  return (
    <Box
      w="100%"
      h="100%"
      borderRadius="10px"
      padding="0.5rem 0rem"
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
      display="inline-flex"
      overflowX="scroll"
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
      <Box h="100%" w="100%" minW="100%" border="solid red 1px">
        s
      </Box>
    </Box>
  );
};

export default ApplicationList;
