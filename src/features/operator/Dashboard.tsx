import { useTranslation } from 'react-i18next';
import './index.scss'
import { AlertColor, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import GeocodingAutocomplete from '../../components/locationSearch';
import TaxiCard from '../../components/taxiCard';
import { TLocationData } from '../../types/geoLocation';
import { useLazyGetNearByQuery } from '../../api/driverApiSlice';
import TaxiAlert from '../../components/Alert';
import AddCustomerByOperator from './addcutomer';
import { TCreateCustomerRes } from '../../types/customer';
import { TDriverNearByRes } from '../../types/driver';
import LocationDataNotFound from '../../components/locationNotFound';
export default function Dashboard() {
  const { t, i18n } = useTranslation();

  // const { data, error, isLoading } = useGetDriversQuery();
  const [triggerNearbyDriver, { data, isLoading, isError }] = useLazyGetNearByQuery();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = useState<TLocationData | undefined>(undefined)
  const [customerData, setCustomerData] = useState<TCreateCustomerRes | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false);

  const onBook = (driver: TDriverNearByRes) => {
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
    if (locationData?.lat && locationData.lng) {
      triggerNearbyDriver({ radius: 4, lat: locationData.lat, lng: locationData.lng });
    }
  }, [locationData, triggerNearbyDriver]);

  const customerDataGetter = (data: TCreateCustomerRes) => {
    setCustomerData(data);
  }

  return (
    <div>
      <h2 className='title-dash'>Operator Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', }}>
        <div className="add-driver-container">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Customer
          </Button>
        </div>
        {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
        <Dialog open={openDialog} >
          <DialogTitle>Operator Add Customer</DialogTitle>
          <AddCustomerByOperator customerData={customerDataGetter} setOpenDialog={setOpenDialog} />
        </Dialog>
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
            {
              isLoading && <CircularProgress />
            }
            {
              (data && !isLoading) ? data.map((driver, index) => <TaxiCard key={index} data={driver} onRideBook={() => onBook(driver)} />)
                : <LocationDataNotFound />
            }
          </div>
        </Box>
      </div>
    </div>
  );
}
