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
  Center
} from "@chakra-ui/react";
import Show from "../components/Show";
import Preview from "../components/Preview"
import { SearchIcon } from "@chakra-ui/icons";


const search_parks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [searchedPark, setSearchedPark] = useState(false)
  const [loading, setLoading] = useState(false)
  const [popResult, setPopResult] = useState([])

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
        setSearchResult(data.data.data)
        setSearchedPark(true)
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };
  
  const popularParks = () => {
    axios
    .get(
      `https://developer.nps.gov/api/v1/parks?stateCode=CO&limit=4&start=0&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
    )
    .then((data) => {
      console.log('popular parks from API', data.data.data);
      setPopResult(data.data.data)
      popResult.push(data.data.data)
      setLoading(true)
    })
    .catch((err) => {
      console.log("Error connecting to NP API:", err);
    });
  }

  useEffect(() => {
    popularParks()
 }, []);
  
  return (
    <>
    <VStack>
        <Center h="100%" w="75%">
          <FormControl id="park-search">
            <HStack>
            <Input type="text" placeHolder="search for a park" value={searchTerm} onChange={onChangeForm} w="75%"/>
            <Button type="submit" onClick={getParkData}>
            <SearchIcon />
            </Button>
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
                <Flex flexWrap="wrap">
                <Show searchResult={searchResult}/>
                </Flex>
            </div>    
        )}
        </VStack>
    </>
  );
};

export default search_parks;
