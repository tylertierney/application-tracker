import { ApplicationType } from "../../Home/Home";
import { Flex, Text, Badge, Icon } from "@chakra-ui/react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import {
  determineBadgeColor,
  determineBtnColor,
} from "../../../helperFunctions";

import { useRef, useState } from "react";

interface applicationListRefType {
  current: any;
}

interface Props {
  application: ApplicationType;
  applicationListRef: applicationListRefType;
  setSelectedApplication: Function;
}

const ApplicationListItem: React.FC<Props> = ({
  application,
  applicationListRef,
  setSelectedApplication,
}) => {
  const listItemRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  const {
    job_title,
    posting_link,
    company,
    // found_via,
    office_loc,
    // linkedin_link,
    jobType,
    status,
    // id,
    date,
    // descriptionFromLinkedin,
  } = application;

  let convertedDate = "";
  if (date) {
    convertedDate = new Date(date).toLocaleDateString();
  }

  const handleClick = () => {
    setIsHovering(() => true);
    const maxScrollWidth = applicationListRef.current.clientWidth;
    applicationListRef.current.scrollTo({
      top: 0,
      left: maxScrollWidth,
      behavior: "smooth",
    });
    setSelectedApplication(() => application);
  };

  return (
    <li style={{ listStyleType: "none" }}>
      <Flex
        w="100%"
        direction="column"
        align="center"
        p="0.2rem 0.5rem"
        transition="0.1s ease-in-out"
        _hover={isHovering ? { backgroundColor: "rgb(0 , 0, 0, 0.1)" } : {}}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
        ref={listItemRef}
        cursor="pointer"
      >
        <Flex justify="space-around" align="center" p="0.5rem 0.5rem" w="100%">
          <Flex align="center" wrap="wrap">
            <Flex maxW="240px" minW={["180px", "240px", "240px"]}>
              <Text
                userSelect="none"
                fontSize={["0.9rem", "0.9rem", "1rem"]}
                fontWeight="bold"
              >
                <a href={posting_link} style={{ marginRight: "1rem" }}>
                  {job_title}
                </a>
              </Text>
            </Flex>
            <Text
              minW="160px"
              textAlign="left"
              fontSize={["0.8rem", "0.9rem", "1rem"]}
              maxW={["140px", "160px", "200px"]}
              userSelect="none"
            >
              {company}
            </Text>
          </Flex>
          <Flex align="center" justify="space-around" ml="auto">
            <Icon
              transition="0.05s ease-in-out"
              opacity={isHovering ? "0.5" : "0"}
              fontSize="1.5rem"
              cursor="pointer"
              as={IoIosArrowForward}
            />
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          paddingBottom="0.3rem"
          paddingX="0.5rem"
        >
          <Flex>
            {jobType ? (
              <Badge
                colorScheme={determineBadgeColor(jobType)}
                mr="0.5rem"
                fontSize="0.6rem"
                userSelect="none"
              >
                {jobType}
              </Badge>
            ) : null}
            {office_loc ? (
              <Flex align="center" fontSize="0.7rem">
                <Icon as={FaMapMarkerAlt} color="blue.700" fontSize="inherit" />
                <Text fontSize="inherit" fontWeight="medium" userSelect="none">
                  &nbsp;
                  {office_loc}
                </Text>
              </Flex>
            ) : null}
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            minW="120px"
            fontSize="0.65rem"
          >
            <Text
              filter="brightness(75%)"
              color={determineBtnColor(status)}
              border="solid 1px"
              borderRadius="5px"
              borderColor={determineBtnColor(status)}
              p="0.1rem 0.4rem"
              mr="0.5rem"
              fontSize="inherit"
              userSelect="none"
            >
              {status}
            </Text>
            <Text fontSize="inherit">
              {date === undefined || date === null ? "" : convertedDate}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </li>
  );
};

export default ApplicationListItem;
