import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123456',
    database: 'popreviewdb',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

app.post('/register', (req, res) => {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    const checkEmailSQL = 'SELECT email FROM users WHERE email = ?';
    const checkUsernameSQL = 'SELECT username FROM users WHERE username = ?';
    const emailValue = [sentEmail];
    const usernameValue = [sentUserName];

    db.query(checkEmailSQL, emailValue,  (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error, please try again later.' });
        } 
        if (results.length > 0) {
            return res.status(409).json({ message: 'Username or Email already registered.'});
        } 
        db.query(checkUsernameSQL, usernameValue,  (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Server error, please try again later.' });
            } 
            if (results.length > 0) {
                return res.status(409).json({ message: 'Username or Email already registered.' });
            } 
        });
        
        const insertSQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        const insertValues = [sentEmail, sentUserName, sentPassword];

        db.query(insertSQL, insertValues, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Registration failed, please try again.' });
            } 
            console.log('User inserted successfully!');
            res.status(201).json({ message: 'User added!' });
        });
    });
});




app.post('/login', (req, res)=>{
    const sentloginUserName = req.body.LoginUserName
    const sentLoginPassword = req.body.LoginPassword

    const SQL = 'SELECT * FROM users WHERE username = ? && password = ?' 
    const Values = [sentloginUserName, sentLoginPassword]


   db.query(SQL, Values, (err, results) =>{
       if(err){
           res.send({error: err})
       }
       if(results.length > 0){
           res.send(results)
       }else{
           res.send({message: 'Credentials Do not match'})
           
       }
   })

})


app.post('/watched', async (req, res) => {
    const { userId, movieId } = req.body;
    console.log(userId,movieId,"watched")

    try {
       
        const checkMovieSQL = 'SELECT movie_id FROM movies WHERE movie_id = ?';
        const [rows] = await db.promise().query(checkMovieSQL, [movieId]);

        if (rows.length === 0) {
            
            const tmdbAPIKey = 'd2fc8ccb1e7a6405789c65213a8efdb3'; 
            const tmdbURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbAPIKey}`;

            const response = await axios.get(tmdbURL);
            const movieDetails = response.data;

            
            const insertMovieSQL = 'INSERT INTO movies (movie_id, title, poster_path, release_date, vote_average, overview) VALUES (?, ?, ?, ?, ?, ?)';
            await db.promise().execute(insertMovieSQL, [
                movieId,
                movieDetails.title,
                movieDetails.poster_path,
                movieDetails.release_date,
                movieDetails.vote_average,
                movieDetails.overview
            ]);
        }

     
        const insertUserMovieSQL = 'INSERT INTO user_movies (user_id, movie_id, list_type) VALUES (?, ?, "watched") ON DUPLICATE KEY UPDATE list_type="watched"';
        await db.promise().execute(insertUserMovieSQL, [userId, movieId]);

        res.status(200).send({ message: 'Movie added to watched!' });
    } catch (error) {
        console.error('Error adding movie to watched:', error);
        res.status(500).send({ error: 'Error adding movie to watched' });
    }
});


app.post('/watchlist', async (req, res) => {
    const { userId, movieId } = req.body;
    console.log(userId,movieId,"Watchlist")

    try {
        const checkMovieSQL = 'SELECT movie_id FROM movies WHERE movie_id = ?';
        const [rows] = await db.promise().query(checkMovieSQL, [movieId]);

        if (rows.length === 0) {
            const tmdbAPIKey = 'd2fc8ccb1e7a6405789c65213a8efdb3'; 
            const tmdbURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbAPIKey}`;

            const response = await axios.get(tmdbURL);
            const movieDetails = response.data;

            const insertMovieSQL = 'INSERT INTO movies (movie_id, title, poster_path, release_date, vote_average, overview) VALUES (?, ?, ?, ?, ?, ?)';
            await db.promise().execute(insertMovieSQL, [
                movieId,
                movieDetails.title,
                movieDetails.poster_path,
                movieDetails.release_date,
                movieDetails.vote_average,
                movieDetails.overview
            ]);
        }

        const insertUserMovieSQL = 'INSERT INTO user_movies (user_id, movie_id, list_type) VALUES (?, ?, "watchlist") ON DUPLICATE KEY UPDATE list_type="watchlist"';
        await db.promise().execute(insertUserMovieSQL, [userId, movieId]);

        res.status(200).send({ message: 'Movie added to watchlist!' });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        res.status(500).send({ error: 'Error adding movie to watchlist' });
    }
});

