import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { sizing } from '@mui/system';

function MovieDetails() {

    // Store access
    const details = useSelector(store => store.details[0]);

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={details.poster}
                    alt={details.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {details.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {details.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
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