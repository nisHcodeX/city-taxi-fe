import { AlertColor, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, ListItemIcon } from '@mui/material';
import LogoContainer from '../../components/logoContainer';
import './index.scss';
import {
  MenuOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import TaxiCard from '../../components/taxiCard';
import { VehicleType } from '../../const';
import GeocodingAutocomplete from '../../components/locationSearch';
import { useEffect, useState } from 'react';
import { TLocationData } from '../../types/geoLocation';
import { useLazyGetNearByQuery } from '../../api/driverApiSlice';
import TaxiAlert from '../../components/Alert';
import { TDriverNearByRes } from '../../types/driver';
import LocationDataNotFound from '../../components/locationNotFound';


export default function Home() {
  const navigate = useNavigate();
  const [triggerNearbyDriver, { data, isLoading, isError }] = useLazyGetNearByQuery();
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = useState<TLocationData | undefined>({ address: 'galle', lat: 6.026143327519091, lng: 80.21649701908821 })
  const [open, setOpen] = useState<boolean>(false);
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;

  useEffect(() => {
    if (!accData) {
      navigate('/login');
    } else if (accData.accountType != 'CUSTOMER') {
      localStorage.removeItem('account');
      navigate('/login');
    }
  }, [])

  const onUserClick = () => {
    navigate('/user/dashboard');
  };
  const onBook = (driver: TDriverNearByRes) => {
    console.log('driver', driver)
    setOpen(true);
  };
  const handleContinue = () => {
    setMessage({ message: 'Succesfully booked a ride', type: 'success' })
    setOpen(false);
  };

  const locationResults = (data: TLocationData) => {
    data && setLocationData(data);
  }

  useEffect(() => {
    if (locationData?.lat && locationData.lng) {
      triggerNearbyDriver({ radius: 4, lat: locationData.lat, lng: locationData.lng });
    }
  }, [locationData, triggerNearbyDriver]);

  console.log('data', data);
  return (
    <div>
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
      <div className="home-nav">
        <div className="nav-inner">
          <LogoContainer width='100px' onClick={() => onUserClick()} />
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', fontSize: "1.7rem", cursor: 'pointer' }} className='user-home' onClick={onUserClick}>
            <MenuOutlined />
          </ListItemIcon>
        </div>
      </div>
      <Box className="home-body" sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', position: 'absolute', width: '100%', alignItems: 'center' }} >
        <div className="search-container">
          <div className="text-container">
          </div>
          <div className="location">
            <GeocodingAutocomplete results={locationResults} initialLat={locationData?.lat} initialLng={locationData?.lng} />
          </div>
        </div>
        {
          isLoading && <CircularProgress />
        }
        {
          (data && !isLoading) ? data.map((driver, index) => <TaxiCard key={index} data={driver} onRideBook={() => onBook(driver)} />)
            : <LocationDataNotFound />
        }
      </Box>
    </div>
  );
}
