import {
    Box,
    Image,
    Button,
    HStack,
    Container,
    WrapItem,
    Wrap,
    Spacer,
    Text
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import axios from "axios";
  import Link from "next/link";
  import { useState, useEffect } from "react";
  
  const Passport = ({ data, user }) => {
    const router = useRouter()

    const display = () => {
      return data.map((data, index) => {
        return(
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
              {/* </Link> */}
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
              {/* </Link> */}
            </div>
          )}
          <Box>
            <Text fontSize="2xl">{data.fullName}</Text>
            {/* button with link to show page that sends data of park code as state */}
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
          </Box>
        </Box>
        )
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
  