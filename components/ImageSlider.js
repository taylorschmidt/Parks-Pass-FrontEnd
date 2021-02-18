import {useEffect, useState} from 'react'
import {
    Flex,
    Stack,
    useColorMode,
    IconButton,
    Box,
    Button,
    Image,
    Spacer,
  } from "@chakra-ui/react";

const ImageSlider = ({images}) => {
    console.log(images, 'from image slider')
    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  
    const slideRight = () => {
      setIndex((index + 1) % images.length); // increases index by 1
    };
  
    const slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        setIndex(images.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    };
  
    return (
        <>
        {images && (<div>
          
          <img src={images[index]} alt={index} />
          <Button onClick={slideLeft}>{"<"}</Button>
          <Button onClick={slideRight}>{">"}</Button>
        </div>)}
      </>
    );
}

export default ImageSlider

