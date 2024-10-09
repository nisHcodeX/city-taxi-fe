import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import './index.scss';
import TaxiDialog from '../../components/Dialog/TaxtDialog';
import React, { useEffect, useState } from 'react';
import { useAddVehicleMutation } from '../../api/vehicleApiSlice';
import DriverCard from '../../components/driverCard';
import UserRideCrd from '../../components/userRideCard';
import { useLazyGetBookingsQuery } from '../../api/bookingApiSlice';
import { TBookingRide } from '../../types/booking';

export default function RidesPage() {
  const { t, i18n } = useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [triggerAddVehicle, { isLoading }] = useAddVehicleMutation();
  const [triggerGetBookings, { isLoading: isBookingsLoading, data: bookingData }] =
    useLazyGetBookingsQuery();

  const [modelError, setModelError] = React.useState(false);
  const [modelErrorMessage, setModelErrorMessage] = React.useState('');
  const [manufacturerError, setManufacturerError] = React.useState(false);
  const [manufacturerErrorMessage, setManufacturerErrorMessage] = React.useState('');
  const [colourError, setColourError] = React.useState(false);
  const [colourErrorMessage, setColourErrorMessage] = React.useState('');
  const [licensePlateError, setLicensePlateError] = React.useState(false);
  const [licensePlateErrorMessage, setLicensePlateErrorMessage] = React.useState('');

  useEffect(() => {
    triggerGetBookings();
  }, []);

  const oReviewRide = (data: TBookingRide) => {};
  const onPayRide = (data: TBookingRide) => {};

  const validateInputs = () => {
    const model = document.getElementById('model') as HTMLInputElement;
    const manufacturer = document.getElementById('manufacturer') as HTMLInputElement;
    const colour = document.getElementById('colour') as HTMLInputElement;
    const licensePlate = document.getElementById('licensePlate') as HTMLInputElement;
    const vehicleTypeId = document.getElementById('vehicleTypeId') as HTMLInputElement;

    let isValid = true;

    if (!model.value) {
      setModelError(true);
      setModelErrorMessage('add model please');
      isValid = false;
    } else {
      setModelError(false);
      setModelErrorMessage('');
    }
    if (!manufacturer.value) {
      setManufacturerError(true);
      setManufacturerErrorMessage('add manufacturer please');
      isValid = false;
    } else {
      setManufacturerError(false);
      setManufacturerErrorMessage('');
    }
    if (!colour.value) {
      setColourError(true);
      setColourErrorMessage('add color please');
      isValid = false;
    } else {
      setColourError(false);
      setColourErrorMessage('');
    }
    if (!licensePlate.value) {
      setLicensePlateError(true);
      setLicensePlateErrorMessage('add manufacturer please');
      isValid = false;
    } else {
      setLicensePlateError(false);
      setLicensePlateErrorMessage('');
    }
    // if (!lastName.value) {
    //   setManufacturerError(true);
    //   setManufacturerErrorMessage('add manufacturer please');
    //   isValid = false;
    // } else {
    //   setManufacturerError(false);
    //   setManufacturerErrorMessage('');
    // }

    // if (isValid) handleRegister({ name: firstName.value, email: email.value, phoneNumber: phoneNumber.value });
  };
  const addVehicle = () => {
    return (
      <>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            gap: 2,
            padding: '40px 20px',
          }}
        >
          <FormControl>
            <FormLabel className="sign-label" htmlFor="model">
              Vehicle Model
            </FormLabel>
            <TextField
              className="input-item"
              error={modelError}
              helperText={modelErrorMessage}
              id="model"
              type="model"
              name="model"
              placeholder="Aqua"
              autoComplete="model"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={modelError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'model' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="manufacturer">
              Manufacturer
            </FormLabel>
            <TextField
              className="input-item"
              error={manufacturerError}
              helperText={manufacturerErrorMessage}
              id="manufacturer"
              type="manufacturer"
              name="manufacturer"
              placeholder="Toyota"
              autoComplete="manufacturer"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={manufacturerError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'manufacturer' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="colour">
              Color
            </FormLabel>
            <TextField
              className="input-item"
              error={colourError}
              helperText={colourErrorMessage}
              id="colour"
              type="colour"
              name="colour"
              placeholder="red"
              autoComplete="colour"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={colourError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'color' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="licensePlate">
              License plate
            </FormLabel>
            <TextField
              className="input-item"
              error={licensePlateError}
              helperText={licensePlateErrorMessage}
              id="licensePlate"
              type="licensePlate"
              name="licensePlate"
              placeholder="AB-7980"
              autoComplete="licensePlate"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={licensePlateError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'licensePlate' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="sign-label" htmlFor="vehicleTypeId">
              Vehicle type
            </FormLabel>
            <Select labelId="vehicleTypeId" id="vehicleTypeId" value={1} label="">
              <MenuItem value={1}>Car</MenuItem>
              <MenuItem value={2}>Bike</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };
  console.log('bookingData', bookingData);
  return (
    <div>
      <h2 className="title-dash">Bookings List</h2>
      <TaxiDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={'add vehicle to system'}
        infoText={'You can add vehicle in here'}
        children={addVehicle()}
        handleContinue={() => validateInputs()}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* <div className="add-driver-container">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Driver
          </Button>
        </div> */}
        <div className="driver-body">
          <div className="vehicle-container">
            {isBookingsLoading && <CircularProgress />}
            {bookingData ? (
              bookingData.map((booking, index) => (
                <UserRideCrd
                  key={index}
                  data={booking}
                  oReviewRide={() => oReviewRide(booking)}
                  onPayRide={() => onPayRide(booking)}
                  
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
