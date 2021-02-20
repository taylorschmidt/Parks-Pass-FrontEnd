import { ChakraProvider, Flex, Spacer, extendTheme } from "@chakra-ui/react"
import Navbar from '../components/Navbar';
import NoUserNav from '../components/NoUserNav'
import {useState, useEffect} from 'react'
import axios from 'axios'
import '../public/styles.css'

function MyApp({ Component, pageProps }) {
	const [isUser, setIsUser] = useState(false)

	const theme = extendTheme({
		colors: {
			1: "#1F3D0C",
			2: "#809176"
		},
		components: {
			Button: {
				solid: (props) => ({
					bg: props.colorMode === "dark" ? "green" : "green",
			})
		}
	}
})
	
	const isThereAUser = () => {
	axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL  + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
		  if (data.data.status.code === 200) {
			  setIsUser(true)
		  } else if (data.data.status.code === 400) {
			  setIsUser(false)
		  }
	   }).catch(err=>{console.log(err)}) 
	}

	useEffect(() => {
		isThereAUser();
	  }, []);


	return (
			<ChakraProvider theme={theme}>
				{isUser && (<Navbar />)}
				{!isUser && (<NoUserNav />)}
				<Flex>
					<div className="container">
						<Component {...pageProps} />
					</div>
				</Flex>
			</ChakraProvider>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
