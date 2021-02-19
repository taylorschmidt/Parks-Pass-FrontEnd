import {useEffect, useState} from 'react'

const ParkCount = ({data}) => {
    const [loading, setLoading] = useState(true)

    let parkCount = 0;
    let allParkCount = 0;
    console.log('PARKCOUNT', data)
    
    const countingParks = () => {
        return data.map((data, index) => {
            allParkCount += 1;
            if (data.designation === "National Park") {
              parkCount += 1;
              console.log("park is counting", parkCount);
            }
    })
    }
  
    

    return(
        <>
            {countingParks()}
            {parkCount},
            {allParkCount}
            </>
    )
}

export default ParkCount