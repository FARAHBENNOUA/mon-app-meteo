import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import config from '../config/config';

function Navbar({ onLoginClick, onRegisterClick }) {
  const { currentUser, logout } = useAuthContext();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="logo">{config.app.name}</div>
      
      <div className="nav-actions">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={darkMode ? "Mode clair" : "Mode sombre"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        
        <div className="auth-buttons">
          {currentUser ? (
            <div className="user-info">
              <span>{currentUser.email}</span>
              <button onClick={logout}>Déconnexion</button>
            </div>
          ) : (
            <>
              <button onClick={onLoginClick}>Connexion</button>
              <button onClick={onRegisterClick}>Inscription</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;