import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import AddMovieForm from'../AddMovieForm/AddMovieForm';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  return (
      <div className="App">
        <h1>The Movies Saga!</h1>
        <Router>        
          <Route path="/" exact>
            <MovieList />
          </Route>
          
          <Route path="/details" exact>
            <MovieDetails />
          </Route>

          <Route path="/addmovie" exact>
            <AddMovieForm />
          </Route>
        </Router>
      </div>
  );
}


export default App;
