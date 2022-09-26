import { numberFormat } from "@/utils";
import { Clarity, INftItem, ActionType, IAuctionInfo } from "@/_types_";
import {
  Flex,
  Image,
  Box,
  Text,
  HStack,
  SimpleGrid,
  Button,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import CountdownTimer from "./CountDownTimer";

interface IProps {
  item: IAuctionInfo;
  isCancel?: boolean;
  onAction?: (action: ActionType) => void;
}

export default function NftAuction({ item, isCancel, onAction }: IProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="#151D14"
      px="10px"
      py="10px"
      borderRadius="10px"
    >
      <Box position="relative">
        <Image
          src={item.image}
          alt={item.name}
          objectFit="cover"
          borderRadius="10px"
        />
        <Box position="absolute" top={5} right={10}>
          <Text fontWeight="bold" fontSize="40px" fontStyle="italic">
            {
              Clarity[item.attributes?.find((p) => p.trait_type === "Rarity")?.value || 0]
            }
          </Text>
        </Box>
        <HStack bg="rgba(0,0,0,0.4)" position="absolute" top={5} px="10px">
          <Text>ID: {item.id.toString().padStart(5, "0")}</Text>
        </HStack>
      </Box>
      <VStack w="full" alignItems="flex-start">
        <Text fontWeight="bold" py="10px" fontSize="20px" textTransform="uppercase" letterSpacing="5px">
          {item.name}
        </Text>
        <HStack w="full">
          <Text color="#fedf5680" fontWeight="bold" fontSize="14px">Highest bid</Text>
          <Spacer />
          <Text color="#fedf56" fontWeight="bold">{numberFormat(item.lastBid)} IPT</Text>
        </HStack>
      </VStack>     

      <SimpleGrid w="full" columns={2} spacingX="10px" mt="10px">
        <Button variant="outline" disabled>
           <CountdownTimer targetDate={item.endTime * 1000} />
        </Button>
        <Button
          variant={isCancel ? "outline" : "primary"}
          py="3px !important"
          onClick={() => onAction && onAction("AUCTION")}
        >
          {isCancel ? 'Cancel' : 'Place a bid'}
        </Button>        
      </SimpleGrid>
    </Flex>
  );
}
