import {Box, Image, Button} from "@chakra-ui/react"
import Link from 'next/link'
import { useRouter } from 'next/router';

const Show = ({searchResult}) => {

    const display = () => {
        return searchResult.map((data, index)=> {
            return (
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={data.images[0].url} alt="Park Photo" 
                />
                <Box>
                    {data.fullName}<br></br>
                    {data.parkCode}<br></br>
                    {/* button with link to show page that sends data of park code as state */}
                    <Button>
                    <Link href={`/park_info?code=${data.parkCode}`}>Park Information</Link>
                    </Button>
                </Box>
                </Box>
            )
        })
    }
    return (
        <>
        <div className="row">{display()}</div>
        </>
    )
}

export default Show