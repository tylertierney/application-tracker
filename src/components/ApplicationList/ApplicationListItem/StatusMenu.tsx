import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { determineBtnColor } from "../../../helperFunctions";

import { useData } from "../../../context/dataContext";

interface Props {
  status: string;
  id: Number;
}

const StatusMenu: React.FC<Props> = ({ status, id }) => {
  const statusMenuItems = ["Pending", "Rejected", "Interview"];

  const { changeStatus } = useData();

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Number,
    status: string
  ) => {
    changeStatus(id, status);
    e.stopPropagation();
  };

  return (
    <Menu>
      <MenuButton
        marginRight="0.5rem"
        as={Button}
        fontSize="0.8rem"
        minW="100px"
        maxW="100px"
        maxH={["1.6rem", "2rem"]}
        bgColor="transparent"
        border="solid 1px"
        borderColor={determineBtnColor(status)}
        color="gray"
        _hover={{ bgColor: "transparent" }}
        _focus={{ outline: "none", bgColor: "transparent" }}
        onClick={(e) => e.stopPropagation()}
      >
        {
          <Text color={determineBtnColor(status)} as="span">
            {status}
          </Text>
        }
        <ChevronDownIcon color={determineBtnColor(status)} fontSize="1rem" />
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
              onClick={(e) => handleMenuItemClick(e, id, status)}
            >
              {status}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default StatusMenu;
