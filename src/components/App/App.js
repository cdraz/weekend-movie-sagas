import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import AddMovieForm from'../AddMovieForm/AddMovieForm';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ddd',
      },
      secondary: {
        main: '#834bff',
      },
    },
  });

  return (
      <div className="App">
        <h1>The Movies Saga!</h1>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </div>
  );
}


export default App;
