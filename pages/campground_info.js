import { useRouter } from "next/router";
import {useState, useEffect} from 'react';
import axios from 'axios'

const campground_info = () => {
    const { query } = useRouter();
    const [campData, setCampData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCampgroundData = () => {
        axios
          .get(
              `https://developer.nps.gov/api/v1/campgrounds?parkCode=${query.code}&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
          )
          .then((data) => {
            let campDataAPI = data.data.data;
            console.log("from NPAPI", campDataAPI);
            setTimeout(() => {
              campData.push(campDataAPI);
              setLoading(true);
              console.log(campData);
            }, 2000);
          })
          .catch((err) => {
            console.log("Error connecting to NP API:", err);
          });
      };
      
      useEffect(() => {
        getCampgroundData();
      }, []);

    return (
        <>
        Campground Info
        </>
    )
}

export default campground_info