import { Box, Image, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Show = ({ searchResult }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const display = () => {
    return searchResult.map((data, index) => {
      return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {data.images[0] && (
            <div>
              <Image
                _hover={{ opacity: ".5" }}
                w="375px"
                h="210px"
                src={data.images[0].url}
                alt="Park Photo"
              />
            </div>
          )}
          {!data.images[0] && (
            <div>
              <Image
                w="375px"
                h="210px"
                src="https://i.imgur.com/Eq3Ahwd.jpg"
                alt="Park Photo"
              />
            </div>
          )}
          <Box>
            <Text fontSize="2xl">{data.fullName}</Text>
            {/* button with link to show page that sends data of park code as state */}
            <Button
              onClick={() => {
                router.push({
                  pathname: `/park_info`,
                  query: { code: data.parkCode },
                });
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      );
    });
  };
  return <>{display()}</>;
};

export default Show;
