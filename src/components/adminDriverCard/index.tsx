import { Button, Rating } from '@mui/material'
import React from 'react'
import './index.scss'
import { TDriver } from '../../types/driver'
import { VehicleType } from '../../const';

interface CustomerCardProps {
    data: TDriver,
    onUpdateClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}

const AdminDriverCard = ({ data, onUpdateClick, onDeleteClick }: CustomerCardProps) => {

    return (
        <div className="customer-card-content">
            <div className="title">Driver Name : {data.name}</div>
            <div className="detail">Driver Email : {data.email}</div>
            <div className="detail">Driver License : {data.driverLicense}</div>
            <div className="detail">Driver Phone Number: {data.phoneNumber}</div>
            <div className="detail">Driver Location: {data.locationName}</div>
            <div className="detail">Driver Reviews: <Rating value={data.avgRating} /></div>
            <div className={`detail-status ${data.availability == 'AVAILABLE' ? 'available' : ''}`}>Driver Status: {data.availability}</div>
            <div>
                {data.vehicles && data.vehicles.length > 0 ?
                    data.vehicles.map((vehicle, index) =>
                        <div key={index} className="vehicle-container">
                            <div className="title vehi">Vehicle Type : {vehicle.manufacturer} {vehicle.model}</div>
                            <div className="detail">Vehicle id: {vehicle.licensePlate}</div>
                            <div className="detail">Vehicle Type:{vehicle.vehicleType.name}</div>
                            <div className="detail">Vehicle Color:{vehicle.colour}</div>
                        </div>
                    )
                    : <></>}
            </div>
            <div className="button">
                {<Button
                    sx={{ marginTop: '8px', }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => onUpdateClick(data.id)}
                >
                    Update
                </Button>}
                {<Button
                    sx={{ marginTop: '8px', }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={() => onDeleteClick(data.id)}
                >
                    Delete
                </Button>}
            </div>
        </div>
    )
}

export default AdminDriverCard