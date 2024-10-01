import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './index.scss';
interface DilaogProps {
  open: boolean;
  handleClose: () => void;
  handleContinue?: () => void;
  children?: any;
  title?: any
  infoText?: any
}

export default function TaxiDialog({ open, handleClose, children, title, infoText, handleContinue }: DilaogProps) {

  return (
    <Dialog
      className='dialog-custom'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          {infoText}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="button" onClick={handleContinue}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}