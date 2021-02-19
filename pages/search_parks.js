import { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  VStack,
  Container,
  Flex,
  Spacer,
  HStack,
  Center,
} from "@chakra-ui/react";
import Show from "../components/Show";
import Preview from "../components/Preview";
import { SearchIcon } from "@chakra-ui/icons";

const search_parks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchedPark, setSearchedPark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popResult, setPopResult] = useState([]);

  const onChangeForm = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const getParkData = () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?q=${searchTerm}&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
      )
      .then((data) => {
        console.log(data.data.data);
        setSearchResult(data.data.data);
        setSearchedPark(true);
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };

  const popularParks = () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?parkCode=acad,zion,romo,glac,grca,arch&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
      )
      .then((data) => {
        console.log("popular parks from API", data.data.data);
        setPopResult(data.data.data);
        popResult.push(data.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };

  useEffect(() => {
    popularParks();
  }, []);

  return (
    <>
      <VStack>
        <Center w="50%">
          <Button type="submit" onClick={getParkData} p={3}>
            Search Parks
          </Button>
          <FormControl id="park-search" p={3} type="submit" onSubmit={getParkData}>
            <HStack>
              <Input
                w="110%"
                type="text"
                placeHolder="🔎"
                value={searchTerm}
                onChange={onChangeForm}
                w="100%"
              />
            </HStack>
          </FormControl>
        </Center>
        {!searchedPark && (
          <div>
            <Flex flexWrap="wrap">
              <Preview data={popResult} />
            </Flex>
          </div>
        )}
        {searchedPark && (
          <div>
            <Show searchResult={searchResult} />
          </div>
        )}
      </VStack>
    </>
  );
};

export default search_parks;
