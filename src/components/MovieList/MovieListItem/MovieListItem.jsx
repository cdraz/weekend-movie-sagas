import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div key={movie.id} >
            <h3>{movie.title}</h3>
            <Link to="/details">
                <img src={movie.poster} alt={movie.title} onClick={onPosterClick}/>
            </Link>
        </div>
    );
}

export default MovieListItem;