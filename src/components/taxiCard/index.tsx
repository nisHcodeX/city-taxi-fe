import { Button, Card, CardContent, Rating } from "@mui/material";
import { TaxiBike, TaxiCar } from "../../assets/img";
import { VehicleType } from "../../const";
import './index.scss'
import { yellow } from "@mui/material/colors";
import { TDriverNearByRes } from "../../types/driver";

interface TaxiCardProps {
    data: TDriverNearByRes,
    showButton?: boolean,
    onRideBook?: () => void
}
export default function TaxiCard({ data, showButton, onRideBook }: TaxiCardProps) {

    return (
        <CardContent sx={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
            <Card variant='outlined' className='login-card'>
                <div className="taxt-card-wrapper">
                    <div className="taxt-card-img">
                        {data.vehicle.vehicleType.id == VehicleType.CAR ? <img src={TaxiBike} /> : <img src={TaxiCar} />}
                    </div>
                    <div className="taxt-card-content">
                        <div className="title">{data.vehicle.manufacturer} {data.vehicle.model}</div>
                        <div className="detail">Per km : Rs:{data.vehicle.vehicleType.pricePerMeter}</div>
                        <div className="detail">Passenger Count : {data.vehicle.vehicleType.id == VehicleType.CAR ? 1 : 4}</div>
                        <div className="detail">Vehicle Number: {data.vehicle.licensePlate}</div>
                        <div className="detail">Driver Name : {data.name}</div>
                        <div className="detail">Location : {data.locationName}</div>
                        <div className="detail">Driver Reviews: <Rating value={data.avgRating}  disabled/></div>
                        <div className="button">
                            {showButton ? <></> : <Button
                                sx={{ marginTop: '8px', }}
                                color="success"
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={onRideBook}
                            >
                                Book A Ride
                            </Button>}
                        </div>
                    </div>
                </div>
            </Card>
        </CardContent>
    );
}