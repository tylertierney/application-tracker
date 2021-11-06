import { Box, Flex, Button, Icon, Text, Divider } from "@chakra-ui/react";

import { IoIosArrowBack } from "react-icons/io";

import DeleteConfirmation from "../DeleteConfirmation";

import { ApplicationType } from "../ApplicationList";

interface applicationListRefType {
  current: any;
}

interface Props {
  applicationListRef: applicationListRefType;
  selectedApplication: ApplicationType | null;
}

const Description: React.FC<Props> = ({
  applicationListRef,
  selectedApplication,
}) => {
  const handleScroll = () => {
    applicationListRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  console.log(selectedApplication);

  if (selectedApplication === null) {
    return <Box></Box>;
  }

  const parseHtmlFromDescription = (description: string) => {
    const parser = new DOMParser();
    const htmlOutput = parser.parseFromString(description, "text/html");
    const bodyFromHtml = htmlOutput.querySelector("body");
    if (bodyFromHtml === null) {
      return null;
    }
    console.log(bodyFromHtml.innerHTML);
    return bodyFromHtml;
  };

  parseHtmlFromDescription(selectedApplication.descriptionFromLinkedin);

  return (
    <Box
      h="100%"
      w="100%"
      minW="100%"
      p="0.2rem 0.2rem"
      overflowY="scroll"
      display="flex"
      justifyContent="center"
    >
      <Box h="100%" maxW="94%" w="94%">
        <Flex w="100%" align="center" justify="space-between">
          <Button
            variant="unstyled"
            size="sm"
            onClick={() => handleScroll()}
            _focus={{ outline: "none" }}
          >
            <Flex align="center" opacity="0.5">
              <Icon fontSize="2rem" as={IoIosArrowBack} color="#696969" />
              <Text as="span" fontSize="1rem">
                Back
              </Text>
            </Flex>
          </Button>
          {/* <DeleteConfirmation  /> */}
        </Flex>
        {selectedApplication.descriptionFromLinkedin ? (
          <>
            <Flex h="auto" p="0.2rem 1rem">
              <Flex w="100%">
                <Text fontSize="1.2rem" opacity="0.7">
                  Description
                </Text>
              </Flex>
            </Flex>
            <Divider />
            <Flex h="auto" p="0.2rem 1rem">
              <Flex w="100%">
                {/* <Text fontSize="0.8rem" opacity="0.7">
                  {parseHtmlFromDescription(
                    selectedApplication.descriptionFromLinkedin
                  )}
                </Text> */}
                {parseHtmlFromDescription(
                  selectedApplication.descriptionFromLinkedin
                )}
              </Flex>
            </Flex>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Description;
