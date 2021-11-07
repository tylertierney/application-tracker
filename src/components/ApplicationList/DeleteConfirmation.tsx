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
}

const DeleteConfirmation: React.FC<Props> = ({ application }) => {
  const { deleteApplication } = useData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    deleteApplication(application.id);
    onClose();
  };

  return (
    <>
      <Button
        transition="0.3s ease-in-out"
        variant="unstyled"
        opacity="0.5"
        _hover={{ opacity: "1" }}
        color="#696969"
        size="lg"
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
