import { VStack, Text } from '@chakra-ui/react';
import React from 'react';

const DateTimeDisplay = ({ value} : {value: number}) => {
  return (
    <VStack>
      <Text fontSize="16px">{value}</Text>
    </VStack>
  );
};

export default DateTimeDisplay;
