import { Flex,
	Stack,
	useColorMode,
	IconButton,
	Box,
	Image } from "@chakra-ui/react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react'
import axios from 'axios'

const NoUserNav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = { light: 'gray.300', dark: 'gray.600' };
	const textColor = { light: 'black', dark: 'gray.100' };
    const router = useRouter();
    const [isUser, setIsUser] = useState(false)




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
                    opacity={router.pathname !== '/search_parks' ? 0.4 : 1}>
                    <Link href='/search_parks'>
                        <a>Browse Parks</a>
                    </Link>
                </Box>
                <Box
                    position='relative'
                    opacity={router.pathname !== '/form' ? 0.4 : 1}>
                    <Link href='/form'>
                        <a>Join ParksPass</a>
                    </Link>
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

export default NoUserNav