import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import workoutList from './workoutList'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { wildcardWorkout } from './wildcardWorkout';

const styles = {
    addButtons:{
        margin: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button:{
        margin: '0.25rem'
    }
}


class SelectWorkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            category: Object.keys(workoutList)[0],
            movement: '',
            movementList: Object.values(workoutList)[0],
            categoryList: Object.keys(workoutList),
            min:10, 
            max:15
        }

        this.handleChange = this.handleChange.bind(this)
        this.updateMovementMenu = this.updateMovementMenu.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.add = this.add.bind(this)
        this.subtract = this.subtract.bind(this)
        this.handleAddWorkout = this.handleAddWorkout.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.handleWildcard = this.handleWildcard.bind(this)
    }
    componentDidMount(){
        this.updateMovementMenu(this.state.category)
    }
    componentDidUpdate(){
        if (this.state.min >= this.state.max){
            this.setState({max: this.state.max + 1})
        }
        
    }

    handleChange(event){
        const { name, value } = event.target;
        if( name === 'category') {
            this.updateMovementMenu(value)
        }
        
        this.setState({[name]: value})
        
    }

    updateMovementMenu(category){
        const list = workoutList[category]
        this.setState({ movementList: list, movement: '' })
    }

    add(event){
        event.preventDefault();
        const { name, value } = event.target;
        let newNum = Number(value) + 1
        this.setState({[name]: newNum})
    }

    subtract(event){
        event.preventDefault();
        const { name, value } = event.target;
        if (value > 1){
            let newNum = Number(value) - 1
            this.setState({[name]: newNum})
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };
    
    handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.setState({open: false})
        } 
        this.setState({open: false})
    };

    handleAddWorkout(){
        
        let { movement, min, max } = this.state
            let workout = [movement, min, max]
            this.props.addWorkout(workout)
            this.handleClear()
            this.handleClose()
    }

    handleClear(){
        this.setState({
            open: false,
            category: Object.keys(workoutList)[0],
            movement: '',
            movementList: Object.values(workoutList)[0],
            categoryList: Object.keys(workoutList),
            min:1, 
            max:2
        })
    }

    handleWildcard(){
        const movement = wildcardWorkout(workoutList)
        const min = 10
        const max = 15
            let workout = [movement, min, max]
            this.props.addWorkout(workout)
            // this.handleClear()
            // this.handleClose()
    }

    validateInput(){
        // check to see if movement is already in this.props.workoutList
        // check if max is higher than min
    }

    render() { 
        const { movementList, categoryList, open, category, movement, max, min } = this.state
        const categoryMenu = categoryList.map(category => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
        ));
        const movementMenu = movementList.map(movements => (
            <MenuItem value={movements} key={movements}>{movements}</MenuItem>
        ));
        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            boxShadow: 'none',
            color: theme.palette.text.secondary,
        }));
        const { classes } = this.props
        return (
        <div>
            <div className={ classes.addButtons }>
                <div className={ classes.button }>
                <Button 
                    variant='outlined' 
                    endIcon={<AddIcon />}
                    onClick={this.handleClickOpen}>
                        Select Exercise
                </Button>
                </div>
                <div className={ classes.button }>
                <Button 
                    variant='outlined' 
                    endIcon={<ShuffleOutlinedIcon />}
                    onClick={this.handleWildcard}>
                        Wildcard Pick
                </Button>
                </div>
            </div>
            <Dialog open={open} onClose={this.handleClose}>
                <DialogTitle>Select Exercise</DialogTitle>
                <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl fullWidth sx={{ m: 1, minWidth: 120}}>
                    <InputLabel htmlFor="category-label">Category</InputLabel>
                    <Select
                        // native
                        labelId="category-label"
                        name='category'
                        value={category}
                        onChange={this.handleChange}
                        input={<OutlinedInput label="Category" id="demo-dialog-native" />}
                    >
                        {categoryMenu}
                    </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1, minWidth: 120}}>
                    <InputLabel htmlFor="movement-label">Movement</InputLabel>
                    <Select
                        // native
                        labelId="movement-label"
                        name='movement'
                        value={movement}
                        onChange={this.handleChange}
                        input={<OutlinedInput label="Movement" id="demo-dialog-native" />}
                    >
                        {movementMenu}
                    </Select>
                    </FormControl>
                </Box>
                <Stack 
                    direction="row" 
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Item>
                        <Typography variant="caption" display="block" gutterBottom>
                            Minimum Reps
                        </Typography>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button 
                                onClick={this.subtract}
                                name='min'
                                value={min}
                            >-</Button>
                            <Button disabled>{min}</Button>
                            <Button 
                                onClick={this.add}
                                name='min'
                                value={min}
                            >+</Button>
                        </ButtonGroup>
                    </Item>
                    <Item>
                        <Typography variant="caption" display="block" gutterBottom>
                            Maximum Reps
                        </Typography>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button 
                                onClick={this.subtract}
                                name='max'
                                value={max}
                            >-</Button>
                            <Button disabled>{max}</Button>
                            <Button 
                                onClick={this.add}
                                name='max'
                                value={max}
                            >+</Button>
                        </ButtonGroup>
                    </Item>
                </Stack>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={movement? this.handleAddWorkout : () => {}}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

export default withStyles(styles)(SelectWorkout);