import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
// import React, { useState, useEffect } from 'react';

export default function InstallPWA() {
const [open, setOpen] = React.useState(true);


// const handleClickOpen = () => {
//     setOpen(true);
// };

const handleClose = () => {
    setOpen(false);
};

React.useEffect(() => {
    console.log('Install PWA Dialog')
})

return (
    <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
        </Button> */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Install Wildcard EMOM"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Install this application on your homescreen for a better experience.
                <p><SystemUpdateAltOutlinedIcon/> &quot; then Add to Home Screen&quot;</p>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {/* <Button onClick={handleClose} autoFocus>
                Install
            </Button> */}
            </DialogActions>
        </Dialog>
    </div>
);
}
