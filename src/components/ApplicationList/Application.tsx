import { ApplicationType } from "../Home/Home";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
} from "@chakra-ui/react";

import DeleteConfirmation from "./DeleteConfirmation";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { determineBtnColor, determineBadgeColor } from "../../helperFunctions";
import { useData } from "../../context/dataContext";

import { useRef, useState } from "react";

interface Props {
  application: ApplicationType;
}

const ApplicationListItem: React.FC<Props> = ({ application }) => {
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
  } = application;

  const statusMenuItems = ["Pending", "Rejected", "Interview"];

  let convertedDate = "";
  if (date) {
    convertedDate = new Date(date).toLocaleDateString();
  }

  return (
    <li style={{ listStyleType: "none" }}>
      <Flex
        w="100%"
        direction="column"
        align="center"
        p="0.2rem 0.5rem"
        transition="0.1s ease-in-out"
        _hover={{ backgroundColor: "rgb(0, 0, 0, 0.1)" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Flex justify="space-around" align="center" p="0.5rem 0.5rem" w="100%">
          <Flex align="center" wrap="wrap">
            <a href={posting_link} style={{ marginRight: "1rem" }}>
              <Text
                maxW="240px"
                minW={["180px", "240px", "240px"]}
                fontSize={["0.8rem", "0.9rem", "1rem"]}
                fontWeight="bold"
              >
                {job_title}
              </Text>
            </a>
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
            <Menu>
              <MenuButton
                marginRight="0.5rem"
                as={Button}
                fontSize="0.8rem"
                minW="100px"
                maxW="100px"
                maxH="2rem"
                bgColor="transparent"
                border="solid 1px"
                borderColor={determineBtnColor(status)}
                color="gray"
                _hover={{ bgColor: "transparent" }}
                _focus={{ outline: "none" }}
              >
                {
                  <Text color={determineBtnColor(status)} as="span">
                    {status}
                  </Text>
                }
                <ChevronDownIcon
                  color={determineBtnColor(status)}
                  fontSize="1rem"
                />
              </MenuButton>
              <MenuList>
                {statusMenuItems.map((status, index) => {
                  return (
                    <MenuItem
                      key={index}
                      transition="0.3s ease-in-out"
                      _hover={{
                        bgColor: determineBtnColor(status),
                        color: "white",
                      }}
                      _focus={{
                        bgColor: determineBtnColor(status),
                        color: "white",
                      }}
                      onClick={() => changeStatus(id, status)}
                    >
                      {status}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
            <DeleteConfirmation
              isHovering={isHovering}
              application={application}
            />
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          p="0rem 0.5rem 0.3rem 0.5rem"
        >
          <Flex>
            {jobType ? (
              <Badge colorScheme={determineBadgeColor(jobType)} mr="0.5rem">
                {jobType}
              </Badge>
            ) : null}
            {office_loc ? (
              <Text fontSize="0.7rem">Office: {office_loc}</Text>
            ) : null}
          </Flex>
          <Flex>
            <Text fontSize="0.7rem" minW="80px" mr="0.5rem">
              {found_via ? `Found via ${found_via}` : ""}
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
