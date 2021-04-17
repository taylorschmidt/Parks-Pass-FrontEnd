import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Button,
  Text,
  Flex,
  Box,
  Spacer,
  Container,
  VStack,
  HStack,
  Center,
  Image,
  Grid,
} from "@chakra-ui/react";
import ImageSlider from "../components/ImageSlider";

const park_info = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [parkData, setParkData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const getParkData = () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?parkCode=${query.code}&&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
      )
      .then((data) => {
        let parkDataAPI = data.data.data;
        //if NPS API doesn't properly give data, just return to the search page
        if (parkDataAPI.length === 0) {
          router.push("/search_parks");
          return;
        }
        setTimeout(() => {
          parkData.push(parkDataAPI);
          loopParkData();
          setLoading(true);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error connecting to NPS API:", err);
      });
  };

  const loopParkData = () => {
    if (parkData.length === 0) {
      return;
    } else if (parkData.length > 0) {
      let imagesArray = parkData[0][0].images;
    
      imagesArray.forEach((image) => {
        images.push(image.url);
      });
    }
  };

  const addToPassport = () => {
    // axios call to get user data
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        let userId = data.data.data[0].id;
        //another axios call to find or create park
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/park/`,
            { park_code: query.code },
            { withCredentials: true }
          )
          .then((data) => {
            let visitedId = data.data.data.id;
            //another axios call to post person_park connection
            axios
              .post(
                process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/person_park/`,
                { person_id: userId, visited_park_id: visitedId },
                { withCredentials: true }
              )
              .then((data) => {
                router.push("/profile");
              })
              .catch((err) => {
                console.log("error with person park", err);
              });
          });
      })
      .catch((err) => {
        console.log("error finding user", err);
      });
  };

  useEffect(() => {
    getParkData();
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <Box w="100%" mt={5} textAlign="center">
            <VStack>
              <Image
                h="50%"
                w="50%"
                src="https://i.imgur.com/ne3muOR.png"
              ></Image>
              <Box>
                <Text className="parksFont">Loading...</Text>
              </Box>
            </VStack>
          </Box>
        </div>
      )}
      {loading && (
        <div>
          <Box w="100%">
            <Box w="100%" mt={3}>
              <Center>
                <VStack>
                  <Image
                    src="https://i.imgur.com/ne3muOR.png"
                    h="30%"
                    w="30%"
                  ></Image>
                  <Text className="parksFont" fontSize="5xl">
                    {parkData[0][0].fullName}
                  </Text>
                  <HStack>
                    <Button
                      bg="1"
                      _hover={{ background: "2" }}
                      color="white"
                      onClick={addToPassport}
                      value="Stamp Passport"
                    >
                      Stamp Passport
                    </Button>
                    <Button
                      bg="1"
                      _hover={{ background: "2" }}
                      color="white"
                      onClick={() => {
                        router.push({
                          pathname: `/campground_info`,
                          query: {
                            code: parkData[0][0].parkCode,
                            name: parkData[0][0].fullName,
                          },
                        });
                      }}
                    >
                      Campground Info
                    </Button>
                  </HStack>
                </VStack>
              </Center>
            </Box>

            <Box borderWidth="1px" mt={3} d="flex" flexWrap="wrap" w="100%" h="100%">
              <Box className='grid' w="45%" mb={115}>
                <Grid
                  templateRows="repeat(5, 1fr)"
                  templateColumns="1fr 2fr"
                  p={10}
                  width="100%"
                  height="100%"
                >
                  <Box w="100%" h="5" className="parksFont" fontSize="lg">
                    Website
                  </Box>
                  <Box w="100%" h="5">
                    <Text
                      className="parksFont"
                      fontSize="lg"
                      onClick={() => {
                        window.open(parkData[0][0].url, "_blank");
                      }}
                    >
                      Click Here
                    </Text>
                  </Box>
                  <Box w="100%" h="10" className="parksFont" fontSize="lg">
                    Designation
                  </Box>
                  <Box w="100%" h="10" className="parksFont" fontSize="lg">
                    {parkData[0][0].designation}
                  </Box>
                  <Box w="100%" h="10" className="parksFont" fontSize="lg">
                    Entrance Fee
                  </Box>
                  <Box w="100%" h="10" className="parksFont" fontSize="lg">
                    {parkData[0][0].entranceFees[0].lengh === 0 && (
                      <div>None</div>
                    )}
                    {parkData[0][0].entranceFees[0].cost && (
                      <div>${parkData[0][0].entranceFees[0].cost}</div>
                    )}
                  </Box>
                  <Box w="100%" h="20" className="parksFont" fontSize="lg">
                    Address
                  </Box>
                  <Box w="100%" h="20" className="parksFont" fontSize="lg">
                    {parkData[0][0].addresses.length > 0 && (
                      <>
                        <Box className="parksFont" fontSize="lg">
                          {parkData[0][0].addresses[0].line1}
                        </Box>
                        <Box className="parksFont" fontSize="lg">
                          {parkData[0][0].addresses[0].line2}
                        </Box>
                        <Box className="parksFont" fontSize="lg">
                          {parkData[0][0].addresses[0].city},{" "}
                          {parkData[0][0].addresses[0].stateCode}{" "}
                          {parkData[0][0].addresses[0].postalCode}
                        </Box>
                      </>
                    )}
                  </Box>

                  <Box w="100%" h="20" className="parksFont" fontSize="lg">
                    Hours
                  </Box>
                  <Box w="100%" h="20" className="parksFont" fontSize="lg">
                    Monday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.monday}
                    <br></br>
                    Tuesday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.tuesday}
                    <br></br>
                    Wednesday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.wednesday}
                    <br></br>
                    Thursday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.thursday}
                    <br></br>
                    Friday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.friday}
                    <br></br>
                    Saturday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.saturday}
                    <br></br>
                    Sunday -{" "}
                    {parkData[0][0].operatingHours[0].standardHours.sunday}
                  </Box>
                </Grid>
                </Box>
              

              <Box w="50%" p={3} m={3} d="flex" className="grid">
                <Center>
                  <VStack>
                    <Box w="100%">
                      <ImageSlider images={images} />
                    </Box>
                    <Box>
                      <Text>{parkData[0][0].description}</Text>
                    </Box>
                  </VStack>
                  </Center>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};
export default park_info;
