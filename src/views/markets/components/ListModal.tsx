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
} from "@chakra-ui/react";
import { INftItem } from "@/_types_";
import React from "react";
import DatePicker from "react-datepicker";

interface IProps extends Omit<ModalProps, "children"> {
  type: "LISTING" | "AUCTION";
  nft?: INftItem;
  isListing?: boolean;
  onList?: (amount: number, expireDate?: Date | null) => void;
}

export default function ListModal({
  type,
  nft,
  isListing,
  onList,
  ...props
}: IProps) {
  const [amount, setAmount] = React.useState<number>(0);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());

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
            <Image
              src={nft?.image}
              alt={nft?.name}
              borderRadius="20px"
              w="80%"
              mb="20px"
            />
            <Flex w="full" direction="column">
              <Text fontWeight="bold">
                {" "}
                {type === "LISTING" ? "Price listing: " : "Reserve price"}{" "}
              </Text>
              <Text
                fontSize="12px"
                fontStyle="italic"
                color="rgba(255,255,255,0.5)"
              >
                Set your price:
              </Text>
              <Flex w="full" my="10px">
                <Input
                  w="full"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                />
                <Text
                  fontWeight="bold"
                  fontSize="24px"
                  position="absolute"
                  right="40px"
                  color="rgba(255,255,255, 0.4)"
                >
                  IPT
                </Text>
              </Flex>

              {type === "AUCTION" && (
                <>
                  <Text fontWeight="bold" mb="10px">
                    Expiration date:
                  </Text>
                  <Flex
                    border="0.2px solid rgba(255,255,255,0.2)"
                    px="10px"
                    py="10px"
                    borderRadius="6px"
                    mb="10px"
                  >
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      locale="pt-BR"
                      showTimeSelect
                      timeFormat="p"
                      timeIntervals={15}
                      dateFormat="Pp"
                      className="bg-transparent"
                    />
                  </Flex>
                </>
              )}
              <Button
                variant="primary"
                onClick={() => onList && onList(amount, startDate)}
                disabled={!amount || isListing}
              >
                {isListing ? <Spinner /> : (type === 'AUCTION' ? 'Auction Now' : 'List Now') }
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
