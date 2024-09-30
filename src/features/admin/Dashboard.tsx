import { useTranslation } from 'react-i18next';
import './index.scss';
import { AlertColor, Button, FormLabel, TextField } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);

  const onUpdateClick = () => {
    setMessage({message: 'successfully update meter price', type:"success"})
  } 
  return (
    <div>
      <h2 className='title-dash'>Admin Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      </div>
      <div className="ride-body">
        <PieChart

          series={[
            {
              data: [
                { id: 0, value: 10, label: 'Customers' },
                { id: 1, value: 15, label: 'Rides' },
                { id: 2, value: 20, label: 'Drivers' },
              ],
            },
          ]}
          width={400}
          height={200}
        />
        <div className='vehicle-price'>
          <h3>Add Vehicle meter Price</h3>
          <div>
            <div>
              Vehicle type : Bike
            </div>
            <div>
              seatCount: 1
            </div>
            <div>
              <FormLabel className="sign-label" htmlFor="pricePerMeterBike">Price PerMeter</FormLabel>
              <TextField
                className="input-item"
                id="pricePerMeterBike"
                type="pricePerMeterBike"
                name="pricePerMeterBike"
                placeholder="150.00"
                autoComplete="pricePerMeterBike"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: 'pricePerMeterBike' }}
              />
            </div>
          </div>
          <div>
            <div>
              Vehicle type : car
            </div>
            <div>
              seatCount: 4
            </div>
            <div>
              <FormLabel className="sign-label" htmlFor="pricePerMeter">Price PerMeter</FormLabel>
              <TextField
                className="input-item"
                id="pricePerMeter"
                type="pricePerMeter"
                name="pricePerMeter"
                placeholder="250.00"
                autoComplete="pricePerMeter"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: 'pricePerMeter' }}
              />
            </div>

          </div>
          <div className="btn-con">

            <Button variant='contained' onClick={onUpdateClick}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
