import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Text,
} from "@chakra-ui/react";

import { FiTrash } from "react-icons/fi";
import { useData } from "../../context/dataContext";

import { ApplicationType } from "../Home/Home";
interface Props {
  application: ApplicationType;
  isHovering: Boolean;
}

const DeleteConfirmation: React.FC<Props> = ({ application, isHovering }) => {
  const { deleteApplication } = useData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    deleteApplication(application.id);
    onClose();
  };

  return (
    <>
      <Button
        opacity={isHovering ? "1" : "0"}
        transition="0.1s ease-in-out"
        variant="unstyled"
        _hover={{ opacity: "0.5" }}
        size="sm"
        onClick={onOpen}
      >
        <Icon as={FiTrash} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Application</ModalHeader>
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody>
            Are you sure you want to delete the job application for{" "}
            <Text as="span" fontWeight="bold">
              {application.job_title}
            </Text>{" "}
            at{" "}
            <Text as="span" fontWeight="bold">
              {application.company}
            </Text>
            ?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => handleClick()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
