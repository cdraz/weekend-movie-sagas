import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// Material UI imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

function AddMovieForm() {

    // Store access, dispatch hook, history hook
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const history = useHistory();

    // On component load, fetch genres to be used as selector options
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Set state variable for inputs
    const [movieInput, setMovieInput] = useState({ title: '', poster: '', description: '', genre_id: '' });

    // Declare handleChange
    const handleChange = event => {
        console.log('in handlechange');
        setMovieInput({
            ...movieInput,
            [event.target.name]: event.target.value
        })
    }

    // Declare handleSubmit
    const handleSubmit = event => {
        event.preventDefault();
        console.log('in onSubmit, POSTing: ', movieInput);
        dispatch({
            type: 'ADD_MOVIE',
            payload: movieInput
        })
        history.push('/');
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', backgroundColor: '#eee', color: '#fff'}}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            required
                            name="title"
                            label="Title"
                            defaultValue=""
                            onChange={handleChange}
                            variant="filled"
                            sx={{ margin: '10px' }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            required
                            name="poster"
                            label="Poster URL"
                            defaultValue=""
                            onChange={handleChange}
                            variant="filled"
                            sx={{ margin: '10px' }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="genre-input">Genre *</InputLabel>
                        <Select
                            required
                            name="genre_id"
                            labelId="genre-input"
                            defaultValue=""
                            onChange={handleChange}
                            variant="filled"
                            sx={{ margin: '10px' }}
                        >
                            {genres.map((genre) => (
                                <MenuItem
                                    key={genre.id}
                                    value={genre.id}
                                >
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            required
                            multiline
                            rows={4}
                            name="description"
                            label="Description"
                            defaultValue=""
                            onChange={handleChange}
                            variant="filled"
                            sx={{ margin: '10px' }}
                        />
                        <Button variant="contained" type="submit" color="secondary" sx={{ marginTop: '15px' }}>
                            Save Movie
                        </Button>
                    </FormControl>
                </form>
            </CardContent>
            <CardActions>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </Link>
            </CardActions>
        </Card>

    )
}

export default AddMovieForm;