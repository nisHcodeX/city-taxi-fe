import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { Roles } from '../../const';
import { useNavigate } from 'react-router';
import LogoContainer from '../../components/logoContainer';
import { TLoggeedData, TLoginData } from '../../types/login';
import { useLoginMutation } from '../../api/loginApiSlice';
import { AlertColor } from '@mui/material';
import TaxiAlert from '../../components/Alert';
// import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';

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
  const [triggerLogin, { isLoading }] = useLoginMutation();
  const [message, setMessage] = React.useState<{message: string, type: AlertColor}| null>(null);
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const loginSuccess = (res: TLoggeedData) => {
    localStorage.setItem('account', JSON.stringify(res));
    if(res.accountType == "CUSTOMER"){
      navigate('/');
    }else{
      navigate('driver/dashboard')
    }
  };

  const handleSubmit = (data: TLoginData) => {
    setMessage(null)
    triggerLogin(data)
    .unwrap()
    .then(res => loginSuccess(res))
    .catch(err => setMessage({message: err?.data?.message, type: 'error'}));
  };

  const onSingupNavigate = () => {
    if (props.loginType == Roles.USER) {
      navigate('/userSignin')
    } else {
      navigate('/driverSignIn')
    }
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
      setPasswordErrorMessage('Password Error.');
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
        Sign in
      </Typography>
      </Box>
      <Box
        component="form"
        // onSubmit={handleSubmit}
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
            {/* <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link> */}
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
        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
        {/* <ForgotPassword open={open} handleClose={handleClose} loginType={props.loginType} /> */}
        <Button
          sx={{ marginTop: '16px' }}
          type="button"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Log in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              onClick={onSingupNavigate}
              variant="body2"
              sx={{ alignSelf: 'center', cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      {/* <Divider>or</Divider> */}
    </SignInContainer>
  );
}

{/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
<Button
  type="submit"
  fullWidth
  variant="outlined"
  onClick={() => alert('Sign in with Google')}
  startIcon={<GoogleIcon />}
>
  Sign in with Google
</Button>
<Button
  type="submit"
  fullWidth
  variant="outlined"
  onClick={() => alert('Sign in with Facebook')}
  startIcon={<FacebookIcon />}
>
  Sign in with Facebook
</Button>
</Box> */}