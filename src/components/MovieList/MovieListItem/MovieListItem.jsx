import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function MovieListItem({ movie }) {

    // Dispatch hook
    const dispatch = useDispatch();

    const onPosterClick = () => {
        console.log('in onPosterClick', movie.id );
        dispatch({
            type: 'FETCH_DETAILS',
            payload: movie.id
        });
    }
    return (
        <Card sx={{ maxWidth: '300px', margin: 'auto', backgroundColor: '#212121' }} key={movie.id} >
            <Link to="/details" style={{ textDecoration: 'none', color: 'white' }}>
                <CardActionArea sx={{ paddingTop: '25px' }}>
                    <CardMedia
                        component="img"
                        image={movie.poster}
                        alt={movie.title}
                        sx={{ height: '360px', width: '240px', margin: 'auto' }}
                        onClick={onPosterClick}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}

export default MovieListItem;