import { Button, Card, CardContent } from "@mui/material";
import { TaxiBike, TaxiCar } from "../../assets/img";
import { VehicleType } from "../../const";
import './index.scss'
import { TVehicle } from "../../types/driver";
interface TaxiCardProps {
    data: TVehicle;
    showButton?: boolean;
    onUpdateVehicle: ()=>void
}
export default function DriverCard({ data, showButton, onUpdateVehicle }: TaxiCardProps) {

    return (
        <CardContent sx={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
            <Card variant='outlined' className='login-card'>
                <div className="taxt-card-wrapper">
                    <div className="taxt-card-img">
                        {data.vehicleType.id == VehicleType.CAR ? <img src={TaxiBike} /> : <img src={TaxiCar} />}
                    </div>
                    <div className="taxt-card-content">
                        <div className="title"> {data.model}</div>
                        <div className="detail">Manufacturer : {data.manufacturer}</div>
                        <div className="detail">Passenger Count : {data.vehicleType.id == VehicleType.CAR ? 1 : 4}</div>
                        <div className="detail">Vehicle Number: {data.licensePlate}</div>
                        <div className="detail">Color {data.colour}</div>
                        <div className="button">
                            {showButton ? <></> : <Button
                                sx={{ marginTop: '8px', }}
                                color="success"
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={onUpdateVehicle}
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