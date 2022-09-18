import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalBody,
  Text,
  Button,
  Flex,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { showTransactionHash } from "../utils";

interface IProps extends Omit<ModalProps, "children"> {
  hash?: string;
  title?: string;
}

export default function ProcessingModal({ hash, title, ...props }: IProps) {
  
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur="2xl"
        bg="blackAlpha.300"
        backdropFilter="blur(20px)"
      />
      <ModalContent py="30px" bg="rgba(0, 0, 0, 0.6)">
        <ModalBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="full"
            direction="column"
          >           
          <Spinner size="lg" />
          <Text mt="20px" fontStyle="italic" fontSize="12px">Your transaction is processing please wait</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
