import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import PokemonsListe from './components/PokemonsListe';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <div className="nav-brand">POKEWEB</div>
                    <div className="nav-links">
                        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            Accueil
                        </NavLink>
                        <NavLink to="/pokemons" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            Liste Pokémon
                        </NavLink>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokemons" element={<PokemonsListe />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;