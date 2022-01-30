const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// GET details
router.get('/:id', (req, res) => {
  const queryText = `
    SELECT
      movies.id,
      movies.title,
      movies.poster,
      movies.description,
      ARRAY_AGG(genres.name) AS genre_array
    FROM movies
    JOIN movies_genres
      ON movies.id = movies_genres.movie_id
    JOIN genres
      ON movies_genres.genre_id = genres.id
    WHERE movies.id = $1
    GROUP BY movies.id
  `
  const queryParams = [req.params.id]
  pool.query(queryText, queryParams)
    .then( result => {
      res.send(result.rows);
    })
    .catch( err => {
      console.error('ERROR: Get details for selected movie', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  console.log('in delete ', req.body);
  // Delete from movies_genres first
  const queryText = `
    DELETE FROM movies_genres
    WHERE movie_id = $1;
  `
  const queryParams = [
    req.params.id
  ]
  pool.query(queryText, queryParams)
    // Then delete from movies
    .then(
      result => { 
      const nextQueryText = `
        DELETE FROM movies
        WHERE id = $1;
        `
      const nextQueryParams = [
        req.params.id
      ]
      pool.query(nextQueryText, nextQueryParams)
      .then( result => res.sendStatus(201))
      .catch( err => console.error ('error in second delete from movies', err));
    })
    .catch( err => {
      console.error('ERROR: delete movie', err);
      res.sendStatus(500);
    })
  
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;