import React from 'react'

import {Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, FormHelperText} from "@chakra-ui/react"

const LoginForm = () => {
    return(
        <div><form action="submit">
        <Stack spacing={4}>
            <FormControl isRequired>
                <InputGroup>
                <InputLeftElement children={<Icon name="email"/>} />
                <Input 
                    type="name"
                    placeholder="Email"
                    aria-label="Email"
                    />
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <InputGroup>
                <InputLeftElement children={<Icon name="lock"/>} />
                <Input 
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    />
                </InputGroup>
            </FormControl>
            <Button
                type="submit"
                variant="solid"
                variantColor="red"
                boxShadow="sm"
                _hover={{boxShadow: "lg"}}
                _active={{boxShadow: "lg"}}
                >
                Log In!
            </Button>
            <FormHelperText textAlign="center">
                Happy to see you again!
                <br/>
                🤍
            </FormHelperText>
        </Stack>
    </form></div>
    )
}

export default LoginForm