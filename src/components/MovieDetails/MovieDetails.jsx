import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

function MovieDetails() {

    // Store access
    const details = useSelector(store => store.details[0]);

    return (
        <Card sx={{
            maxWidth: 600,
            margin: 'auto',
            paddingTop: '25px',
            color: '#fff',
            backgroundColor: '#212121'
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
                    <Typography variant="body2" align="justify" sx={{ padding: '15px' }}>
                        {details.description}
                    </Typography>
                    <Typography variant="caption" align="justify">
                        {details.genre_array.length <= 1 ? 'Genre' : 'Genres'}: {details.genre_array.join(', ')}
                    </Typography>
                </CardContent>
            <CardActions>
                <Link to ="/">
                    <Button size="small" color="primary">
                        Back
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default MovieDetails;