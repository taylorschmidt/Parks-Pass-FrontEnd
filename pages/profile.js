import axios from 'axios'
import {useEffect, useState} from 'react'


const profile = () => {
    const [email, setEmail] = useState('')
    
    const getUser = () => {
        axios
        .get("http://localhost:8000" + `/api/v1/user/`, { withCredentials: true })
        .then((data) => {
          console.log(data.data.data);
          setEmail(data.data.data[0].email)
          console.log(email)
          axios.post("http://localhost:8000" + `/api/v1/person_park/visited`, {email: email},{ withCredentials: true })
          .then((data)=>{
              console.log(data.data.data)
          }).catch((err)=> {console.log('error finding visited parks', err)})
        })
        .catch((err) => {
          console.log("error finding user", err);
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