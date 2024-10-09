import { useTranslation } from 'react-i18next';
import './index.scss';
import RideCard from '../../components/rideCard';
import React, { useEffect } from 'react';
import { AlertColor, CircularProgress } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useLazyGetBookingByidQuery } from '../../api/bookingApiSlice';
import LogoContainer from '../../components/logoContainer';
import UserRideCrd from '../../components/userRideCard';
import { useAddReviewMutation } from '../../api/reviewApiSlice';

export default function Rides() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] = useLazyGetBookingByidQuery();
  const [triggerCreateRview] = useAddReviewMutation()
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;


  useEffect(() => {
    triggerGetBookings({ driverId: accData.userId});
  }, []);

  const onCompleteRide = (data: any) => {
    triggerCreateRview(data.id)
      .unwrap()
      .then(res => { setMessage({ message: "successfully complete a ride", type: "success" }) })
      .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
  }

  return (
    <div>
      <h2 className='title-dash'>My Rides</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>
      <div className="driver-body">
        {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
        <div className='vehicle-container'>
          {isBookingsLoading && <CircularProgress />}
          {bookingData ?
            bookingData.map((booking, index) => <UserRideCrd key={index} data={booking} onCompleteRide={() => onCompleteRide(booking)} disableButton/>)
            : <div className="no-data"> <LogoContainer />
              <h3 className='no-vhicle'>You have no rides yet.</h3></div>}
        </div>
      </div>
    </div>
  );
}
