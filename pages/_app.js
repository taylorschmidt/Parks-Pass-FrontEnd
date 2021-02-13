import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react"
import Navbar from '../components/Navbar';
import search_parks from '../pages/search_parks'
import {Switch, Route} from 'react-router-dom'

function MyApp({ Component, pageProps }) {
	return (
			<ChakraProvider>
				<Navbar />
				<Flex>
						<Component {...pageProps} />
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
