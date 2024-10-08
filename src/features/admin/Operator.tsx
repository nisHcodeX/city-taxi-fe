import { AlertColor, Box, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './index.scss'
import TaxiDialog from '../../components/Dialog/TaxtDialog';
import React, { useEffect, useRef, useState } from 'react';
import OperatorCard from '../../components/adminOperatorCard';
import TaxiAlert from '../../components/Alert';
import { useLazyDeleteOperatorQuery, useLazyGetOperatorsQuery, useOperatorRegisterMutation, useOperatorUpdateMutation } from '../../api/operatorApiSlice';
import { OperatorCreateRes } from '../../types/operator';

export default function OperatorPage() {
    const { t, i18n } = useTranslation();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [triggerRegister, { isLoading }] = useOperatorRegisterMutation();
    const [trigerGetOperators, { isLoading: isOperatorsLoading, data: operatorList }] = useLazyGetOperatorsQuery();
    const [triggerOperatorUpdate,] = useOperatorUpdateMutation();
    const [triggerDeleteOperator] = useLazyDeleteOperatorQuery();
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [phoneNumberError, setPhoneNumberError] = React.useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
    const [message, setMessage] = React.useState<{ message: string, type: AlertColor } | null>(null);
    const [updateOperator, setUpdateOperator] = React.useState<OperatorCreateRes | undefined>(undefined);

    useEffect(() => {
        trigerGetOperators()
    }, []);

    const handleRegister = async (data: any) => {
        setMessage(null);
        if (updateOperator) {
            const updateData = {id: updateOperator.id, ...data}
            triggerOperatorUpdate(updateData)
                .unwrap()
                .then(res => { setMessage({ message: 'Successfuly update the operator', type: 'success' }), trigerGetOperators(); })
                .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
            setOpenDialog(false);
        } else {

            triggerRegister(data)
                .unwrap()
                .then(res => { setMessage({ message: 'Successfuly added operator to system', type: 'success' }), trigerGetOperators(); })
                .catch(err => setMessage({ message: err?.data?.message, type: 'error' }));
            setOpenDialog(false);
        }
    };

    const onUpdateOperator = (id: number) => {
        const operator = operatorList?.find((operator: OperatorCreateRes) => operator.id == id);
        setUpdateOperator(operator);
        setOpenDialog(true);
    }

    const onOperatorDeleteClick = async (id: number) => {
        const result = await triggerDeleteOperator(id);
        if (result.isSuccess) {
            setMessage({ message: 'operator succesfully deleted', type: 'info' });
            trigerGetOperators();
        }
    };

    const onCloseClick = () => {
        setMessage(null);
        setOpenDialog(false);
        setUpdateOperator(undefined);
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

    const addVehicle = () => {
        return <>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '0px' }} className="login-wrapper"
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
                                    defaultValue={updateOperator?.name || ''}
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
                                    defaultValue={updateOperator?.name || ''}
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
                                    defaultValue={updateOperator?.email || ''}
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
                                    defaultValue={updateOperator?.phoneNumber || ''}
                                />
                            </FormControl>
                        </Box>
                    </Card>
                </CardContent>
            </Box>
        </>
    }

    return (
        <div>
            <h2 className='title-dash'>Operators List</h2>
            {message && <TaxiAlert text={message.message} severity={message.type} onClose={() => setMessage(null)} />}
            <TaxiDialog open={openDialog} handleClose={onCloseClick} title={'add Operator to system'} infoText={"You can add Operator in here"} children={addVehicle()} handleContinue={() => validateInputs()} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="add-driver-container">
                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                    >
                        Add Operator
                    </Button>
                </div>
                <div className="driver-body">
                    <div className='vehicle-container'>
                        {isOperatorsLoading && <CircularProgress />}
                        {
                            operatorList?.map((operator: OperatorCreateRes, index: number) =>
                                <OperatorCard
                                    key={index}
                                    data={operator}
                                    onDeleteClick={(id) => onOperatorDeleteClick(id)}
                                    onUpdateClick={(id) => onUpdateOperator(id)}
                                />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
