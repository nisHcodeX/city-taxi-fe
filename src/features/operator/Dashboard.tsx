import { useTranslation } from 'react-i18next';
import './index.scss'
import DriverCard from '../../components/driverCard';
import { AlertColor, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import Home from '../home/Home';
import GeocodingAutocomplete from '../../components/locationSearch';
import TaxiCard from '../../components/taxiCard';
import { VehicleType } from '../../const';
import { TLocationData } from '../../types/geoLocation';
import { useGetDriversQuery } from '../../api/driverApiSlice';
import TaxiAlert from '../../components/Alert';
export default function Dashboard() {
  const { t, i18n } = useTranslation();

  const { data, error, isLoading } = useGetDriversQuery();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = useState<TLocationData | undefined>(undefined)
  const [customerData, setcustomerData] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const onBook = () => {
    if (customerData) {
      setOpen(true);
    } else {
      setMessage({ message: 'Please Add customer first', type: 'error' })
      setOpen(false);
    }

  };
  const handleContinue = () => {
    if (customerData) {
      setMessage({ message: 'Succesfully booked a ride', type: 'success' })
      setOpen(false);
    } else {
      setMessage({ message: 'Please Add customer first', type: 'error' })
    }
  };

  const locationResults = (data: TLocationData) => {
    data && setLocationData(data);
  }

  useEffect(() => {
    return () => {
      if (locationData?.lat && locationData.lng) {
        (async () => {
          // const { data, isLoading, isError } = await trigerNearbyDriver({ radius: 3, lat: locationData.lat, lng: locationData.lng });
        })()
      }
    };
  }, [locationData])

  return (
    <div>
      <h2 className='title-dash'>Operator Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="add-driver-container">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Customer
          </Button>
        </div>
        {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
        <Dialog open={open} >
          <DialogTitle>Book A Ride</DialogTitle>
          <DialogContentText sx={{ padding: '0 20px' }}>
            Select A start And end destinations to book a ride
          </DialogContentText>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}
          >
            <div className='detail' style={{ padding: '10px 20px' }}>Toyota</div>
            <div className='detail' style={{ padding: '10px 20px' }}>Aqua</div>
            <div className='detail' style={{ padding: '10px 20px' }}>Price per km Rs 250</div>
            <div className='detail' style={{ padding: '10px 20px' }}>Customer name : nishedha</div>
            <div className='detail' style={{ padding: '10px 20px' }}>Customer Email: nishedha.srilak@gamil.com</div>
            <div className='detail' style={{ padding: '10px 20px' }}>Customer Phone number: +94775145763</div>

            <FormLabel>Start Destination</FormLabel>
            <GeocodingAutocomplete results={(data) => console.log('data', data)} />
            <FormLabel>End Destination</FormLabel>
            <GeocodingAutocomplete results={(data) => console.log('data', data)} />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="button" onClick={handleContinue}>
              Add ride
            </Button>
          </DialogActions>
        </Dialog>
        <Box className="home-body" >
          <div className="search-container">
            <div className="text-container">
            </div>
            <div className="location">
              <GeocodingAutocomplete results={locationResults} initialLat={6.032894799999999} initialLng={80.2167912} />
            </div>
          </div>
          {
            isLoading && <CircularProgress />
          }
          <div className="ride-body">
            <TaxiCard vehicleType={VehicleType.BIKE} onRideBook={() => onBook()} />
            <TaxiCard vehicleType={VehicleType.CAR} onRideBook={() => onBook()} />
            <TaxiCard vehicleType={VehicleType.BIKE} onRideBook={() => onBook()} />
          </div>
        </Box>
      </div>
    </div>
  );
}
