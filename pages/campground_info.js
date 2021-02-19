import { useRouter } from "next/router";
import {useState, useEffect} from 'react';
import axios from 'axios'
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
  VStack,
} from "@chakra-ui/react";

const campground_info = () => {
    const { query } = useRouter();
    const [campData, setCampData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCampgroundData = () => {
        axios
          .get(
              `https://developer.nps.gov/api/v1/campgrounds?parkCode=${query.code}&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
          )
          .then((data) => {
            let campDataAPI = data.data.data;
            console.log("from NPAPI", campDataAPI);
            setTimeout(() => {
              campData.push(campDataAPI);
              setLoading(true);
              console.log(campData);
              // display()
            }, 2000);
          })
          .catch((err) => {
            console.log("Error connecting to NP API:", err);
          });
      };
      
      const display = () => {
        let myData = campData[0]
        if(myData.length === 0) {
          return(
            <>
            <VStack>
            <Box>😭😭😭</Box>
            <Box>This park does not have campgrounds.</Box>
            <Button onClick={()=>{window.location='/search_parks'}}>Return Home</Button>
            </VStack>
            </>
          )
        }
        return myData.map((data, index) => {
          return (
            <>
              <Box
                m="2"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                onClick={()=>{
                  window.open(data.url, '_blank')
                }}
                _hover={{ opacity: ".5" }}
                cursor= "pointer"
              >
                {!data.images[0] && (
                  <div>
                    <Image
                      w="375px"
                      h="210px"
                      src="https://i.imgur.com/Fy3nDLj.jpg"
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
                      {data.name}
                    </Text>
                  </Box>
                  <Box>
                    {data.description}
                  </Box>
                </Box>
              </Box>
              <Spacer />
            </>
          );
        })
      }


      useEffect(() => {
        getCampgroundData();
      }, []);

    return (
        <>
        {loading && (
           <>
           <VStack>
             <Center>
             <Text>Campgrounds in {query.name}</Text>
             </Center>
             <Flex flexWrap="wrap">
          <Box borderWidth="1px" borderRadius="lg" padding="10" margin="10">
            <Box d="flex" flexWrap="wrap">
              {display()}
            </Box>
          </Box>
          </Flex>
          </VStack>
          </>
        )}
        </>
    )
}

export default campground_info