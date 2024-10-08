import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TaxiAlert from '../../components/Alert';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { accountType, Roles } from '../../const';
import { useNavigate } from 'react-router';
import LogoContainer from '../../components/logoContainer';
import { AlertColor, CircularProgress } from '@mui/material';
import { useInternalLoginMutation } from '../../api/loginApiSlice';
import { TLoggeedData, TLoginData } from '../../types/login';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean, loginType: Roles }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [triggerLogin, { isLoading }] = useInternalLoginMutation();
  const [message, setMessage] = React.useState<{message: string, type: AlertColor}| null>(null);
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginSuccess = (res: TLoggeedData) => {
    localStorage.setItem('account', JSON.stringify(res));
    if(res.accountType == accountType.admin){
      navigate(`/admin/dashboard`);
    }
  };

  const handleSubmit = (data: TLoginData) => {
    setMessage(null);
    triggerLogin(data)
    .unwrap()
    .then(res => loginSuccess(res))
    .catch(err => setMessage({message: err?.data?.message, type: 'error'}));
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if(isValid) handleSubmit({username: email.value, password: password.value});
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      {message && <TaxiAlert text={message.message} severity={message.type} onClose={()=>setMessage(null)}/>}
      <Box>
      <LogoContainer/>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign:'start', padding: '0px 0px 20px 0px',}}
      >
        Admin Login
      </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel className="sign-label" htmlFor="email">Email</FormLabel>
          <TextField
            className='input-item'
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            className='input-item'
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        {/* <ForgotPassword open={open} handleClose={handleClose} loginType={props.loginType} /> */}
        <Button
          sx={{ marginTop: '16px' }}
          type="button"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          {isLoading ? <CircularProgress /> : 'Log in'}
        </Button>
      </Box>
    </SignInContainer>
  );
}
