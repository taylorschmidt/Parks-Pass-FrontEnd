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
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import axios from "axios";
  import Link from "next/link";
  import { useState, useEffect } from "react";
  
  const Passport = ({ data, user }) => {
    const router = useRouter();
  
    const display = () => {
      return data.map((data, index) => {
        return (
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {data.images[0] && (
              <div>
                <Image
                  _hover={{ opacity: ".5" }}
                  w="375px"
                  h="210px"
                  src={data.images[0].url}
                  alt="Park Photo"
                />
              </div>
            )}
            {!data.images[0] && (
              <div>
                <Image
                  w="375px"
                  h="210px"
                  src="https://i.imgur.com/Eq3Ahwd.jpg"
                  alt="Park Photo"
                />
              </div>
            )}
            <Box>
              <Text fontSize="2xl">{data.fullName}</Text>
              <Button
                onClick={() => {
                  router.push({
                    pathname: `/park_info`,
                    query: { code: data.parkCode },
                  });
                }}
              >
                Learn More
              </Button>
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
                Delete from Passport
              </Button>
            </Box>
          </Box>
        );
      });
    };
  
    return (
      <>
        <div>Passport Page</div>
        <div>{display()}</div>
      </>
    );
  };
  
  export default Passport;
  