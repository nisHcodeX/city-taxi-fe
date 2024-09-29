import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material'
import React, { useEffect } from 'react';

interface AlertProps {
    text: string;
    severity: AlertColor,
    onClose: ()=> void
}

interface State {
    message?: string;
}

const TaxiAlert = ({ text, severity, onClose }: AlertProps) => {
    const [state, setState] = React.useState<State>({message: undefined});

    const handleClose = () => {
        setState({ message: undefined });
        onClose();
    };
    useEffect(() => {
        return () => {
            setState({ message: text });
        };
    }, [text])

    return (
        <Snackbar
            anchorOrigin={{ vertical : 'top', horizontal: 'right'}}
            open={state.message ? true : false}
        >
            <Alert severity={severity} onClose={handleClose}>
                {state.message}
            </Alert>
        </Snackbar>
    )
}

export default TaxiAlert