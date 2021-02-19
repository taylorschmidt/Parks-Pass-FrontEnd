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
} from "@chakra-ui/react";
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
      .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        console.log("user data", data.data.data[0].email);
        let myEmail = data.data.data[0].email;
        let userId = data.data.data[0].id;
        let myUsername = data.data.data[0].username;
        setUsername(myUsername);
        setUser(userId);
        setEmail(myEmail);
        axios
          .post("http://localhost:8000" + `/api/v1/person_park/visited`, {
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
      .get("http://localhost:8000" + `/api/v1/user/logout`, {
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading && <div>Page is loading!</div>}
      {!loading && (
        <div>
          <VStack>
            <Box>
              <Text fontSize="3xl">{username}'s Passport</Text>
            </Box>
            <ParkCount data={axiosPassport} />
            <Button onClick={ChangeUsernameFun}>Edit Username</Button>
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
            <Box></Box>
          </VStack>
        </div>
      )}
    </>
  );
};

export default profile;
