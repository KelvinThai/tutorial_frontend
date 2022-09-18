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
} from "@chakra-ui/react";
import { showTransactionHash } from "../utils";

interface IProps extends Omit<ModalProps, "children"> {
  hash?: string;
  title?: string;
}

export default function SuccessModal({ hash, title, ...props }: IProps) {
  const onNavigation = () => {
    if (window) {
      window.open(`https://testnet.bscscan.com/tx/${hash}`, '_blank');
    }
  };

  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur="2xl"
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <ModalContent py="30px">
        <ModalCloseButton />
        <ModalBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="full"
            direction="column"
          >
            <Text variant="notoSan" fontSize="20px">
              {title}
            </Text>
            <Text fontStyle="italic" fontSize="12px" mt="10px">
              (Your Transaction Successful!)
            </Text>

            <Button w="full" variant="primary" mt="20px" onClick={onNavigation}>
              {showTransactionHash(hash || "")}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
