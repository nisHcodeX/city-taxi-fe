import { Button, Rating } from '@mui/material'
import React from 'react'
import './index.scss'
import { TDriver } from '../../types/driver'

interface CustomerCardProps {
    data: TDriver,
    onUpdateClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}

const AdminDriverCard = ({ data,  onUpdateClick, onDeleteClick }: CustomerCardProps) => {

    return (
        <div className="customer-card-content">
            <div className="title">Driver Name : {data.name}</div>
            <div className="detail">Driver Email : {data.email}</div>
            <div className="detail">Driver License : {data.driverLicense}</div>
            <div className="detail">Driver Phone Number: {data.phoneNumber}</div>
            <div className="detail">Driver Location: {data.locationName}</div>
            <div className="detail">Driver Reviews: <Rating value={5}/></div>
            <div className="detail-status">Driver Status: {data.availability}</div>
            <div>
            {/* <div className="vehicle-container">
            <div className="title">Vehicle Type : Car</div>
            <div className="detail">Vehicle id: ACD-55401</div>
            <div className="detail">Vehicle Location: Matara</div>
            </div>
            <div className="vehicle-container" style={{paddingTop: '16px'}}>
            <div className="title">Vehicle Type : Bike</div>
            <div className="detail">Vehicle id: AKD-50403</div>
            <div className="detail">Vehicle Location: Matara</div>
            </div> */}
            </div>
            <div className="button">
                {<Button
                    sx={{ marginTop: '8px', }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={()=>onUpdateClick(data.id)}
                >
                    Update
                </Button>}
                {<Button
                    sx={{ marginTop: '8px', }}
                    color="success"
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={()=>onDeleteClick(data.id)}
                >
                    Delete
                </Button>}
            </div>
        </div>
    )
}

export default AdminDriverCard