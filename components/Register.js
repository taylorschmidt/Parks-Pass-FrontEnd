import React, { useState }  from 'react'
import axios from 'axios'
import { useRouter } from "next/router";
//Stack lets you vertically stack things
//FormControl allows you to control what is required and what is disabled when filling out a form.
//InputGroups puts icons and input fields together
import {Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, Divider, FormHelperText} from "@chakra-ui/react"
import {InfoIcon, EmailIcon, LockIcon} from '@chakra-ui/icons'
const SignUpForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatUser, setRepeatUser] = useState(false)

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }
    //axios call here to backend to register
    const register = (e) => {
        e.preventDefault()
        axios.post(
            process.env.REACT_APP_BACKEND_URL + `/api/v1/user/register`,
            {username: username,
            email: email,
            password: password
            }, { withCredentials: true }
        ).then((data)=>{
            console.log(data.data)
            if (data.data.status.code === 401) {
                setRepeatUser(true)
            }
            else if (data.data.status.code === 200) {
                router.push("/profile")
            }
        }).catch((err)=>{
            console.log("error registering user", err)
        })
    }

    return(
        <form action="submit">
            <Stack spacing={4}>
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<InfoIcon/>} />
                    <Input 
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={onChangeUsername}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<EmailIcon/>} />
                    <Input 
                        type="text"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={onChangeEmail}
                        />
                    </InputGroup>
                </FormControl>
            
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<LockIcon/>} />
                    <Input 
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={onChangePassword}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    // type="submit"
                    bg="1"
                    _hover={{ background: "2", boxShadow: "lg" }}
              color="white"
                    variant="solid"
                    variantColor="red"
                    boxShadow="sm"
                    _active={{boxShadow: "lg"}}
                    onClick={register}
                    >
                    Sign Up!
                </Button>
                <FormHelperText textAlign="center">
                    We will never share your email!
                    <br/>
                    🌲
                </FormHelperText>
                {repeatUser && <FormHelperText textAlign="center">
                    That email is already registered. <br></br> 😢
                </FormHelperText>}
            </Stack>
        </form>
    )
}

export default SignUpForm