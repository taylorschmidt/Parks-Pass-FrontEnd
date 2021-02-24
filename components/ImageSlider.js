import { useEffect, useState } from "react";
import {
  Flex,
  Stack,
  useColorMode,
  IconButton,
  Box,
  Button,
  Image,
  Spacer,
  Center,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0); 

  const slideRight = () => {
    setIndex((index + 1) % images.length); 
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    <>
      {images && (
        <div>
          <Box>
            <VStack>
                <Image src={images[index]} alt={index} h="75%" w="80%"></Image>
                <HStack>
                  <Button
                    bg="1"
                    _hover={{ background: "2" }}
                    color="white"
                    onClick={slideLeft}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <Button
                    bg="1"
                    _hover={{ background: "2" }}
                    color="white"
                    onClick={slideRight}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </HStack>
            </VStack>
          </Box>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