app.post('/favorites', async (req, res) => {
    const { userId, movieId } = req.body;
    console.log(userId, movieId, "Favoritos");

    try {
        const checkMovieSQL = 'SELECT movie_id FROM movies WHERE movie_id = ?';
        const [rows] = await db.promise().query(checkMovieSQL, [movieId]);

        if (rows.length === 0) {
            const tmdbAPIKey = 'd2fc8ccb1e7a6405789c65213a8efdb3'; 
            const tmdbURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbAPIKey}`;

            const response = await axios.get(tmdbURL);
            const movieDetails = response.data;

            const insertMovieSQL = 'INSERT INTO movies (movie_id, title, poster_path, release_date, vote_average, overview) VALUES (?, ?, ?, ?, ?, ?)';
            await db.promise().execute(insertMovieSQL, [
                movieId,
                movieDetails.title,
                movieDetails.poster_path,
                movieDetails.release_date,
                movieDetails.vote_average,
                movieDetails.overview
            ]);
        }

        const insertUserMovieSQL = 'INSERT INTO user_movies (user_id, movie_id, list_type) VALUES (?, ?, "favorites") ON DUPLICATE KEY UPDATE list_type="favorites"';
        await db.promise().execute(insertUserMovieSQL, [userId, movieId]);

        res.status(200).send({ message: 'Movie added to favorites!' });
    } catch (error) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).send({ error: 'Error adding movie to favorites' });
    }
});

app.delete('/user/:userId/favorites/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;
    console.log(userId, movieId, "delete from favorites");

    try {
        const deleteSQLFavorites = 'DELETE FROM user_movies WHERE user_id = ? AND movie_id = ? AND list_type = "favorites"';
        const [result] = await db.promise().execute(deleteSQLFavorites, [userId, movieId]);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Movie removed from favorites successfully' });
        } else {
            res.status(404).send({ error: 'Movie or user not found in favorites' });
        }
    } catch (error) {
        console.error('Error removing movie from favorites:', error);
        res.status(500).send({ error: 'Error removing movie from favorites' });
    }
});

app.delete('/user/:userId/watched/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;
    console.log(userId, movieId, "Delete from watched");

    try {
        const DeleteSQLWatched = 'DELETE FROM user_movies WHERE user_id = ? AND movie_id = ? AND list_type = "watched"';
        const [result] = await db.promise().execute(DeleteSQLWatched, [userId, movieId]);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Movie removed from watched successfully' });
        } else {
            res.status(404).send({ error: 'Movie or user not found in watched' });
        }
    } catch (error) {
        console.error('Error removing movie from watched:', error);
        res.status(500).send({ error: 'Error removing movie from fwatched' });
    }
});



app.delete('/user/:userId/watchlist/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;
    console.log(userId,movieId,"delete from watchlist")
    const deleteSQL = 'DELETE FROM user_movies WHERE user_id = ? AND movie_id = ? AND list_type = "watchlist"';
    
    try {
        const [result] = await db.promise().execute(deleteSQL, [userId, movieId]);
        
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Movie removed from watchlist successfully' });
            
        } else {
            res.status(404).send({ error: 'Movie or user not found in watchlist' });
        }
    } catch (error) {
        console.error('Error removing movie from watchlist:', error);
        res.status(500).send({ error: 'Error removing movie from watchlist' });
    }
});




app.post('/user/:userId/movies', async (req, res) => {
    const { userId } = req.params;
    console.log(userId,"post")
    const { tmdbId, title, poster_path, release_date, vote_average, overview, listType } = req.body;

    try {
        const checkMovieSQL = 'SELECT movie_id FROM movies WHERE movie_id = ?';
        const [rows] = await db.promise().query(checkMovieSQL, [tmdbId]);

        if (rows.length === 0) {
            const insertMovieSQL = 'INSERT INTO movies (movie_id, title, poster_path, release_date, vote_average, overview) VALUES (?, ?, ?, ?, ?, ?)';
            await db.promise().execute(insertMovieSQL, [tmdbId, title, poster_path, release_date, vote_average, overview]);
        }

        const insertUserMovieSQL = 'INSERT INTO user_movies (user_id, movie_id, list_type) VALUES (?, ?, ?)';
        await db.promise().execute(insertUserMovieSQL, [userId, tmdbId, listType]);

        res.status(200).send({ message: `Movie added to ${listType}!` });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).send({ error: 'Error adding movie to list' });
    }
});


app.get('/user/:userId/movies/:listType', (req, res) => {
    const { userId, listType } = req.params;
    const SQL = 'SELECT m.* FROM movies m JOIN user_movies um ON m.movie_id = um.movie_id WHERE um.user_id = ? AND um.list_type = ?';
    db.query(SQL, [userId, listType], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});



