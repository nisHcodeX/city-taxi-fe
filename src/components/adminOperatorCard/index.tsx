import { Button } from '@mui/material'
import React from 'react'
import { VehicleType } from '../../const'
import './index.scss'

interface CustomerCardProps {
    data: any,
    vehicleType?: VehicleType
    onUpdateClick?: ()=> void;
    onDeleteClick?: ()=> void;
}

const OperatorCard = ({data, vehicleType= 1, onUpdateClick, onDeleteClick }: CustomerCardProps) => {
  return (
    <div className="customer-card-content">
    <div className="title">Name : {data.name}</div>
    <div className="detail">Email : {data.email}</div>
    <div className="detail">Phone Number : {data.phoneNumber}</div>
    <div className="button">
        {<Button
            sx={{ marginTop: '8px', }}
            color="success"
            type="button"
            fullWidth
            variant="contained"
            onClick={onUpdateClick}
        >
            Update Details
        </Button>}
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

export default OperatorCard