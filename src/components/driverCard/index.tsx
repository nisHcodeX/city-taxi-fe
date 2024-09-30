import { Button, Card, CardContent } from "@mui/material";
import { TaxiBike, TaxiCar } from "../../assets/img";
import { VehicleType } from "../../const";
import './index.scss'
interface TaxiCardProps {
    vehicleType: VehicleType,
    showButton?: boolean
}
export default function DriverCard({ vehicleType, showButton }: TaxiCardProps) {

    const onRideBook = () => {
        console.log('booked');
    }

    return (
        <CardContent sx={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
            <Card variant='outlined' className='login-card'>
                <div className="taxt-card-wrapper">
                    <div className="taxt-card-img">
                        {vehicleType == VehicleType.CAR ? <img src={TaxiCar} /> : <img src={TaxiBike} />}
                    </div>
                    <div className="taxt-card-content">
                        <div className="title">{vehicleType == VehicleType.CAR ? 'Aqua': 'Fz-v2'}</div>
                        <div className="detail">Manufacturer : {vehicleType == VehicleType.CAR ? 'Toyota': 'Yamha'}</div>
                        <div className="detail">Passenger Count : {vehicleType == VehicleType.CAR ? 4: 1}</div>
                        <div className="detail">Vehicle Number: {vehicleType == VehicleType.CAR ? 'AB-52476': 'CAD-2059'}</div>
                        <div className="detail">Color {vehicleType == VehicleType.CAR ? 'white': 'blue'}</div>
                        <div className="button">
                            {showButton ? <></>: <Button
                                sx={{ marginTop: '8px', }}
                                color="success"
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={onRideBook}
                            >
                                Update Details
                            </Button>}
                        </div>
                    </div>
                </div>
            </Card>
        </CardContent>
    );
}