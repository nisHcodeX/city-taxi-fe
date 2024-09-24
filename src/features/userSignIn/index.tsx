import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import LogoContainer from "../../components/logoContainer";
import { useNavigate } from "react-router";

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
    },
}));

export default function UserSignInPage() {
    const navigate = useNavigate ();

    const onBackClick = () =>{
        navigate('/login');
    };

    return (
        <SignInContainer>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '50px' }} className="login-wrapper"
            >
                <CardContent sx={{ width: '600px' }}>
                    <Card variant='outlined' className="login-card">
                        <Box sx={{paddingTop: '20px'}}>
                            <LogoContainer />
                        </Box>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', padding: "0px 0 0 20px", textAlign: 'start' }}
                        >
                            User Sign Up
                        </Typography>
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
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="firstName"
                                    type="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    autoComplete="firstName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="lastName">Last Name</FormLabel>
                                <TextField
                                    className="input-item"
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="lastName"
                                    type="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    autoComplete="lastName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="email">Email</FormLabel>
                                <TextField
                                    className="input-item"
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel className="sign-label" htmlFor="phoneNumber">Phone Number</FormLabel>
                                <TextField
                                    className="input-item"
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="phoneNumber"
                                    type="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="phone number"
                                    autoComplete="phoneNumber"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={emailError ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'email' }}
                                />
                            </FormControl>
                            <FormControl>
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
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                            // onClick={validateInputs}
                            >
                                Sign in
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                            onClick={onBackClick}
                            >
                                Back
                            </Button>
                        </Box>
                    </Card>
                </CardContent>
            </Box>
        </SignInContainer>
    )
}