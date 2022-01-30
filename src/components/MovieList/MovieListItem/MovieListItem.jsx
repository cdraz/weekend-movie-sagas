function MovieListItem({ movie }) {

    const onPosterClick = () => {
        console.log('in onPosterClick', movie.id );
    }
    return (
        <div key={movie.id} >
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} onClick={onPosterClick}/>
        </div>
    );
}

export default MovieListItem;