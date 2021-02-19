import {
  Box,
  Image,
  Button,
  HStack,
  Container,
  WrapItem,
  Wrap,
  Spacer,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const Passport = ({ data, user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  let parkCount = 0;
  let allParkCount = 0;

  const display = () => {
    return data.map((data, index) => {
      allParkCount += 1;
      if (data.designation === "National Park") {
        parkCount += 1;
        console.log("park is counting", parkCount);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return (
        <>
          <Box
            m="2"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            {!data.images[0] && (
              <div>
                <Image
                  w="375px"
                  h="210px"
                  src="https://i.imgur.com/vX2ymJG.png"
                  alt="Park Photo"
                  onClick={() => {
                    router.push({
                      pathname: `/park_info`,
                      query: { code: data.parkCode },
                    });
                  }}
                  _hover={{ opacity: ".5" }}
                  cursor="pointer"
                />
              </div>
            )}
            {data.images[0] && (
              <div>
                <Image
                  w="375px"
                  h="210px"
                  src={data.images[0].url}
                  alt="Park Photo"
                  onClick={() => {
                    router.push({
                      pathname: `/park_info`,
                      query: { code: data.parkCode },
                    });
                  }}
                  _hover={{ opacity: ".5" }}
                  cursor="pointer"
                />
              </div>
            )}
            <Box>
              <Box>
                <Text fontSize="2xl" noOfLines={1}>
                  {data.fullName}
                </Text>
              </Box>
              <Box>
                {data.addresses[0].city}, {data.addresses[0].stateCode}
              </Box>
              <Button
                onClick={() => {
                  axios
                    .post(
                      "http://localhost:8000" + `/api/v1/park/`,
                      { park_code: data.parkCode },
                      { withCredentials: true }
                    )
                    .then((data) => {
                      let visitedId = data.data.data.id;
                      console.log("visitedID", visitedId);
                      //another axios call to post person_park connection
                      axios
                        .post(
                          "http://localhost:8000" +
                            `/api/v1/person_park/visited/delete`,
                          { person_id: user.id, visited_park_id: visitedId },
                          { withCredentials: true }
                        )
                        .then((data) => {
                          console.log(
                            "person park data was deleted:",
                            data.data.data
                          );
                        })
                        .catch((err) => {
                          console.log("error with person park", err);
                        });
                    })
                    .catch((err) => {
                      console.log("error finding user", err);
                    });
                  location.reload();
                }}
              >
                Remove from Passport
              </Button>
            </Box>
          </Box>
          <Spacer />
        </>
      );
    });
  };

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" padding="10" margin="20">
        <Box d="flex" flexWrap="wrap">
          {display()}
        </Box>
      </Box>
          <Text>National Parks Visited: {parkCount}/63</Text>
     
          <Text>{allParkCount} NPS Sites Visited</Text>
       
        
      
      
    </>
  );
};

export default Passport;
