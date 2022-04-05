import * as React from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import logo from '../images/wildcard_logo.svg'
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/SplashStyles'
import InstallPWA from '../components/InstallPWA';
import useIsIOS from '../components/useIsIOS';

function Splash(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
        const { classes, isLandscape } = props
        const { prompt } = useIsIOS();
        return (
            <div>
                {prompt && <InstallPWA />}
                {/* <InstallPWA /> */}
                <div className={classes.dialogButtonContainer}>
                    <div className={classes.dialogButton}>
                        <IconButton 
                            style={styles.customIconButton}
                            color="primary" 
                            size="large"
                            aria-label="info"
                            onClick={handleClickOpen}>
                            <InfoOutlinedIcon 
                            style={styles.customIconButton} 
                            fontSize="inherit"/>
                        </IconButton>
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                    {"How this App Works"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        EMOM is an acronym for "Every Minute On the Minute," 
                        EMOM workouts challenge you to complete a given exercise 
                        for a certain number of reps in less than 60 seconds. 
                        The wildcard element of this application randomly selects 
                        an exercise and reps for from a user-generated list. 
                        Users can determine the minimum and maximum range of 
                        reps for each exercise. ENJOY!!
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
                <div 
                    style={{marginTop: `${!isLandscape? '40%' : ''}`}}
                    className={classes.logoContainer}>
                    <img 
                        className={ !isLandscape? classes.logo : classes.logoLandscape } 
                        src={logo}
                        alt='wildcard-logo'/>
                </div>
                <div className={ classes.navButtons }>
                    <Button 
                    size="large"
                    variant="contained" 
                    endIcon={<ArrowForwardIosIcon />}
                    component={Link}
                    to="/rounds">
                    Start
                    </Button>
                </div>
            </div>
        );
    }


export default withStyles(styles)(Splash);