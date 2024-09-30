import { Button, Rating } from '@mui/material'
import React from 'react'
import { VehicleType } from '../../const'
import './index.scss'

interface CustomerCardProps {
    data?: any,
    vehicleType?: VehicleType
    onUpdateClick?: () => void;
    onDeleteClick?: () => void;
}

const AdminDriverCard = ({ data, vehicleType, onUpdateClick, onDeleteClick }: CustomerCardProps) => {
    return (
        <div className="customer-card-content">
            <div className="title">Driver Name : {vehicleType == VehicleType.CAR ? "Nisehdha" : 'Shalin'}</div>
            <div className="detail">Driver Email : {vehicleType == VehicleType.CAR ? "nishedha.driver@gmail.com" : 'shalin.driver@gmail.com'}</div>
            <div className="detail">Driver License : {vehicleType == VehicleType.CAR ? "5012457814" : '6112457825'}</div>
            <div className="detail">Driver Reviews: <Rating value={5}/></div>
            <div>
            <div className="vehicle-container">
            <div className="title">Vehicle Type : Car</div>
            <div className="detail">Vehicle id: ACD-55401</div>
            <div className="detail">Vehicle Location: Matara</div>
            </div>
            <div className="vehicle-container" style={{paddingTop: '16px'}}>
            <div className="title">Vehicle Type : Bike</div>
            <div className="detail">Vehicle id: AKD-50403</div>
            <div className="detail">Vehicle Location: Matara</div>
            </div>
            </div>
            <div className="button">
                {<Button
                    sx={{ marginTop: '8px', }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={onDeleteClick}
                >
                    Delete
                </Button>}
            </div>
        </div>
    )
}

export default AdminDriverCard