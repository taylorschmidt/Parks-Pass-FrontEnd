import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from "@chakra-ui/react"

import { SearchIcon } from '@chakra-ui/icons'
export default function Home() {

  return (
    <>
    <FormControl id="park-search">
      <FormLabel>Search for a park</FormLabel>
      <Input type="text" />
      <Button
      type="submit">
        <SearchIcon />
      </Button>
    </FormControl>
    </>
  )

}