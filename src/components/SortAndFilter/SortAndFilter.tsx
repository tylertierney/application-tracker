import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

import { MdSort } from "react-icons/md";

interface Props {
  sortingBy: string;
  setSortingBy: Function;
}

const SortAndFilter: React.FC<Props> = ({ sortingBy, setSortingBy }) => {
  const menuItems = ["Status", "Date"];

  const menuItemsArray = menuItems.map((item, index) => {
    return (
      <MenuItem
        key={index}
        fontWeight="thin"
        onClick={() => setSortingBy(item)}
      >
        {item}
      </MenuItem>
    );
  });

  return (
    <Flex h="10%" w="100%" justify="flex-end" align="center">
      <Menu>
        <MenuButton as={Button} variant="ghost" size="sm">
          <Icon as={MdSort} color="gray" fontSize="2rem" />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Sort By">
            <MenuDivider />
            {menuItemsArray}
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortAndFilter;
