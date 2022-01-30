import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

function MovieDetails() {

    // Store access, dispatch hook, history hook
    const details = useSelector(store => store.details[0]);
    const dispatch = useDispatch();
    const history = useHistory();

    // Declare onRemove
    const onRemove = () => {
        console.log('in onRemove', details.id, details.title);
        // Confirm delete
        let confirm = window.confirm(`Are you sure you want to delete ${details.title}?`);
        // Remove selected movie from the db if confirmed
        if (!confirm) {
            return;
        }
        dispatch({
            type: 'DELETE_MOVIE',
            payload: details.id
        });
        ( history.push('/') );
    }

    return (
        <Card sx={{
            maxWidth: 600,
            margin: 'auto',
            backgroundColor: '#212121',
            color: '#fff',
            padding: '25px'
        }}>
            <CardMedia
                component="img"
                image={details.poster}
                alt={details.title}
                sx={{ height: '40%', width: '40%', margin: 'auto' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {details.title}
                </Typography>
                <Typography variant="body2" align="justify">
                    {details.description}
                </Typography>
                <Typography variant="caption" align="justify" >
                    {/* If a movie is selected, then display genre, otherwise say no movie selected */}
                    {details.id ? 'Genre:' : 'No movie selected.'} {details.genre_array.join(', ')}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="outlined">
                        Back
                    </Button>
                </Link>
                {/* If a movie is selected, then display the remove button */}
                { details.id ? 
                <Button onClick={onRemove} size="small" variant="contained" color="warning" sx={{ marginLeft: 'auto' }}>
                    Remove
                </Button>
                    : ''
                }
            </CardActions>
        </Card>
    )
}

export default MovieDetails;