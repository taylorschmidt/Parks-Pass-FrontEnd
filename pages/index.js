
import React from 'react'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image} from "@chakra-ui/react"
import SignUpForm from '../components/Register'
import LoginForm from '../components/Login'
const Home = () => {
    const { colorMode } = useColorMode()
    return(
        <>
   Welcome to Parks Pass!
        </>
    )
}

export default Home