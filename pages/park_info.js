import {useState, useEffect} from 'react'
import {Component} from 'react'

// class park_info extends Component {

//   static async getInitialProps({query}) {
//     console.log(query)
//     return {}
//   }

//   constructor(props) {
//     super(props);
//     // Don't call this.setState() here!
//     this.state = { code:  };
//     this.handleClick = this.handleClick.bind(this);
//   }


//   render() {
//     return (
//     <h2>Park Page for code:</h2>
//     )
//   }
// }

const park_info = ({query}) => {
  console.log(query)
  return (
    <>
    Park Page for Code: 
    </>
  )
}

// park_info.getInitialProps = async ({query}) => {
//   console.log(query)
//   return {}
// }




// const park_info = ({parkCode}) => {
//   const [parkData, setParkData] = useState([]) 

//   const getParkData = () => {
//     axios
//       .get(
//         `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
//       )
//       .then((data) => {
//         console.log(data.data.data);
//         setParkData(data.data.data)
//       })
//       .catch((err) => {
//         console.log("Error connecting to NP API:", err);
//       });
//   };

//   const display = () => {

//   }

//     return (
//         <>
//       Park Info Page
//         </>
//     )
// }

export default park_info