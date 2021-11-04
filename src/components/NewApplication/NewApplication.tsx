import { Flex, Text, Button, Input } from "@chakra-ui/react";

import { AddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { useState } from "react";

import { useData } from "../../context/dataContext";

const NewApplication = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [postingLink, setPostingLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [isShowingLinks, setShowingLinks] = useState(false);

  const { addNewApplication } = useData();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addNewApplication(jobTitle, companyName, postingLink, linkedInLink);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex
        direction="column"
        w="100%"
        height="100%"
        borderRadius="10px"
        maxW="800px"
        mb="1rem"
        boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
        align="flex-start"
        p="0.5rem 0.5rem"
      >
        <Flex width="100%" justify="space-between" align="center" mb="0.2rem">
          <Flex align="center" maxW="380px">
            <Text fontSize="0.8rem">Job Title:&nbsp;</Text>
            <Input
              type="text"
              onChange={(e) => setJobTitle(e.target.value)}
              value={jobTitle}
            />
          </Flex>
          <Flex align="center" maxW="380px">
            <Text fontSize="0.8rem">Company Name:&nbsp;</Text>
            <Input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
          </Flex>
          <Button type="submit" size="sm" colorScheme="blue" variant="solid">
            <Text color="white" mr="0.3rem" fontSize="0.8rem">
              Add New
            </Text>
            <AddIcon />
          </Button>
          <Button
            size="xs"
            color="gray"
            variant="ghost"
            onClick={() => setShowingLinks(!isShowingLinks)}
          >
            {isShowingLinks ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </Button>
        </Flex>
        <Flex
          display={isShowingLinks ? "flex" : "none"}
          justify="space-around"
          w="100%"
        >
          <Flex align="center" maxW="380px">
            <Text fontSize="0.8rem">Posting Link:&nbsp;</Text>
            <Input
              type="text"
              onChange={(e) => setPostingLink(e.target.value)}
              value={postingLink}
            />
          </Flex>
          <Flex align="center" maxW="380px">
            <Text fontSize="0.8rem">LinkedIn Link:&nbsp;</Text>
            <Input
              type="text"
              onChange={(e) => setLinkedInLink(e.target.value)}
              value={linkedInLink}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default NewApplication;
