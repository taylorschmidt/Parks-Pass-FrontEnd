import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Stack,
  Input,
  FormControl,
  InputLeftElement,
  Icon,
  InputGroup,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";



const LoginForm = () => {
 const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unknownUser, setUnknownUser] = useState(false)

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000" + `/api/v1/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data.data.status.code === 401) {
            setUnknownUser(true)
        }
        else if (data.data.status.code === 200) {
            window.location.replace('/profile')
        }
      })
      .catch((err) => {
        console.log("error logging in user", err);
      });
  };


  return (
    <div>
      <form action="submit">
        <Stack spacing={4}>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<EmailIcon />} />
              <Input
                type="name"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={onChangeEmail}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<LockIcon />} />
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
            type="submit"
            variant="solid"
            variantColor="red"
            boxShadow="sm"
            onClick={login}
            _hover={{ boxShadow: "lg" }}
            _active={{ boxShadow: "lg" }}
          >
            Log In!
          </Button>
          <FormHelperText textAlign="center">
            Happy to see you again!
            <br />
            🌲
          </FormHelperText>
          {unknownUser && <FormHelperText textAlign="center">
          Username or password is incorrect! 😢
          </FormHelperText>}
        </Stack>
      </form>
      
    </div>

  );
};

export default LoginForm;
