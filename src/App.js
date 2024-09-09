import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes y estilos importados
import Navbar from './navbar/navbar';
import Home from './home/home';

import MovieList from './components/MovieList/movieList';

// Componentes de Watchlist y Explore
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Favorites } from "./components/Favorites";
import Explore from "./components/Explore";
import Movie from "./components/movie";

// Estilos CSS y contexto global
import "./App.css";
import "./lib/font-awesome/css/all.min.css";
import { GlobalProvider } from "../src/context/GlobalState";


// Componentes de autenticación
import Login from '../src/LoginRegister/client/vite-project/src/Components/Login/Login'
import Register from '../src/LoginRegister/client/vite-project/src/Components/Register/Register'

// Contexto de autenticación
import { AuthProvider } from '../src/UserContexr/authContext';

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movies/:type" element={<MovieList />} />
            <Route exact path="/watchlist" element={<>
              <Header />
              <Watchlist />
            </>} />
            <Route exact path="/watched" element={<>
              <Header />
              <Watched />
            </>} />
            <Route exact path="/favorites" element={<>
              <Header />
              <Favorites />
            </>} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<Movie />} />
         
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<h1>Error Page</h1>} />
          </Routes>
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
