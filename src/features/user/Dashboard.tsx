import { useTranslation } from 'react-i18next';
import './index.scss';
import UserRideCrd from '../../components/userRideCard';
import { AlertColor, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Rating } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useEffect, useState } from 'react';
import { Value } from 'sass';
import LogoContainer from '../../components/logoContainer';
import { useLazyGetBookingByidQuery } from '../../api/bookingApiSlice';
import { useAddReviewMutation } from '../../api/reviewApiSlice';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [openPay, setOpenPay] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<number >(0);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [value, setValue] = useState<number | null>(2);
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] = useLazyGetBookingByidQuery();
  const [triggerCreateRview] = useAddReviewMutation();
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;
  

  useEffect(() => {
    triggerGetBookings({ customerId: accData.uderId});
  }, []);

  const handleReview = () => {
    triggerCreateRview({bookingId: bookingId, rating: value ?? 0})
    .unwrap()
    .then(res => { setMessage({ message: 'sucessfully reviewed', type: 'success' }) })
    .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    
  }
  const handlePayment = () => {
    setMessage({ message: 'sucessfully pay the amount', type: 'success' })
  }

  const onPayRide = (data: any) => {
    console.log('onPayRide data ', data ) 
    setOpenPay(true);
  }

  const oReviewRide = (data: any) => {
    setBookingId(data.id)
    setOpen(true)
  }

  return (
    <div className='user-view'>
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      <h2 className='title-dash'>User Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Dialog open={open} >
          <DialogTitle>Review Ride</DialogTitle>
          <DialogContentText sx={{ padding: '0 20px' }}>
            In here here you can review the ride
          </DialogContentText>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}
          >
            <Rating
              className='rating-card'
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="button" onClick={handleReview}>
              Review
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPay} >
          <DialogTitle>Book A Ride</DialogTitle>
          <DialogContentText sx={{ padding: '0 20px' }}>
            Select A start And end destinations to book a ride
          </DialogContentText>
          <DialogContent >
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => setOpenPay(false)}>Cancel</Button>
            <Button variant="contained" type="button" onClick={handlePayment}>
              pay amount
            </Button>
          </DialogActions>
        </Dialog>
        <div className="ride-body">
          {isBookingsLoading && <CircularProgress />}
          {bookingData ?
            bookingData.map((booking, index) => <UserRideCrd key={index} data={booking} oReviewRide={() => oReviewRide(booking)} onPayRide={() => onPayRide(booking)} />)
            : <div className="no-data"> <LogoContainer />
              <h3 className='no-vhicle'>You have no rides yet.</h3></div>}
        </div>
      </div>
    </div>
  );
}
