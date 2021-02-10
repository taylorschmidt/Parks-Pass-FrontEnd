import { useState } from "react";
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
} from "@chakra-ui/react";
import Show from "../components/Show";

import { SearchIcon } from "@chakra-ui/icons";

const search_parks = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
        console.log(data.data);
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };
  return (
    <>
      
          <FormControl id="park-search">
            <FormLabel>Search for a park</FormLabel>
            <Input type="text" value={searchTerm} onChange={onChangeForm} />
            <Button type="submit" onClick={getParkData}>
              <SearchIcon />
            </Button>
          </FormControl>
       
          <Show />
       
    </>
  );
};

export default search_parks;
