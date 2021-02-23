import {
    Flex,
    Stack,
    useColorMode,
    IconButton,
    Box,
    Button,
    Image,
    Spacer,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = { light: "gray.300", dark: "gray.600" };
    const textColor = { light: "black", dark: "white" };
    const router = useRouter();
    const [isUser, setIsUser] = useState(false);
  
    const logout = () => {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/logout`, {
          withCredentials: true,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    //   window.location.replace("/form");
      setTimeout(() => {
        window.location.replace("/form")
      }, 500);
    };
  
    return (
      <Flex
        w="100vw"
        // bg={bgColor[colorMode]}
        bg="1"
        color='white'
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
          <Box p={2} opacity={router.pathname !== "/profile" ? 0.6 : 1}>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Box>
          <Box p={2} opacity="0.6" cursor="pointer" onClick={logout}>
            Logout
          </Box>
  
          <Box p={1}>
            <IconButton
              rounded="full"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? "moon" : "sun"}
            >
              Change Color Mode
            </IconButton>
          </Box>
        </Flex>
      </Flex>
    );
  };
  
  export default Navbar;
  