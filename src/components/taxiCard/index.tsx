import { Button, Card, CardContent } from "@mui/material";
import { TaxiBike, TaxiCar } from "../../assets/img";
import { VehicleType } from "../../const";
import './index.scss'
import { yellow } from "@mui/material/colors";

interface TaxiCardProps {
    vehicleType: VehicleType
}
export default function TaxiCard({ vehicleType }: TaxiCardProps) {

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
                        <div className="title">BMW X5 Chicago 2008</div>
                        <div className="detail">Per km : 250Rs</div>
                        <div className="detail">Passenger Count : {vehicleType == VehicleType.CAR ? 4: 1}</div>
                        <div className="detail">Vehicle Number: sdsdsadcdfef</div>
                        <div className="detail">initial charge : 500Rs</div>
                        <div className="button">
                            <Button
                                sx={{ marginTop: '8px', }}
                                color="success"
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={onRideBook}
                            >
                                Book A Ride
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </CardContent>
    );
}