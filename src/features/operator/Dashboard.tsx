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
import { TCreateCustomerRes, TCreateUnRegCustomer, TCreateUnRegCustomerRes } from '../../types/customer';
import { TDriverNearByRes } from '../../types/driver';
import LocationDataNotFound from '../../components/locationNotFound';
import { useBookRideMutation } from '../../api/bookingApiSlice';
import { TCreateBooking } from '../../types/booking';
export default function Dashboard() {
  const { t, i18n } = useTranslation();

  // const { data, error, isLoading } = useGetDriversQuery();
  const [triggerNearbyDriver, { data, isLoading, isError }] = useLazyGetNearByQuery();
  const [triggerBookRide, { isLoading: isBookingLoading }] = useBookRideMutation()
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = useState<TLocationData | undefined>({ address: 'galle', lat: 6.026143327519091, lng: 80.21649701908821 });
  const [customerData, setCustomerData] = useState<TCreateCustomerRes | TCreateUnRegCustomerRes | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<TDriverNearByRes | undefined>(undefined);
  const [startLocationData, setStartLocationData] = useState<TLocationData | undefined>(undefined);
  const [endLocationData, setEndLocationData] = useState<TLocationData | undefined>(undefined);

  
  const onBook = (driver: TDriverNearByRes) => {
    if (customerData) {
      setSelectedDriver(driver);
      setOpen(true);
    } else {
      setMessage({ message: 'Please Add customer first', type: 'error' })
      setOpen(false);
    }
  };
  const handleContinue = () => {

    if (customerData) {
      if (!startLocationData) {
        setMessage({ message: 'Please Select the Start Destination', type: 'error' });
      } else if (!endLocationData) {
        setMessage({ message: 'Please Select the End Destination', type: 'error' });
      } else {
        const rideData: TCreateBooking = {
          customerId: customerData.id,
          destLatitude: endLocationData.lat,
          destLongitude: endLocationData.lng,
          driverId: selectedDriver?.id ?? 1,
          startLatitude: startLocationData.lat,
          startLongitude: startLocationData.lng
        };
  
        triggerBookRide(rideData)
          .unwrap()
          .then(res => { setMessage({ message: 'Successfuly book a ride', type: 'success' }), locationData && triggerNearbyDriver({ radius: 4, lat: locationData.lat, lng: locationData.lng }); })
          .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
        setOpen(false);
      }
      
    } else {
      setMessage({ message: 'Please Add customer first', type: 'error' })
    }
    setOpen(false);
    setSelectedDriver(undefined);
    setMessage(null)
  };

  const locationResults = (data: TLocationData) => {
    data && setLocationData(data);
  }

  useEffect(() => {
    if (locationData?.lat && locationData.lng) {
      triggerNearbyDriver({ radius: 4, lat: locationData.lat, lng: locationData.lng });
    }
  }, [locationData, triggerNearbyDriver]);

  const customerDataGetter = (data: TCreateCustomerRes | TCreateUnRegCustomerRes) => {
    setCustomerData(data);
  }
  const onBackClick = () => {
    setCustomerData(undefined);
    setMessage(null)
    setSelectedDriver(undefined)
    setOpen(false)
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
        <Dialog open={openDialog} sx={{ zIndex: '999' }}>
          <DialogTitle>Operator Add Customer</DialogTitle>
          <AddCustomerByOperator customerData={customerDataGetter} setOpenDialog={setOpenDialog} />
        </Dialog>
        <Dialog open={open} sx={{ zIndex: '999' }} >
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
            <Button onClick={onBackClick}>Cancel</Button>
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
              <GeocodingAutocomplete results={locationResults} initialLat={locationData?.lat} initialLng={locationData?.lng} />
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
                : <div className="location-no-data"><LocationDataNotFound /></div>
            }
          </div>
        </Box>
      </div>
    </div>
  );
}
