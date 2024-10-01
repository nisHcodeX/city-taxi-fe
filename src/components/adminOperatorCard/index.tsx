import { Button } from '@mui/material'
import React from 'react'
import { VehicleType } from '../../const'
import './index.scss'
import { OperatorCreateRes } from '../../types/operator'

interface OperatorCardProps {
    data: OperatorCreateRes,
    onUpdateClick: (id: number)=> void;
    onDeleteClick: (id: number)=> void;
}

const OperatorCard = ({data,  onUpdateClick, onDeleteClick }: OperatorCardProps) => {
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
            onClick={()=>onUpdateClick(data.id)}
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
            onClick={()=>onDeleteClick(data.id)}
        >
            Delete
        </Button>}
    </div>
    </div>
  )
}

export default OperatorCard