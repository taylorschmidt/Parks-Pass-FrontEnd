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
  GridItem,
  Link,
  ExternalLinkIcon,
} from "@chakra-ui/react";
import ImageSlider from "../components/ImageSlider"

const park_info = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [parkData, setParkData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([])

  const getParkData = () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?parkCode=${query.code}&&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
      )
      .then((data) => {
        let parkDataAPI = data.data.data;
        console.log("from NPAPI", parkDataAPI);
        setTimeout(() => {
          parkData.push(parkDataAPI);
          loopParkData()
          setLoading(true);
          console.log(parkData);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };

  const loopParkData = () => {
    let imagesArray = parkData[0][0].images
    console.log(imagesArray)
    imagesArray.forEach((image)=>{
        images.push(image.url)
    })
  }


  const addToPassport = () => {
    console.log(query.code);
    // axios call to get user data
    axios
      .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        let userId = data.data.data[0].id;
        //another axios call to find or create park
        axios
          .post(
            "http://localhost:8000" + `/api/v1/park/`,
            { park_code: query.code },
            { withCredentials: true }
          )
          .then((data) => {
            let visitedId = data.data.data.id;
            //another axios call to post person_park connection
            axios
              .post(
                "http://localhost:8000" + `/api/v1/person_park/`,
                { person_id: userId, visited_park_id: visitedId },
                { withCredentials: true }
              )
              .then((data) => {
                console.log("person park data:", data.data.data);
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
      {loading && (
        <div>
          <Box w="100%">
            <Box w="100%" mt={3}>
              <Center>
                <VStack>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/US-NationalParkService-Logo.svg/1200px-US-NationalParkService-Logo.svg.png" h="10%" w="10%"></Image>
                  <Text fontSize="4xl">{parkData[0][0].fullName}</Text>
                  <HStack>
                    <Button onClick={addToPassport}>Stamp Passport</Button>
                    <Button
                      onClick={() => {
                        router.push({
                          pathname: `/campground_info`,
                          query: { code: parkData[0][0].parkCode, name: parkData[0][0].fullName },
                        });
                      }}
                    >
                      Campground Info
                    </Button>
                  </HStack>
                </VStack>
              </Center>
            </Box>

            <Box borderWidth="1px" mt={3}>
              <Flex>
                <Box w="40%">
                  {/* <Center>
                    <Text fontSize="2xl">Park Information:</Text>
                  </Center> */}
                  <Grid
                    templateRows="repeat(5, 1fr)"
                    templateColumns="1fr 2fr"
                    p={10}
                    // gap={2}
                  >
                    <Box w="100%" h="5">
                      Website:
                    </Box>
                    <Box w="100%" h="5">
                      <Text
                        onClick={()=>{
                          window.open(parkData[0][0].url, '_blank')
                        }}
                      >Click Here</Text>
                      {/* <a href={parkData[0][0].url}>Link</a> */}
                    </Box>
                    <Box w="100%" h="20">
                      Address:
                    </Box>
                    <Box w="100%" h="20">
                      <Box>{parkData[0][0].addresses[0].line1}</Box>
                      <Box>{parkData[0][0].addresses[0].line2}</Box>
                      <Box>
                        {parkData[0][0].addresses[0].city},{" "}
                        {parkData[0][0].addresses[0].stateCode}{" "}
                        {parkData[0][0].addresses[0].postalCode}
                      </Box>
                    </Box>
                    <Box w="100%" h="10">
                      Entrance Fee
                    </Box>
                    <Box w="100%" h="10">
                      {!parkData[0][0].entranceFees.cost && <div>None</div>}
                      {parkData[0][0].entranceFees.cost && (
                        <div>{parkData[0][0].entranceFees.cost}</div>
                      )}
                    </Box>
                    <Box w="100%" h="10">
                      Designation
                    </Box>
                    <Box w="100%" h="10">
                      {parkData[0][0].designation}
                    </Box>
                    <Box w="100%" h="20">
                      Hours
                    </Box>
                    <Box w="100%" h="20">
                      Monday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.monday}
                      <br></br>
                      Tuesday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.tuesday}
                      <br></br>
                      Wednesday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.wednesday}
                      <br></br>
                      Thursday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.thursday}
                      <br></br>
                      Friday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.friday}
                      <br></br>
                      Saturday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.saturday}
                      <br></br>
                      Sunday:{" "}
                      {parkData[0][0].operatingHours[0].standardHours.sunday}
                    </Box>
                  </Grid>
                </Box>

                <Box w="60%" p={3} m={3}>
                  <Flex alignItems="center">
                    <VStack>
                      <Box w="100%">
                      <ImageSlider images={images}/>
                      </Box>
                      <Box>
                        <Text>{parkData[0][0].description}</Text>
                      </Box>
                    </VStack>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};
export default park_info