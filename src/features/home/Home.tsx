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
import { useBookRideMutation } from '../../api/bookingApiSlice';
import { TCreateBooking } from '../../types/booking';


export default function Home() {
  const navigate = useNavigate();
  const [triggerNearbyDriver, { data, isLoading, isError }] = useLazyGetNearByQuery();
  const [triggerBookRide, { isLoading: isBookingLoading }] = useBookRideMutation()
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = useState<TLocationData | undefined>({ address: 'galle', lat: 6.026143327519091, lng: 80.21649701908821 });
  const [startLocationData, setStartLocationData] = useState<TLocationData | undefined>(undefined);
  const [endLocationData, setEndLocationData] = useState<TLocationData | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<TDriverNearByRes | undefined>(undefined);
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
    setSelectedDriver(driver);
    setStartLocationData({ address: driver.locationName, lat: driver.latitude, lng: driver.longitude })
    setOpen(true);
  };
  const handleContinue = () => {
    if (!startLocationData) {
      setMessage({ message: 'Please Select the Start Destination', type: 'error' });
    } else if (!endLocationData) {
      setMessage({ message: 'Please Select the End Destination', type: 'error' });
    } else {
      const rideData: TCreateBooking = {
        customerId: accData.userId,
        destLatitude: endLocationData.lat,
        destLongitude: endLocationData.lng,
        driverId: selectedDriver?.id ?? 1,
        startLatitude: startLocationData.lat,
        startLongitude: startLocationData.lng
      };

      triggerBookRide(rideData)
        .unwrap()
        .then(res => { setMessage({ message: 'Successfuly book a ride', type: 'success' }) })
        .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
      setOpen(false);
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

  return (
    <div>
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      <Dialog open={open} sx={{ zIndex: '999' }}>
        <DialogTitle>Book A Ride</DialogTitle>
        <DialogContentText sx={{ padding: '0 20px' }}>
          Select A start And end destinations to book a ride
        </DialogContentText>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}
        >
          <div className='detail' style={{ padding: '10px 20px' }}>{selectedDriver?.vehicle.manufacturer} {selectedDriver?.vehicle.model}</div>
          <div className='detail' style={{ padding: '10px 20px' }}>{selectedDriver?.vehicle.licensePlate}</div>
          <div className='detail' style={{ padding: '10px 20px' }}>Price per km Rs {selectedDriver?.vehicle.vehicleType.pricePerMeter}</div>

          <FormLabel>Start Destination</FormLabel>
          <GeocodingAutocomplete initialLat={locationData?.lat} initialLng={locationData?.lng} results={(data) => setStartLocationData(data)} />
          <FormLabel>End Destination</FormLabel>
          <GeocodingAutocomplete results={(data) => setEndLocationData(data)} />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={() => { setOpen(false), setSelectedDriver(undefined) }}>Cancel</Button>
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
