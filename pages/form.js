import React from 'react'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Center} from "@chakra-ui/react"
import SignUpForm from '../components/Register'
import LoginForm from '../components/Login'
const form = () => {
    const { colorMode } = useColorMode()
    return(
        <>
        <Box w="100%" mt={5}>
            <Center>
            <Box w="350px" bg={colorMode === "light" ? "gray.200" : "gray.600" } p={3} boxShadow="sm" rounded="lg">
            <Image src= "./security.png" w="80px" mx="auto" my={6}/>
            <Tabs variant="enclosed-colored" isFitted m={4}>
                <TabList mt={3}>
                    <Tab>Sign Up</Tab>
                    <Tab>Log In</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SignUpForm />
                    </TabPanel>
                    <TabPanel>
                        <LoginForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
            </Center>
            </Box>
        </>
    )
}

export default form