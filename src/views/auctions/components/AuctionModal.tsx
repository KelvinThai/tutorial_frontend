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
  Image,
  Input,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { INftItem } from "@/_types_";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {
  nft?: INftItem;
  isProcessing?: boolean;
  onAuction?: (amount: number) => void;
}

export default function AuctionModal({ nft, isProcessing, onAuction, ...props }: IProps) {
  const [amount, setAmount] = React.useState<number>(0);
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
          <Flex alignItems="center" w="full" direction="column">
            <Heading mb="10px" color="rgba(255,255,255, 0.4)" fontWeight="bold">AUCTION</Heading>
            <Image
              src={nft?.image}
              alt={nft?.name}
              borderRadius="20px"
              w="80%"
              mb="20px"
            />
            <Flex w="full" direction="column">
              <Text fontSize="12px" fontStyle="italic" color="rgba(255,255,255,0.5)">Set your bid:</Text>
              <Flex w="full" my="10px">
                <Input w="full" value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" />
                <Text fontWeight="bold" fontSize="24px" position="absolute" right="40px" color="rgba(255,255,255, 0.4)">IPT</Text>
              </Flex>
              <Button variant="primary" onClick={() => onAuction && onAuction(amount)} disabled={!amount || isProcessing}>
                {isProcessing ? <Spinner /> : 'Place a bid'}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
