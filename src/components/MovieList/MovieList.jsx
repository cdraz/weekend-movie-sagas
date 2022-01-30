import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieListItem from './MovieListItem/MovieListItem';
import { Link } from 'react-router-dom';

// Material UI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                justifyContent="center"
                margin="50px"
            >
                <Grid item xs={2} sm={4} md={4}>
                    <Link to="/addmovie" style={{ textDecoration: 'none' }}>
                        <Button variant="contained">
                            Add New Movie
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="movies"
            >
                {movies.map(movie => (
                    <Grid item xs={2} sm={4} md={4} key={movies.indexOf(movie)}>
                        <MovieListItem movie={movie} key={movie.id}/>
                    </Grid>
                ))}
            </Grid>
        </main>

    );
}

export default MovieList;