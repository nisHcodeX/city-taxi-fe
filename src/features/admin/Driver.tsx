import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './index.scss'
import TaxiDialog from '../../components/Dialog/TaxtDialog';
import React, { useEffect, useState } from 'react';
import { useAddVehicleMutation } from '../../api/vehicleApiSlice';
import DriverCard from '../../components/driverCard';
import { useLazyDeleteDriverQuery, useLazyGetDriversQuery, useRegisterMutation } from '../../api/driverApiSlice';
import { useNavigate } from 'react-router';
import { TLocationData } from '../../types/geoLocation';
import Typography from '@mui/material/Typography';
import LogoContainer from '../../components/logoContainer';
import styled from '@emotion/styled';
import { TCreateDriver, TCreateDriverRes, TDriver } from '../../types/driver';
import GeocodingAutocomplete from '../../components/locationSearch';
import TaxiAlert from '../../components/Alert';
import AdminDriverCard from '../../components/adminDriverCard';

export default function DriverPage() {
  const { t, i18n } = useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [triggerRegister, { isLoading }] = useRegisterMutation();
  const [triggerGetDrivers, { isLoading: isDriversLoading, data: driversList }] = useLazyGetDriversQuery();
  const [triggerDeleteDriver] = useLazyDeleteDriverQuery();
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
  const [locationError, setLocationError] = React.useState(false);
  const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);
  const [locationData, setLocationData] = React.useState<TLocationData | undefined>(undefined)
  const [updatedDriver, setupdatedDriver] = React.useState<TCreateDriverRes | undefined>(undefined);

  useEffect(() => {
    triggerGetDrivers();
  }, []);

  const onDeleteClick = async (id: number) => {
    const results = await triggerDeleteDriver(id);
    if (results.isSuccess) {
      setMessage({ message: 'Succesfully deleted Driver', type: 'info' });
      triggerGetDrivers();
    }
  };
  const onUpdateClick = (id: number) => {
    setOpenDialog(true);
    const driver = driversList.find((driver: TDriver)=> driver.id == id);
    if(driver){
      setupdatedDriver(driver)
    }
  };

  const handleRegister = async (data: TCreateDriver) => {
    setMessage(null);
    if (updatedDriver) {
      triggerRegister(data)
        .unwrap()
        .then(res => { setMessage({ message: 'Successfuly driver updated', type: 'info' }) })
        .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    } else {
      triggerRegister(data)
        .unwrap()
        .then(res => { setMessage({ message: 'Successfuly driver registered to System', type: 'success' }), triggerGetDrivers() })
        .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    }
    setOpenDialog(false);
  };

  const validateInputs = () => {

    const firstName = document.getElementById('firstName') as HTMLInputElement;
    const driverLicense = document.getElementById('driverLicense') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;

    let isValid = true;

    if (!firstName.value) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Please enter first name');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }
    if (!driverLicense.value || !/^\d+$/.test(driverLicense.value)) {
      setLastNameError(true);
      setLastNameErrorMessage('Please enter a valid Driver license');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    if (!phoneNumber.value || !/^\+94\d{9}$/.test(phoneNumber.value)) {
      setPhoneNumberErrorMessage('Please enter a valid phone number.');
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage('');
    }

    if (!locationData || !locationData?.address) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }

    if (isValid && locationData?.address) handleRegister({ name: firstName.value, email: email.value, phoneNumber: phoneNumber.value, driverLicense: driverLicense.value, latitude: locationData.lat, longitude: locationData.lng, locationName: locationData.address });
  };

  const addDriver = () => {
    return <>

      <Box sx={{ width: '100%', typography: 'body1', marginTop: "0px" }} className={'login-wrapper'}>
        <CardContent sx={{ width: '800px' }}>
          <Card variant='outlined'>
            <Box component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
                padding: '40px 20px'
              }} >
              <FormControl>
                <FormLabel className="sign-label" htmlFor="firstName">First Name</FormLabel>
                <TextField
                  className="input-item"
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  id="firstName"
                  type="firstName"
                  name="firstName"
                  placeholder="Name"
                  autoComplete="firstName"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={firstNameError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'firstName' }}
                  defaultValue={updatedDriver?.name || ''}
                />
              </FormControl>
              <FormControl>
                <FormLabel className="sign-label" htmlFor="lastName">Driver License</FormLabel>
                <TextField
                  className="input-item"
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  id="driverLicense"
                  type="driverLicense"
                  name="driverLicense"
                  placeholder="Driver License"
                  autoComplete="driverLicense"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={lastNameError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'lastName' }}
                  defaultValue={updatedDriver?.driverLicense || ''}
                />
              </FormControl>
              <FormControl>
                <FormLabel className="sign-label" htmlFor="email">Email</FormLabel>
                <TextField
                  className="input-item"
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                  defaultValue={updatedDriver?.email || ''}
                />
              </FormControl>
              <FormControl>
                <FormLabel className="sign-label" htmlFor="phoneNumber">Phone Number</FormLabel>
                <TextField
                  className="input-item"
                  error={phoneNumberError}
                  helperText={phoneNumberErrorMessage}
                  id="phoneNumber"
                  type="phoneNumber"
                  name="phoneNumber"
                  placeholder="+94123456789"
                  autoComplete="phoneNumber"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={phoneNumberError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'phonenumber' }}
                  defaultValue={updatedDriver?.phoneNumber || ''}
                />
              </FormControl>
              <FormControl>
                <GeocodingAutocomplete results={(data) => setLocationData(data)} initialLat={updatedDriver?.latitude || undefined} initialLng={updatedDriver?.longitude || undefined} />
                {locationError && <p className="location-error" id="email-helper-text">Please select location.</p>}
              </FormControl>
              {/* <Button
                type="button"
                variant="contained"
                onClick={validateInputs}
              >
                {isLoading ? <CircularProgress /> : 'Sign in'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={onBackClick}
              >
                Back
              </Button> */}
            </Box>
          </Card>
        </CardContent>
      </Box>
    </>
  }

  return (
    <div>
      <h2 className='title-dash'>Drivers List</h2>
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      <TaxiDialog open={openDialog} handleClose={() => setOpenDialog(false)} title={'add Driver to system'} infoText={"You can add Driver in here"} children={addDriver()} handleContinue={() => validateInputs()} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="add-driver-container">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Driver
          </Button>
        </div>
        <div className="driver-body">
          <div className='vehicle-container'>
            {isDriversLoading && <CircularProgress />}
            {driversList?.map((driver: TDriver, index: number) => <AdminDriverCard key={index} data={driver} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
