import {
    Box,
    Image,
    Button,
    HStack,
    Container,
    WrapItem,
    Wrap,
    Spacer,
    Flex,
    Text,
    Center,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  
  const Preview = ({ data }) => {
    const router = useRouter();
    console.log(data);
    const display = () => {
      return data.map((data, index) => {
        console.log(data);
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
                    src="https://i.imgur.com/vX2ymJG.png"
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
                  {data.addresses[0].city}, {data.addresses[0].stateCode}
                </Box>
              </Box>
            </Box>
            <Spacer />
          </>
        );
      });
    };
  
    return (
      <>
        <Box borderWidth="1px" borderRadius="lg" padding="10" margin="20">
          <Text>Popular Parks</Text>
          <Box d="flex" flexWrap="wrap">
            {display()}
          </Box>
        </Box>
      </>
    );
  };
  
  export default Preview;
  