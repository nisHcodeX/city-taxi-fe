import { useTranslation } from 'react-i18next';
import './index.scss';
import RideCard from '../../components/rideCard';
import React from 'react';
import { AlertColor } from '@mui/material';
import TaxiAlert from '../../components/Alert';

export default function Rides() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);

  const onCompleteRide = () => {
    setMessage({message: "successfully complete a ride", type:"success"})
  }

  return (
    <div>
      <h2 className='title-dash'>My Rides</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>
      <div className="driver-body">
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
        <div className='vehicle-container'>
          <RideCard vehicleType={1} onCompleteRide={onCompleteRide}/>
          <RideCard vehicleType={2} />
        </div>
      </div>
    </div>
  );
}
