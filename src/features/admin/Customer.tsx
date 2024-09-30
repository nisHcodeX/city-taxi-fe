
import './index.scss'
import TaxiDialog from '../../components/Dialog/TaxtDialog';
import { useAddVehicleMutation } from '../../api/vehicleApiSlice';
import DriverCard from '../../components/driverCard';
import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import LogoContainer from "../../components/logoContainer";
import { useNavigate } from "react-router";
import { useLazyGetCustomerQuery, useRegisterMutation } from "../../api/customerApiSlice";
import React, { useEffect } from "react";
import { TCreateCustomer } from "../../types/customer";
import TaxiAlert from "../../components/Alert";
import CustomerCard from '../../components/adminCustomerCard';

const customerData = [
  {
    "id": 5,
    "name": "nishedha",
    "email": "nishedha.srilak@gmail.com",
    "phoneNumber": "+94775145763",
    "createdAt": "2024-09-29T10:06:26.44331Z",
    "updatedAt": null
  },
  {
    "id": 6,
    "name": "fdf",
    "email": "nishedha.srilak@gmail.com1",
    "phoneNumber": "+94775145764",
    "createdAt": "2024-09-29T11:46:20.899983Z",
    "updatedAt": null
  }
]
export default function CustomerPage() {
  const navigate = useNavigate();
  const [triggerRegister, { isLoading }] = useRegisterMutation();

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
  const [message, setMessage] = React.useState<{message: string, type: AlertColor}| null>(null);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const onBackClick = () => {
      navigate('/login');
  };

  const handleRegister = async (data: TCreateCustomer) => {
      setMessage(null);
      triggerRegister(data)
          .unwrap()
          .then(res => {setMessage({message: 'Successfuly registered customer please check your email to login', type: 'success'})})
          .catch(err => setMessage({message: err?.data?.message, type: 'error'}));
  };

  const validateInputs = () => {

      const firstName = document.getElementById('firstName') as HTMLInputElement;
      const lastName = document.getElementById('lastName') as HTMLInputElement;
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
      if (!lastName.value) {
          setLastNameError(true);
          setLastNameErrorMessage('Please enter last name');
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

      if (isValid) handleRegister({ name: firstName.value, email: email.value, phoneNumber: phoneNumber.value });
  };
  const addCustomer = () => {
    return <>
            <Box sx={{ width: '100%', typography: 'body1',marginTop: '0px' }} className="login-wrapper"
            >
                <CardContent sx={{ width: '600px' }}>
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
                                    placeholder="First Name"
                                    autoComplete="firstName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={firstNameError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'firstName' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="lastName">Last Name</FormLabel>
                                <TextField
                                    className="input-item"
                                    error={lastNameError}
                                    helperText={lastNameErrorMessage}
                                    id="lastName"
                                    type="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    autoComplete="lastName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={lastNameError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'lastName' }}
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
                                />
                            </FormControl>
                            {/* <FormControl>
                                <FormLabel className="sign-label" htmlFor="password">Password</FormLabel>
                                <TextField
                                    className="input-item"
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    autoComplete="password"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <TextField
                                    className="input-item"
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="confirmPassword"
                                    type="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="confirm Password"
                                    autoComplete="confirmPassword"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl> */}
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
      <h2 className='title-dash'>Customer List</h2>
      <TaxiDialog open={openDialog} handleClose={() => setOpenDialog(false)} title={'add customer to system'} infoText={"You can add customer in here"} children={addCustomer()} handleContinue={() => validateInputs()} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="add-driver-container">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Customer
          </Button>
        </div>
        <div className="driver-body">
          <div className='vehicle-container'>
            {customerData.map((customer, index) => <CustomerCard key={index} data={customer} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
