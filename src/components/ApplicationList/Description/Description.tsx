import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  Divider,
  Badge,
} from "@chakra-ui/react";

import { IoIosArrowBack } from "react-icons/io";

import DeleteConfirmation from "../DeleteConfirmation";

import { ApplicationType } from "../ApplicationList";

import parse from "html-react-parser";

import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import StatusMenu from "../ApplicationListItem/StatusMenu";

import ConditionalLink from "./ConditionalLink";

import { determineBadgeColor } from "../../../helperFunctions";

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

  if (selectedApplication === null) {
    return (
      <Box
        h="100%"
        w="100%"
        minW="100%"
        p="0.2rem 0.2rem"
        overflowY="scroll"
        display="flex"
        justifyContent="center"
      ></Box>
    );
  }

  const parseHtmlFromDescription = (description: string) => {
    if (description === undefined || description === null) {
      return null;
    }
    return parse(description);
  };

  const {
    job_title,
    posting_link,
    company,
    found_via,
    office_loc,
    linkedin_link,
    jobType,
    status,
    id,
    date,
    descriptionFromLinkedin,
  } = selectedApplication;

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
      <Flex h="100%" maxW="94%" w="94%" direction="column">
        <Flex w="100%" align="center" justify="space-between" mb="0.5rem">
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

          <StatusMenu
            status={selectedApplication.status}
            id={selectedApplication.id}
          />
        </Flex>
        <Flex>
          <Flex
            justify="center"
            p="0.2rem 1rem"
            direction="column"
            maxW="75%"
            minW="75%"
            mb="1rem"
          >
            <Text fontSize="1.1rem" fontWeight="semibold">
              {job_title && (
                <>
                  <a href={posting_link}>{job_title}</a>
                  &nbsp;
                  {posting_link && (
                    <Icon p="0 0 0.2rem 0" as={FaExternalLinkAlt} />
                  )}
                </>
              )}
            </Text>
            <Text fontSize="0.9rem" p="0 0 0.2rem 0">
              {company}
            </Text>
            {jobType ? (
              <Badge
                colorScheme={determineBadgeColor(jobType)}
                w="fit-content"
                fontSize="0.6rem"
                userSelect="none"
              >
                {jobType}
              </Badge>
            ) : null}
          </Flex>
          <Flex
            direction="column"
            maxW="25%"
            minW="25%"
            p="0.2rem 0.1rem 0 0"
            align="flex-end"
          >
            {office_loc ? (
              <Flex align="center" fontSize="0.8rem">
                <Icon as={FaMapMarkerAlt} color="blue.700" fontSize="inherit" />
                <Text fontSize="inherit" fontWeight="medium" userSelect="none">
                  &nbsp;
                  {office_loc}
                </Text>
              </Flex>
            ) : null}
            <>
              {found_via ? (
                <ConditionalLink link={linkedin_link ?? null}>
                  {found_via}
                </ConditionalLink>
              ) : (
                ""
              )}
            </>
          </Flex>
        </Flex>
        {descriptionFromLinkedin ? (
          <>
            <Divider />
            <Flex h="auto" p="0.2rem 1rem">
              <Flex w="100%">
                <Text fontSize="1.2rem" opacity="0.7">
                  Description
                </Text>
              </Flex>
            </Flex>

            <Flex h="auto" p="0.2rem 1rem">
              <Flex w="100%">
                <Text fontSize="0.8rem">
                  {parseHtmlFromDescription(descriptionFromLinkedin)}
                </Text>
              </Flex>
            </Flex>
          </>
        ) : null}
        <Flex
          mt="auto"
          w="100%"
          align="center"
          p="0.2rem 0"
          justify="space-between"
        >
          <DeleteConfirmation
            application={selectedApplication}
            handleScroll={handleScroll}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Description;
