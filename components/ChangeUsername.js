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
  import { InfoIcon, EmailIcon, LockIcon, EditIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import axios from 'axios'
  
  const ChangeUsername = ({email}) => {
    const [newUsername, setNewUsername] = useState("");
  
    const onChangeUsername = (e) => {
      const newUsernameForm = e.target.value;
      setNewUsername(newUsernameForm);
    };
  
    const changeTheUsername = () => {
        axios
        .put(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/update`, {
            username: newUsername,
            email: email,
          }, { withCredentials: true })
        .then((data) => {
            console.log('from backend', data)
            window.location.replace("/profile");
        }).catch(err=>console.log(err))
    };
  
    return (
      <>
        <Stack spacing={4}>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<InfoIcon />} />
              <Input
                type="name"
                placeholder="New Username"
                aria-label="username"
                value={newUsername}
                onChange={onChangeUsername}
              />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            variant="solid"
            variantColor="red"
            boxShadow="sm"
            bg="1"
              _hover={{ background: "2" }}
              color="white"
            onClick={changeTheUsername}
            _hover={{ boxShadow: "lg" }}
            _active={{ boxShadow: "lg" }}
          >
           Update Username
          </Button>
        </Stack>
      </>
    );
  };
  
  export default ChangeUsername;
  