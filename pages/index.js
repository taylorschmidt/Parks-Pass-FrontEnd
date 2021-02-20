
import React from 'react'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Button, Center, Text, Flex, VStack} from "@chakra-ui/react"
import { useRouter } from "next/router";

const Home = () => {
    const { colorMode } = useColorMode()
    const router = useRouter();
    return(
        <>
        <Box w="100%" mt={20} ml={100}>
            <Center>
                <Flex flexWrap="wrap" align-content="right">
                    <Box>
                        <Center>
                    <Image src="https://i.imgur.com/ne3muOR.png" h="100%" w="100%"></Image>
                    </Center>
                    </Box>
                    <Box w="70%" mt={49}>
                        <Center>
                        <VStack>
                     
                    <Text className="parksFont" textAlign="center" fontSize="5xl">Welcome to Parks Passport!</Text>
            
                    <Text w="70%" textAlign="center">Parks Passport is here to make national park trip planning easy! View general and campsite information about your favorite locations and sign up to keep a passport of your visited parks.</Text>
             
                    <Button bg="1"
              _hover={{ background: "2" }}
              color="white" onClick={() => {router.push('/form')}}>Join Us</Button>
             
              </VStack>
              </Center>
                    </Box>
                    
                </Flex>
            </Center>
        </Box>


</>
    )
}

export default Home