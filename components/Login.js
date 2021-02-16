import React, { useState } from "react";
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        let userData = data.data.data;
        console.log('Data from backend', userData);
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
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
