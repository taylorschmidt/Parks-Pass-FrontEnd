import {Box, Image, Button, HStack, Container, WrapItem, Wrap, Spacer} from "@chakra-ui/react"
import { useRouter } from 'next/router';


const Preview = ({data}) => {
    const router = useRouter()
    console.log(data)
    const display = () => {
        return data.map((data, index)=> {
            return (
                <>
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                {!data.images[0] && (<div><Image src="https://i.imgur.com/vX2ymJG.png" alt="Park Photo" 
                /></div>)}
                {data.images[0] && (<div><Image src={data.images[0].url} alt="Park Photo" 
                /></div>)}
                <Box>
                    {data.fullName}<br></br>
                    {data.parkCode}<br></br>
                    {/* button with link to show page that sends data of park code as state */}
                    <Button onClick={() => {
                        router.push({
                            pathname: `/park_info`,
                            query: { code: data.parkCode },
                    })
                    }}>Learn More</Button>
                </Box>
                </Box>
                <Spacer />
                </>
            )
        })
        }

    return(
        <>
        {display()}
        </>
    )
}

export default Preview