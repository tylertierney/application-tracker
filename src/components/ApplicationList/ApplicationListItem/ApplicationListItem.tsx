import { ApplicationType } from "../../Home/Home";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  Icon,
} from "@chakra-ui/react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import DeleteConfirmation from "../DeleteConfirmation";

import { isMobile } from "react-device-detect";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  determineBtnColor,
  determineBadgeColor,
} from "../../../helperFunctions";
import { useData } from "../../../context/dataContext";

import { useRef, useState } from "react";

import StatusMenu from "./StatusMenu";

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

  const { changeStatus } = useData();

  const {
    job_title,
    posting_link,
    company,
    found_via,
    office_loc,
    // linkedin_link,
    jobType,
    status,
    id,
    date,
    descriptionFromLinkedin,
  } = application;

  let convertedDate = "";
  if (date) {
    convertedDate = new Date(date).toLocaleDateString();
  }

  const handleClick = () => {
    setIsHovering(true);
    const maxScrollWidth = applicationListRef.current.clientWidth;
    applicationListRef.current.scrollTo({
      top: 0,
      left: maxScrollWidth,
      behavior: "smooth",
    });
    setSelectedApplication(application);
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
        onClick={() => handleClick()}
        ref={listItemRef}
      >
        <Flex justify="space-around" align="center" p="0.5rem 0.5rem" w="100%">
          <Flex align="center" wrap="wrap">
            <Flex
              maxW="240px"
              minW={["180px", "240px", "240px"]}
              userSelect="none"
            >
              <a href={posting_link} style={{ marginRight: "1rem" }}>
                <Text fontSize={["0.8rem", "0.9rem", "1rem"]} fontWeight="bold">
                  {job_title}
                </Text>
              </a>
            </Flex>
            <Text
              minW="160px"
              textAlign="left"
              fontSize={["0.8rem", "0.9rem", "1rem"]}
              maxW={["140px", "160px", "200px"]}
            >
              {company}
            </Text>
          </Flex>
          <Flex align="center" justify="space-around" ml="auto">
            <StatusMenu id={id} status={status} />
            <Icon
              transition="0.05s ease-in-out"
              opacity={isHovering ? "0.5" : "0"}
              fontSize="1.5rem"
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
              >
                {jobType}
              </Badge>
            ) : null}
            {office_loc ? (
              <Flex align="center" fontSize="0.7rem">
                <Icon as={FaMapMarkerAlt} color="blue.700" fontSize="inherit" />
                <Text fontSize="inherit" fontWeight="medium">
                  &nbsp;
                  {office_loc}
                </Text>
              </Flex>
            ) : null}
          </Flex>
          <Flex>
            <Text fontSize="0.7rem" minW="80px" mr="0.5rem">
              {found_via ? `via ${found_via}` : ""}
            </Text>
            <Text fontSize="0.7rem">
              {date === undefined || date === null ? "" : convertedDate}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </li>
  );
};

export default ApplicationListItem;
