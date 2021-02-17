import axios from "axios";
import { useEffect, useState } from "react";
import Passport from "../components/Passport";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const profile = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [passport, setPassport] = useState([]);
  const [axiosPassport, setAxiosPassport] = useState([]);
  const router = useRouter();

  const getUser = () => {
    axios
      .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
      .then((data) => {
        console.log("user data", data.data.data[0].email);
        let myEmail = data.data.data[0].email;
        let userId = data.data.data[0].id;
        setUser(userId);
        axios
          .post("http://localhost:8000" + `/api/v1/person_park/visited`, {
            email: myEmail,
          })
          .then((data) => {
            console.log("visited parks data", data.data.data);
            passport.push(data.data.data);
            setTimeout(() => {
              axiosPassportFun();
            }, 1000);
          })
          .catch((err) => {
            console.log("error finding visited parks", err);
          });
      })
      .catch((err) => {
        console.log("error finding user", err);
      });
  };

  const axiosPassportFun = () => {
    let axiosInput = passport[0];
    setTimeout(() => {
      axiosInput.map((data, index) => {
        axios
          .get(
            `https://developer.nps.gov/api/v1/parks?parkCode=${data.park_code}&api_key=W9tvHVJFdf5z1OJ2J1rpSj8Ngc0Z7BfqhjfAVFgz`
          )
          .then((data) => {
            console.log("visited parks from API", data.data.data);
            let thisPark = data.data.data[0];
            axiosPassport.push(thisPark);
          })
          .catch((err) => {
            console.log("Error connecting to NP API:", err);
          });
      });
    });
  };

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const logout = () => {
    axios
      .get("http://localhost:8000" + `/api/v1/user/logout`, {withCredentials: true})
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      router.push("/form");
    }, 500);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading && <div>Page is loading!</div>}
      {!loading && (
        <div>
          <Button onClick={logout}>Logout</Button>
          <Passport data={axiosPassport} user={user} />
        </div>
      )}
    </>
  );
};

export default profile;