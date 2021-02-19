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
          {/* <Center>
                <Button onClick={() => {
                    router.push({
                        pathname: `/park_info`,
                        query: { code: data.parkCode },
                })
                }}>Learn More</Button>
                </Center> */}
        </Box>
      </Box>
      <Spacer />
    </>
      )







        // <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        //   {data.images[0] && (
        //     <div>
        //         <Button onClick={() => {
        //         router.push({
        //           pathname: `/park_info`,
        //           query: { code: data.parkCode },
        //         });
        //       }}>
        //       <Image
        //         _hover={{ opacity: ".5" }}
        //         w="375px"
        //         h="210px"
        //         src={data.images[0].url}
        //         alt="Park Photo"
        //       />
        //       </Button>
        //     </div>
            
        //   )}
        //   {!data.images[0] && (
        //     <div>
        //     <Button onClick={() => {
        //         router.push({
        //           pathname: `/park_info`,
        //           query: { code: data.parkCode },
        //         });
        //       }}>
        //       <Image
        //         w="375px"
        //         h="210px"
        //         src="https://i.imgur.com/Eq3Ahwd.jpg"
        //         alt="Park Photo"
        //       />
        //       </Button>
        //     </div>
        //   )}
        //   <Box>
        //     <Text fontSize="2xl">{data.fullName}</Text>
        //     {/* button with link to show page that sends data of park code as state */}
        //     <Button
        //       onClick={() => {
        //         router.push({
        //           pathname: `/park_info`,
        //           query: { code: data.parkCode },
        //         });
        //       }}
        //     >
        //       Learn More
        //     </Button>
        //   </Box>
        // </Box>
      
    });
  };
  return (
    <Flex flexWrap="wrap">
    <Box borderWidth="1px" borderRadius="lg" padding="10" margin="10" mt="5">
      <Box d="flex" flexWrap="wrap">
        {display()}
      </Box>
      <Spacer />
    </Box>
    </Flex>
  )
};

export default Show;
