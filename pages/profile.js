import axios from "axios";
import { useEffect, useState } from "react";
import Passport from "../components/Passport";
import {
  Button,
  Flex,
  Box,
  useColorMode,
  Text,
  VStack,
  Center,
  Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import ChangeUsername from "../components/ChangeUsername";
import ParkCount from "../components/ParkCount";

const profile = () => {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState([]);
  const [axiosPassport, setAxiosPassport] = useState([]);
  const [changeRequest, setChangeRequest] = useState(false);
  const router = useRouter();

  const getUser = () => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        console.log("user data", data.data.data[0].email);
        let myEmail = data.data.data[0].email;
        let userId = data.data.data[0].id;
        let myUsername = data.data.data[0].username;
        setUsername(myUsername);
        setUser(userId);
        setEmail(myEmail);
        axios
          .post(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/person_park/visited`, {
            email: myEmail,
          })
          .then((data) => {
            console.log("visited parks data", data.data.data);
            passport.push(data.data.data);
            setTimeout(() => {
              axiosPassportFun();
            }, 1000);
          })
          .catch((err) => {
            console.log("error finding visited parks", err);
          });
      })
      .catch((err) => {
        console.log("error finding user", err);
      });
  };

  const axiosPassportFun = () => {
    let axiosInput = passport[0];
    setTimeout(() => {
      axiosInput.map((data, index) => {
        axios
          .get(
            `https://developer.nps.gov/api/v1/parks?parkCode=${data.park_code}&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
          )
          .then((data) => {
            console.log("visited parks from API", data.data.data);
            let thisPark = data.data.data[0];
            axiosPassport.push(thisPark);
          })
          .catch((err) => {
            console.log("Error connecting to NP API:", err);
          });
      });
    });
  };

  setTimeout(() => {
    setLoading(false);
  }, 2000);

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
    setTimeout(() => {
      router.push("/form");
    }, 500);
  };

  const ChangeUsernameFun = () => {
    setChangeRequest(true);
  };

  const noUser = () => {
    router.push('/form')
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading && (<div>
        <Box w="100%" mt={5} textAlign='center'>
        
             <VStack>
            <Image  h="50%" w="50%" src="https://i.imgur.com/ne3muOR.png"></Image>
            <Box><Text className="parksFont">Loading...</Text></Box>
            </VStack>
    
           </Box>
        </div>)}
      {!loading && !user && (
        <div>{noUser()}</div>
      )}
      {!loading && user &&  
      (
        <div className="top-div">
          <VStack >
            <Box
              mt={5}
              className="passportSign"
              p={10}
              w="30%"
            >
              <Center ml={12}>
                <Image
                className="passportImage"
                  src="https://i.imgur.com/vX2ymJG.png"
                  h="25%"
                  w="25%"
                  mr={3}
                ></Image>
                <Text
                  color="#F3E5AB"
                  className="parksFont passportTitle"
                  fontSize="5xl"
                  size="sm" fontSize="50px"
                  ml={2}
                >
                  {username}'s Passport
                </Text>
              </Center>
            </Box>
            <Text className='parksFont mobilePassport'>{username}'s Passport</Text>
            <ParkCount data={axiosPassport} />
            <Button
              bg="1"
              _hover={{ background: "2" }}
              color="white"
              onClick={ChangeUsernameFun}
            >
              <EditIcon />
            </Button>
            {changeRequest && (
              <div>
                <Box
                  w="350px"
                  bg={colorMode === "light" ? "gray.200" : "gray.600"}
                  p={3}
                  boxShadow="sm"
                  rounded="lg"
                >
                  <ChangeUsername email={email} />
                </Box>
              </div>
            )}
            
            <Flex flexWrap="wrap">
              <Passport data={axiosPassport} user={user} />
            </Flex>
           
          </VStack>
        </div>
      )}
    </>
  );
};

export default profile;
