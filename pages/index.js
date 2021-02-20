import React from "react";
import {
  Box,
  Container,
  useColorMode,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Button,
  Center,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  return (
    <>
    <div>
    <Box w="100%" m="" d="flex" flexWrap="wrap">
          
            
              <Box>
                  <Center>
                <Image className="left-index"
                  src="https://i.imgur.com/ne3muOR.png"
                ></Image>
                </Center>
              </Box>
              <Box mt={49} className="right-div right-index">
                  <Center>
                <VStack>
                  <Text className="parksFont" textAlign="center" fontSize="5xl">
                    Welcome to Parks Passport!
                  </Text>

                  <Text className="right-index" w="70%" textAlign="center">
                    Parks Passport is here to make national park trip planning
                    easy! View general and campsite information about your
                    favorite locations and sign up to keep a passport of your
                    visited parks.
                  </Text>

                  <Button
                    bg="1"
                    _hover={{ background: "2" }}
                    color="white"
                    onClick={() => {
                      router.push("/form");
                    }}
                  >
                    Join Us
                  </Button>
                </VStack>
                </Center>
              </Box>
     
          </Box>
          </div>
    </>
  );
};

export default Home;
