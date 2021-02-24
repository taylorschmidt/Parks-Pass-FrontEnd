import {useEffect, useState} from 'react'
import {
    Box,
    Image,
    Button,
    HStack,
    Container,
    WrapItem,
    Wrap,
    Spacer,
    Flex,
    Text,
    Center,
  } from "@chakra-ui/react";
const ParkCount = ({data}) => {
    const [loading, setLoading] = useState(true)

    let parkCount = 0;
    let allParkCount = 0;
 
    
    const countingParks = () => {
        return data.map((data, index) => {
            allParkCount += 1;
            if (data.designation === "National Park") {
              parkCount += 1;
             
            }
    })
    }
  


    return(
        <>
            {countingParks()}
            <Box>
                <Text>National Parks Visited: {parkCount}/63</Text>
                <Text>Total NPS Sites Visited: {allParkCount}</Text>
            </Box>
   
            </>
    )
}

export default ParkCount