import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// Material UI imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function AddMovieForm() {

    // Store access, dispatch hook
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    
    // On component load, fetch genres to be used as selector options
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);


    return (
        <Paper sx={{ height: '500px', width: '500px', margin: 'auto' }}>

        </Paper>
    )
}

export default AddMovieForm;