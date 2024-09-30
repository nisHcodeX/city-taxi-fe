import { useTranslation } from 'react-i18next';
import './index.scss';
import UserRideCrd from '../../components/userRideCard';
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Rating } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useState } from 'react';
import { Value } from 'sass';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [openPay, setOpenPay] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [value, setValue] = useState<number | null>(2);

  const handleReview = () => {
    setMessage({ message: 'sucessfully reviewed', type: 'success' })
  }
  const handlePayment = () => {
    setMessage({ message: 'sucessfully pay the amount', type: 'success' })
  }

  const onPayRide = () => {
    setOpenPay(true)
  }

  const oReviewRide = () => {
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
        <UserRideCrd vehicleType={1} oReviewRide={() => oReviewRide()} />
        <UserRideCrd vehicleType={2} onPayRide={() => onPayRide()} />
      </div>
      </div>
    </div>
  );
}
