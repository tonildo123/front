import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  Typography,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({ open, handleClose, selectedItem }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {selectedItem ? `${selectedItem.name.toUpperCase()} ${selectedItem.lastname.toUpperCase()}` : ''}
      </DialogTitle>
      <DialogContent>
        {selectedItem && (
          <>
            <Typography variant="body1">EMAIL: {selectedItem.email}</Typography>
            <Typography variant="body1">TELEFONO: {selectedItem.phone}</Typography>
            <Typography variant="body1">CUMPLEAÑOS: {selectedItem.brithdate}</Typography>
            <Typography variant="body1">CUIT: {selectedItem.cuit}</Typography>
            <Typography variant="body1">address: {selectedItem.address}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
