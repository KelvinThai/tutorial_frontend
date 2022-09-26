import { HStack, Text } from "@chakra-ui/react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <HStack px="0px" spacing="2px">
      <Text fontSize="15px" px="0px">{days}</Text>    
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{hours}</Text>     
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{minutes}</Text>     
      <Text fontSize="15px">:</Text> 
      <Text fontSize="15px">{seconds.toString().padStart(2, '0')}</Text>           
      <Text fontSize="15px">left</Text>
    </HStack>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
