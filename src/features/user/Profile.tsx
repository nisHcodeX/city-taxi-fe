import { useTranslation } from 'react-i18next';
import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, TextField } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useEffect, useState } from 'react';

import './index.scss';
import { useCustomerUpdateMutation, useLazyGetCustomerQuery } from '../../api/customerApiSlice';
import { useNavigate } from 'react-router';
import { accountType } from '../../const';
import { TUpdateCustomer } from '../../types/customer';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [triggerGetCustomer, { data: customerData }] = useLazyGetCustomerQuery();
  const [triggerUpdateCustomer, { isLoading }] = useCustomerUpdateMutation();
  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  useEffect(() => {
    if (!accData) {
      navigate('/login');
    } else if (accData.accountType == accountType.customer) {
      triggerGetCustomer(accData.userId);
    } else {
      localStorage.removeItem('account');
      navigate('/login');
    }
  }, []);

  const handleRegister = async (data: any) => {
    const updatedData: TUpdateCustomer = { id: accData.userId, ...data }
    triggerUpdateCustomer(updatedData)
      .unwrap()
      .then(res => { setMessage({ message: 'Successfuly Updated customer!', type: 'success' }) })
      .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
    setMessage(null);
  };

  const validateInputs = () => {

    const firstName = document.getElementById('firstName') as HTMLInputElement;
    // const lastName = document.getElementById('lastName') as HTMLInputElement;
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
    // if (!lastName.value) {
    //   setLastNameError(true);
    //   setLastNameErrorMessage('Please enter last name');
    //   isValid = false;
    // } else {
    //   setLastNameError(false);
    //   setLastNameErrorMessage('');
    // }
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

  return (
    <div className='user-view'>
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
      <h2 className='title-dash'>User Profile</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {customerData ? <div className="ride-body">
          <Box sx={{ width: '100%', typography: 'body1', marginTop: '50px' }} className="login-wrapper"
          >
            <CardContent sx={{ width: '600px' }}>
              <Card variant='outlined' className="login-card">
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
                    <FormLabel className="sign-label" htmlFor="firstName">Name</FormLabel>
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
                      defaultValue={customerData[0].name || ''}
                    />
                  </FormControl>
                  {/* <FormControl>
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
                      defaultValue={customerData[0].name || ''}
                    />
                  </FormControl> */}
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
                      disabled
                      defaultValue={customerData[0].email || ''}
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
                      defaultValue={customerData[0].phoneNumber || ''}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={validateInputs}
                  >
                    {isLoading ? <CircularProgress /> : 'Update'}
                  </Button>
                </Box>
              </Card>
            </CardContent>
          </Box>
        </div> : <CircularProgress />}
      </div>
    </div>
  );
}
