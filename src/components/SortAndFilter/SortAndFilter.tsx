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
  return (
    <Flex w="100%" justify="flex-end">
      <Menu>
        <MenuButton>
          <Button variant="unstyled">
            <Icon as={MdSort} color="gray" fontSize="2rem" />
          </Button>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Sort By">
            <MenuDivider />
            <MenuItem fontWeight="thin" onClick={() => setSortingBy("Status")}>
              Status
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortAndFilter;
