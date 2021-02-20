import {
    Flex,
    Stack,
    useColorMode,
    IconButton,
    Box,
    Image,
    Text,
    Spacer,
  } from "@chakra-ui/react";
  import {MoonIcon, SunIcon} from '@chakra-ui/icons'
  import Link from "next/link";
  import { useRouter } from "next/router";
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  const NoUserNav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = { light: "gray.300", dark: "gray.600" };
    const textColor = { light: "black", dark: "gray.100" };
    const router = useRouter();
    const [isUser, setIsUser] = useState(false);
  
    return (
      <Flex
        w="100vw"
        // bg={bgColor[colorMode]}
        bg="1"
        // align='center'
        color='white'
        // justify='center'
        // align='center'
        fontSize={["md", "lg", "xl", "xl"]}
        h="10vh"
        boxShadow="md"
        p={3}
      >
        <Flex w={["100vw", "100vw", "100vw", "100vw"]}>
          <Box p={2} opacity={router.pathname !== "/index" ? 0.6 : 1}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Box>
          <Box p={2} opacity={router.pathname !== "/search_parks" ? 0.6 : 1}>
            <Link href="/search_parks">
              <a>Browse Parks</a>
            </Link>
          </Box>
          <Spacer />
          <Box p={2} opacity={router.pathname !== "/form" ? 0.6 : 1}>
            <Link href="/form">
              <a>Join</a>
            </Link>
          </Box>
          <Box p={1}>
            <IconButton
              rounded="full"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon color="gray"/> : <SunIcon />}
            ></IconButton>
          </Box>
        </Flex>
      </Flex>
    );
  };
  
  export default NoUserNav;
  