
import React from 'react'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Button} from "@chakra-ui/react"
import { useRouter } from "next/router";

const Home = () => {
    const { colorMode } = useColorMode()
    const router = useRouter();
    return(
        <>
   Welcome to Parks Pass!
   <Button onClick={() => {router.push('/form')}}>Join Us</Button>

</>
    )
}

export default Home