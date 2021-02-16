import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const park_info = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [parkData, setParkData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getParkData = () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?parkCode=${query.code}&&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
      )
      .then((data) => {
        let parkDataAPI = data.data.data;
        console.log("from NPAPI", parkDataAPI);
        setTimeout(() => {
          parkData.push(parkDataAPI);
          setLoading(true);
          console.log(parkData);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error connecting to NP API:", err);
      });
  };

  const addToPassport = () => {
    console.log(query.code);
    // axios call to get user data
    axios
      .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        let userId = data.data.data[0].id;
        //another axios call to find or create park
        axios
          .post(
            "http://localhost:8000" + `/api/v1/park/`,
            { park_code: query.code },
            { withCredentials: true }
          )
          .then((data) => {
            let visitedId = data.data.data.id;
            //another axios call to post person_park connection
            axios
              .post(
                "http://localhost:8000" + `/api/v1/person_park/`,
                { person_id: userId, visited_park_id: visitedId },
                { withCredentials: true }
              )
              .then((data) => {
                console.log("person park data:", data.data.data);
              })
              .catch((err) => {
                console.log("error with person park", err);
              });
          });
      })
      .catch((err) => {
        console.log("error finding user", err);
      });
  };


  const deleteFromPassport = () => {
    // axios call to get user data
    axios
      .get("http://localhost:8000" + `/api/v1/user/`, {withCredentials: true})
      .then((data) => {
        let userId = data.data.data[0].id;
        console.log('userid', userId)
        //another axios call to find or create park
        axios
          .post(
            "http://localhost:8000" + `/api/v1/park/`,
            { park_code: query.code },
            { withCredentials: true }
          )
          .then((data) => {
            let visitedId = data.data.data.id;
            console.log('visitedID', visitedId)
            //another axios call to post person_park connection
            axios
              .post(
                "http://localhost:8000" + `/api/v1/person_park/visited/delete`, 
                { person_id: userId, visited_park_id: visitedId },
                {withCredentials: true}
                
              )
              .then((data) => {
                console.log("person park data was deleted:", data.data.data);
              })
              .catch((err) => {
                console.log("error with person park", err);
              });
          });
      })
      .catch((err) => {
        console.log("error finding user", err);
      });
  };


  useEffect(() => {
    getParkData();
  }, []);

  return (
    <>
      {loading && (
        <div>
          <div>
            Park Page for Code: {query.code}
            Park page for code: {parkData[0][0].fullName}
          </div>
          <div>
            <Button
              onClick={() => {
                router.push({
                  pathname: `/campground_info`,
                  query: { code: parkData[0][0].parkCode },
                });
              }}
            >
              Camping Information
            </Button>
            <Button onClick={addToPassport}>Add to Passport</Button>
            <Button onClick={deleteFromPassport}>Delete from Passport</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default park_info;
