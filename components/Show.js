import { Box, Image, Button, Text, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Show = ({ searchResult }) => {
  const router = useRouter();

  const display = () => {
    return searchResult.map((data, index) => {
      return (
       <>
        <Box
        m="2"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={()=>{router.push({
          pathname: `/park_info`,
          query: { code: data.parkCode }})}}
        _hover={{ opacity: ".5" }}
        cursor= "pointer"
      >
        {!data.images[0] && (
          <div>
            <Image
              w="375px"
              h="210px"
              src="https://i.imgur.com/Eq3Ahwd.jpg"
              alt="Park Photo"
            />
          </div>
        )}
        {data.images[0] && (
          <div>
            <Image
              w="375px"
              h="210px"
              src={data.images[0].url}
              alt="Park Photo"
            />
          </div>
        )}
        <Box>
          <Box>
            <Text fontSize="2xl" noOfLines={1}>
              {data.fullName}
            </Text>
          </Box>
          <Box>
            {data.addresses.length > 0 && (<div>{data.addresses[0].city}, {data.addresses[0].stateCode}</div>)}
          </Box>
        </Box>
      </Box>
      <Spacer />
    </>
      )
    });
  };
  return (
    <Flex flexWrap="wrap">
    <Box borderWidth="1px" borderRadius="lg" padding="5" margin="8" mt="5">
      <Box d="flex" flexWrap="wrap">
        {display()}
      </Box>
      <Spacer />
    </Box>
    </Flex>
  )
};

export default Show;
