import styled from "@emotion/styled";
import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import LogoContainer from "../../components/logoContainer";
import { useNavigate } from "react-router";
import { useLazyGetCustomerQuery, useRegisterMutation, useUnregCustomerMutation } from "../../api/customerApiSlice";
import React, { useEffect } from "react";
import { TCreateCustomer, TCreateCustomerRes, TCreateUnRegCustomer, TCreateUnRegCustomerRes } from "../../types/customer";
import TaxiAlert from "../../components/Alert";

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
interface AddCustomerByOperatorProps {
    customerData: any,
    setOpenDialog: any,
}


export default function AddCustomerByOperator({ customerData, setOpenDialog }: AddCustomerByOperatorProps) {
    const [triggerRegister, { isLoading }] = useUnregCustomerMutation();

    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [phoneNumberError, setPhoneNumberError] = React.useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
    const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);


    const registeredData = (data: TCreateUnRegCustomerRes[]) => {
        customerData(data[0])
        setMessage({ message: 'Successfuly registered customer', type: 'success' })
        // setOpenDialog(false);
    }
    const handleRegister = async (data: TCreateUnRegCustomer) => {
        setMessage(null);
        let newData: TCreateUnRegCustomer = { name: data.name, phoneNumber: data.phoneNumber };
        if (data.email) {
            newData = { ...newData, email: data.email }
        }
        triggerRegister(newData)
            .unwrap()
            .then(res => registeredData(res))
            .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
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
        // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        //     setEmailError(true);
        //     setEmailErrorMessage('Please enter a valid email address.');
        //     isValid = false;
        // } else {
        //     setEmailError(false);
        //     setEmailErrorMessage('');
        // }
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
        <SignInContainer>
            {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '0px' }} className="login-wrapper"
            >
                <CardContent sx={{ width: '600px', }}>
                    <Card variant='outlined' >
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
                                    // error={emailError}
                                    // helperText={emailErrorMessage}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    // autoComplete="email"
                                    // autoFocus
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
                            <Button
                                type="button"
                                variant="contained"
                                onClick={validateInputs}
                                aria-hidden="false"
                            >
                                {isLoading ? <CircularProgress /> : 'Create Customer'}
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Card>
                </CardContent>
            </Box>
        </SignInContainer>
    )
}