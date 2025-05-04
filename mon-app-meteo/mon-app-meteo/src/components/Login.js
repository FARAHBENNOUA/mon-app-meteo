import React, { useState } from 'react';
import apiService from '../api'; // Importez votre service API
import './Login.css';

function Login({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Utilisez votre service API au lieu de Firebase directement
      const userData = await apiService.auth.login(email, password);
      
      // Stockez le token si nécessaire
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
      }
      
      console.log('Connexion réussie!');
      onClose();
    } catch (error) {
      console.error("Erreur de connexion:", error);
      
      // Messages d'erreur adaptés à votre API
      if (error.response) {
        if (error.response.status === 401) {
          setError('Email ou mot de passe incorrect');
        } else if (error.response.status === 429) {
          setError('Trop de tentatives, veuillez réessayer plus tard');
        } else {
          setError('Erreur lors de la connexion: ' + (error.response.data?.message || 'Erreur inconnue'));
        }
      } else {
        setError('Impossible de se connecter au serveur');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <div className="modal-header">
          <h2>Connexion</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="modal-footer">
          <p>Pas encore de compte? <button className="switch-form-button" onClick={onSwitchToRegister}>Inscrivez-vous!</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;