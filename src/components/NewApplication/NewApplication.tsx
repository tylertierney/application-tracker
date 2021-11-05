import { Flex, Text, Button, Input } from "@chakra-ui/react";

import { AddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { useState } from "react";

import { useData } from "../../context/dataContext";

import "./NewApplication.css";

const NewApplication = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [postingLink, setPostingLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [foundVia, setFoundVia] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [isShowingLinks, setShowingLinks] = useState(false);

  const { addNewApplication } = useData();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addNewApplication(
      jobTitle,
      postingLink,
      companyName,
      foundVia,
      officeLocation,
      jobType,
      linkedInLink
    );

    setJobTitle("");
    setCompanyName("");
    setPostingLink("");
    setLinkedInLink("");
    setFoundVia("");
    setOfficeLocation("");
    setJobType("");
  };

  return (
    <Flex
      direction="column"
      w="100%"
      height="100%"
      borderRadius="10px"
      mb="1rem"
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
      align="flex-start"
      p="0.5rem 0.5rem"
    >
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        <Flex w="100%" justify="space-around" align="center" mb="0.2rem">
          <Flex maxW="500px" flexWrap="wrap">
            <Flex align="center" mb="0.2rem" mr="0.8rem">
              <Text fontSize="0.8rem">Title:&nbsp;</Text>
              <Input
                maxW="380px"
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
                value={jobTitle}
              />
            </Flex>
            <Flex align="center">
              <Text fontSize="0.8rem">Company:&nbsp;</Text>
              <Input
                maxW="180px"
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </Flex>
          </Flex>
          <Flex align="center">
            <Button
              mr="0.5rem"
              type="submit"
              size="sm"
              colorScheme="blue"
              variant="solid"
            >
              <Text color="white" mr="0.3rem" fontSize="0.8rem">
                Add New
              </Text>
              <AddIcon />
            </Button>
            <Button
              size="sm"
              color="gray"
              variant="ghost"
              onClick={() => setShowingLinks(!isShowingLinks)}
              _focus={{ outline: "none" }}
            >
              {isShowingLinks ? <TriangleUpIcon /> : <TriangleDownIcon />}
            </Button>
          </Flex>
        </Flex>
        <Flex
          display={isShowingLinks ? "flex" : "none"}
          direction="column"
          w="100%"
        >
          <Flex align="center" mb="0.2rem">
            <Text fontSize="0.8rem" minW="100px">
              Posting Link&nbsp;
            </Text>
            <Input
              type="text"
              onChange={(e) => setPostingLink(e.target.value)}
              value={postingLink}
            />
          </Flex>
          <Flex align="center" mb="0.2rem">
            <Text fontSize="0.8rem" minW="100px">
              LinkedIn Link&nbsp;
            </Text>
            <Input
              type="text"
              onChange={(e) => setLinkedInLink(e.target.value)}
              value={linkedInLink}
            />
          </Flex>
          <Flex align="center" mb="0.2rem">
            <Text fontSize="0.8rem" minW="100px">
              Found Via&nbsp;
            </Text>
            <Input
              type="text"
              onChange={(e) => setFoundVia(e.target.value)}
              value={foundVia}
            />
          </Flex>
          <Flex align="center" mb="0.2rem">
            <Text fontSize="0.8rem" minW="100px">
              Office Location&nbsp;
            </Text>
            <Input
              type="text"
              onChange={(e) => setOfficeLocation(e.target.value)}
              value={officeLocation}
            />
          </Flex>
          <Flex align="center" mb="0.2rem">
            <Text minW="100px" fontSize="0.8rem">
              Job Type
            </Text>
            <Flex align="center" mr="1rem">
              <input
                onChange={(e) => setJobType(e.target.value)}
                className="radioInputs"
                value="Remote"
                type="radio"
                id="Remote"
                name="jobType"
              />
              <label
                htmlFor="Remote"
                style={{ fontSize: "0.8rem", color: "#696969" }}
              >
                Remote
              </label>
            </Flex>
            <Flex align="center" mr="1rem">
              <input
                onChange={(e) => setJobType(e.target.value)}
                className="radioInputs"
                value="On-site/Hybrid"
                type="radio"
                id="On-site/Hybrid"
                name="jobType"
              />
              <label
                htmlFor="On-site/Hybrid"
                style={{ fontSize: "0.8rem", color: "#696969" }}
              >
                On-site/Hybrid
              </label>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default NewApplication;
