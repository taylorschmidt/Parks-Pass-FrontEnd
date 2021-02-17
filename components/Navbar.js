import { Flex,
	Stack,
	useColorMode,
	IconButton,
    Box,
    Button,
	Image } from "@chakra-ui/react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react'
import axios from 'axios'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = { light: 'gray.300', dark: 'gray.600' };
	const textColor = { light: 'black', dark: 'gray.100' };
    const router = useRouter();
    const [isUser, setIsUser] = useState(false)

    const logout = () => {
        axios
          .get("http://localhost:8000" + `/api/v1/user/logout`, {withCredentials: true})
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
          window.location.replace('/form')
        // setTimeout(() => {
        //   router.push("form");
        // }, 500);
    }



    return(
        <Flex
        w='100vw'
        bg={bgColor[colorMode]}
        align='center'
        color={textColor[colorMode]}
        justify='center'
        align='center'
        fontSize={['md', 'lg', 'xl', 'xl']}
        h='7vh'
        boxShadow='md'
        p={2}>
        <Flex w={['100vw', '100vw', '80vw', '80vw']} justify='space-around'>
            <Box>
                {/* logo image here */}
            </Box>
            <Stack
                spacing={8}
                color={textColor[colorMode]}
                justify='center'
                align='center'
                isInline>
                <Box
                    position='relative'
                    opacity={router.pathname !== '/index' ? .4 : 1}>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                </Box>
                <Box
                    position='relative'
                    opacity={router.pathname !== '/profile' ? 0.4 : 1}>
                    <Link href='/profile'>
                        <a>Profile</a>
                    </Link>
                </Box>
                <Box
                    position='relative'
                    opacity={router.pathname !== '/search_parks' ? 0.4 : 1}>
                    <Link href='/search_parks'>
                        <a>Search</a>
                    </Link>
                </Box>
                <Box
                    position='relative'
                    opacity="0.4"
                    cursor= "pointer"
                    onClick={logout}>
                    Logout
                </Box>

            </Stack>
            <Box>
                <IconButton
                    rounded='full'
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? 'moon' : 'sun'}>
                    Change Color Mode
                </IconButton>
            </Box>
        </Flex>
    </Flex>
);
}

export default Navbar