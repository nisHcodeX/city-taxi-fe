import React from 'react'
import { TaxiLogo } from '../../assets/img'

const LocationDataNotFound = () => {
    return (
        <div>
            <img src={TaxiLogo} />
            <h3 style={{ color: 'red' }}>No availble driver found !</h3>
        </div>
    )
}

export default LocationDataNotFound