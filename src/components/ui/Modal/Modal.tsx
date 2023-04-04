import { ModalType } from "@/types/types";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export type CustomModalProps = {
  modal: ModalType;
  onClose: () => void;
  handleClick: () => void;
};

const CustomModal = ({ modal, onClose, handleClick }: CustomModalProps) => {
  return (
    <Modal isOpen={modal.isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="medium">{modal.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody whiteSpace="pre-wrap">{modal.body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            送信する
          </Button>
          <Button colorScheme="gray"  onClick={onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
