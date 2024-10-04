import { useTranslation } from 'react-i18next';
import './index.scss';
import { AlertColor, Button, CircularProgress, FormLabel, TextField } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLazyGetMeterPriceQuery, useMeterPriceUpdateMutation } from '../../api/priceApiSlice';
import { useLazyGetDashboardDetailQuery } from '../../api/adminApiSlice';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [triggerGetMeterPrice, { isLoading, data }] = useLazyGetMeterPriceQuery();
  const [triggerGetDashboard, { isLoading: isDashboardLoading, data: dashboardData }] = useLazyGetDashboardDetailQuery();
  const [triggerUpdatePrices, { isLoading: isPriceLoading }] = useMeterPriceUpdateMutation();
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);

  useEffect(() => {
    triggerGetMeterPrice();
    triggerGetDashboard()
  }, [])
  const onUpdateBikeClick = (id: number) => {
    const pricePerMeterBike = document.getElementById('pricePerMeterBike') as HTMLInputElement;
    if (pricePerMeterBike.value) {
      const data = { id, pricePerMeter: parseFloat(pricePerMeterBike.value) }
      triggerUpdatePrices(data)
        .unwrap()
        .then(res => { setMessage({ message: 'successfully update bike meter price', type: 'success' }), triggerGetMeterPrice() })
        .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    }
  }
  const onUpdateCarClick = (id: number) => {
    const pricePerMeter = document.getElementById('pricePerMeter') as HTMLInputElement;
    if (pricePerMeter.value) {
      const data = { id, pricePerMeter: parseFloat(pricePerMeter.value) }
      triggerUpdatePrices(data)
        .unwrap()
        .then(res => { setMessage({ message: 'successfully update car meter price', type: 'success' }), triggerGetMeterPrice() })
        .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    }
  }
  return (
    <div>
      <h2 className='title-dash'>Admin Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      </div>
      <div className="ride-body">
        {isDashboardLoading ? <CircularProgress /> : <PieChart
          series={[
            {
              data: [
                { id: 0, value: dashboardData?.totalCustomers ?? 1 , label: 'Customers' },
                { id: 1, value: dashboardData?.totalBookings ?? 1, label: 'Rides' },
                { id: 2, value: dashboardData?.totalDrivers ?? 1, label: 'Drivers' },
              ],
            },
          ]}
          width={400}
          height={200}
        />}
        {isLoading ? <CircularProgress /> :
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
                  defaultValue={data ? data[1].pricePerMeter : ''}
                />
              </div>
              <div className="btn-con">
                <Button variant='contained' onClick={() => { data && onUpdateBikeClick(data[1].id) }}>
                  Update Bike Price
                </Button>
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
                  defaultValue={data ? data[0].pricePerMeter : ''}
                />
              </div>
              <div className="btn-con">
                <Button variant='contained' onClick={() => { data && onUpdateCarClick(data[0].id) }}>
                  Update Car Price
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
