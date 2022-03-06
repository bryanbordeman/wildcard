export default {
    root:{
        color: 'red'
    },
    workout : {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '900',
        width: '100%',
        // height: '25%',
        textAlign: 'center',
        fontSize: '5vmin',
        color: 'white',
        backgroundColor: '#1875D1',
        margin: '0 auto',
        // padding: '0.125rem',
        textTransform: 'uppercase',
        position:'fixed',
        bottom:'0px',
        padding: '0'
        
        // marginBottom: '-4.5px',
    },
    workoutOverlay: {
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        // transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)'
    },
    showOverlay: {
      // opacity: '1',
      // transform: 'scale(50)',
      // zIndex: '10',
      // position: 'absolute',
    },
    workoutBanner:{
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '8vmin',
        transform: 'scale(0.1)',
        opacity: '0',
        backgroundColor: '#1875D1',
        color: 'white',
        transition: 'all 0.4s ease-in-out',
        zIndex: '0',
            '& h1': {
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '700',
                textShadow: '1px 2px black',
                // background: 'rgba(255, 255, 255, 0.3)',
                width: '100%',
                textAlign: 'center',
                marginBottom: '0',
                padding: '1rem',
                textTransform: 'uppercase',
            }
    },
    showWorkout: {
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.1s',
        
    },
    timeContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        fontSize: '18vw'
    },
    rounds:{
        width: '1.75ch',
        marginLeft: '0.75rem',
        color: '#979797',
    },
    time:{
        width: '4.25ch',
        marginRight: '.75rem',
        color: '#1875D1',
    },
    
    actionButtonsContainerLandscape:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonsContainerPortrait:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    actionButton:{
        fontSize: '0px'
    },
    customIconButton:{
        fontSize: '7vw',
    },
    customIconButtonPortrait:{
        fontSize: '12vw',
    }
};