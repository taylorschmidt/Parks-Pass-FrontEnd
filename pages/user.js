import axios from 'axios'
import {useEffect} from 'react'
const profile = () => {

    const getUser = () => {
        axios.get(
            'http://localhost:8000' + `/api/v1/user/`
        ).then((data)=>{
            console.log(data.data)
        }).catch((err)=>{
            console.log("error registering user", err)
        })
    }
    useEffect(()=>{
        getUser()
    })

    return (
        <>
        User Profile Page
        </>
    )
}

export default profile