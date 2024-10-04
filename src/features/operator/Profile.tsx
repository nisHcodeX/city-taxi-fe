import { useTranslation } from 'react-i18next';
import './index.scss';
import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, TextField } from '@mui/material';
import TaxiAlert from '../../components/Alert';
import { useEffect, useState } from 'react';
import { useLazyGetOperatorByIdQuery, useOperatorUpdateMutation } from '../../api/operatorApiSlice';
import { useNavigate } from 'react-router';
import { accountType } from '../../const';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<{ message: string, type: AlertColor } | null>(null);
  const [trigerGetOperator, { data: operatorData }] = useLazyGetOperatorByIdQuery();
  const [triggerOperatorUpdate] = useOperatorUpdateMutation();

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const storedAccount = localStorage.getItem('account');
  const accData = storedAccount ? JSON.parse(storedAccount) : null;

  useEffect(() => {
    if (!accData) {
      navigate('/operatorLogin');
    } else if (accData.accountType == accountType.telephoneOperator) {
      trigerGetOperator(accData.userId);
    } else {
      localStorage.removeItem('account');
      navigate('/operatorLogin');
    }
  }, []);

  const handleRegister = async (data: any) => {
    const updateData = {
      id: accData.userId, 
      ...data
    }
    triggerOperatorUpdate(updateData)
      .unwrap()
      .then(res => { setMessage({ message: 'Successfuly update the operator', type: 'success' }) })
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
      <h2 className='title-dash'>Operator Profile</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="ride-body">
          {operatorData ? <Box sx={{ width: '100%', typography: 'body1', marginTop: '50px' }} className="login-wrapper"
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
                      defaultValue={operatorData[0].name}
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
                      defaultValue={operatorData[0].name}
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
                      defaultValue={operatorData[0].email}
                      disabled
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
                      defaultValue={operatorData[0].phoneNumber}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={validateInputs}
                  >
                    {false ? <CircularProgress /> : 'Update'}
                  </Button>
                </Box>
              </Card>
            </CardContent>
          </Box> : <CircularProgress />}
        </div>
      </div>
    </div>
  );
}
