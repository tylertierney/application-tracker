import { Flex, Text, Button, Input } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import { useState } from "react";

const NewApplication = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  return (
    <Flex
      width="100%"
      height="100%"
      borderRadius="10px"
      p="0.5rem 0.5rem"
      maxW="800px"
      justify="space-between"
      align="center"
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
      mb="1rem"
    >
      <Flex align="center" maxW="380px">
        <Text minW="80px">Job Title:&nbsp;</Text>
        <Input
          type="text"
          onChange={(e) => setJobTitle(e.target.value)}
          value={jobTitle}
        />
      </Flex>
      <Flex align="center" maxW="380px">
        <Text minW="80px" fontSize="0.8rem">
          Company Name:&nbsp;
        </Text>
        <Input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
      </Flex>
      <Button size="sm" colorScheme="blue" variant="solid">
        <Text color="white" mr="0.3rem" fontSize="0.8rem">
          Add New
        </Text>
        <AddIcon />
      </Button>
    </Flex>
  );
};

export default NewApplication;
