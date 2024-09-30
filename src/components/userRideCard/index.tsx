import { AlertColor, Button, Card, CardContent } from "@mui/material";
import { TaxiBike, TaxiCar } from "../../assets/img";
import { VehicleType } from "../../const";
import './index.scss'
import { yellow } from "@mui/material/colors";
import React from "react";

interface TaxiCardProps {
    vehicleType: VehicleType,
    showButton?: boolean,
    oReviewRide?: () => void
    onPayRide?: () => void
}
export default function UserRideCrd({ vehicleType, showButton, oReviewRide, onPayRide }: TaxiCardProps) {

    return (
        <CardContent sx={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
            <Card variant='outlined' className='login-card'>
                <div className="taxt-card-wrapper">
                    <div className="taxt-card-img">
                        {vehicleType == VehicleType.CAR ? <img src={TaxiCar} /> : <img src={TaxiBike} />}
                    </div>
                    <div className="taxt-card-content">
                        <div className="title">{vehicleType == VehicleType.CAR ? 'BMW X5 Chicago 2008' : 'Yamaha fz v2'}</div>
                        <div className="detail">Per km : {vehicleType == VehicleType.CAR ? 'Rs: 250.00': 'Rs: 150.00'}</div>
                        <div className="detail">Passenger Count : {vehicleType == VehicleType.CAR ? 4: 1}</div>
                        <div className="detail">Vehicle Number: {vehicleType == VehicleType.CAR ? 'AB-52476': 'CAD-2059'}</div>
                        <div className="detail">initial charge : 500Rs</div>
                        <div className="detail">Status: {vehicleType == VehicleType.CAR ? 'Paid': 'Not paid'}</div>
                        <div className="detail">start Destination: Galle</div>
                        <div className="detail">end Destination: Matara</div>
                        <div className="detail">Full Payment: {vehicleType == VehicleType.CAR ? '1200Rs': '400Rs'} </div>
                        <div className="detail">Status: {vehicleType == VehicleType.CAR ? 'Paid': 'Not paid'}</div>
                        
                        <div className="button">
                            {showButton ? <></>: 
                            vehicleType == VehicleType.CAR ? <Button
                            sx={{ marginTop: '8px', }}
                            color="success"
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={oReviewRide}
                        >
                            Review
                        </Button>:  <Button
                            sx={{ marginTop: '8px', }}
                            color="success"
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={onPayRide}
                        >
                            Pay
                        </Button>}
                        </div>
                    </div>
                </div>
            </Card>
        </CardContent>
    );
}