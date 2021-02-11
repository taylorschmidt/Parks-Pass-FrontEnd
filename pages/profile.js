import axios from 'axios'
import {useEffect, useState} from 'react'


const profile = () => {
    
    const getUser = () => {
        axios
        .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
        .then((data) => {
          console.log(data.data.data);
        })
        .catch((err) => {
          console.log("error registering user", err);
        });
      }

    useEffect(() => {
       getUser()
    });
    return (
        <>
        My Profile
        </>
    )
}

export default profile