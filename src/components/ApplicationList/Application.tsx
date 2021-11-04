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
import { determineBadgeColor } from "../../helperFunctions";
import { useData } from "../../context/dataContext";

interface Props {
  application: ApplicationType;
}

const ApplicationListItem: React.FC<Props> = ({ application }) => {
  const { changeStatus } = useData();

  const {
    job_title,
    posting_link,
    company,
    found_via,
    office_loc,
    // job_loc,
    // linkedin_link,
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
        _hover={{ backgroundColor: "rgb(0, 0, 0, 0.05)" }}
      >
        <Flex justify="space-around" align="center" p="0.5rem 0.5rem" w="100%">
          <a href={posting_link} style={{ marginRight: "auto" }}>
            <Text
              maxW="240px"
              minW="240px"
              fontSize={["0.8rem", "0.9rem", "1rem"]}
              fontWeight="bold"
            >
              {job_title}
            </Text>
          </a>
          <Text
            // mr="100px"
            minW="120px"
            textAlign="left"
            fontSize={["0.8rem", "0.9rem", "1rem"]}
            maxW={["140px", "160px", "200px"]}
          >
            {company}
          </Text>
          <Flex align="center" justify="space-around" ml="auto">
            <Menu>
              <MenuButton
                marginRight="0.5rem"
                as={Button}
                // bgColor={determineBadgeColor(status)}
                // _hover={{ opacity: "1" }}
                // _focus={{
                //   backgroundColor: determineBadgeColor(status),
                // }}
                fontSize="0.8rem"
                minW="100px"
                maxW="100px"
                maxH="2rem"
                bgColor="transparent"
                border="solid 1px"
                borderColor={determineBadgeColor(status)}
                color="gray"
              >
                {
                  <Text color={determineBadgeColor(status)} as="span">
                    {status}
                  </Text>
                }
                <ChevronDownIcon color="gray" fontSize="1rem" />
              </MenuButton>
              <MenuList>
                {statusMenuItems.map((status, index) => {
                  return (
                    <MenuItem
                      key={index}
                      transition="0.3s ease-in-out"
                      _hover={{
                        bgColor: determineBadgeColor(status),
                        color: "white",
                      }}
                      _focus={{
                        bgColor: determineBadgeColor(status),
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
            <DeleteConfirmation application={application} />
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" w="100%" p="0rem 0.5rem">
          <Flex>
            <Badge colorScheme="blue" mr="0.5rem">
              Remote
            </Badge>
            <Text fontSize="0.7rem">Office: {office_loc}</Text>
          </Flex>
          <Flex>
            <Text fontSize="0.7rem" minW="80px">
              {found_via ? `Found via: ${found_via}` : ""}
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
