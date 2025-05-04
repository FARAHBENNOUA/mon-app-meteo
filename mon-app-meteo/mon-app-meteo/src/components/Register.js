import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';


function Register({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, error } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire d'inscription soumis"); // Débogage
    
    // Réinitialiser l'erreur
    setLocalError('');
    
    // Vérifier la correspondance des mots de passe
    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas");
      return;
    }
    
    // Vérifier la complexité du mot de passe
    if (password.length < 6) {
      setLocalError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Tentative d'inscription avec:", email); // Débogage

      // Option 1: Utiliser votre contexte d'authentification
      const user = await signup(email, password);
      
      // Option 2 (alternative): Appeler directement l'API si le contexte ne fonctionne pas
      // const userData = await apiService.auth.register(email, password);
      // if (userData.token) {
      //   localStorage.setItem('authToken', userData.token);
      // }
      
      console.log("Inscription réussie:", user); // Débogage
      
      if (user) {
        onClose();
      } else {
        setLocalError("L'inscription a échoué pour une raison inconnue");
      }
    } catch (err) {
      console.error("Erreur d'inscription:", err); // Débogage
      
      if (err.code === 'auth/email-already-in-use') {
        setLocalError("Cet email est déjà utilisé");
      } else if (err.code === 'auth/invalid-email') {
        setLocalError("Format d'email invalide");
      } else if (err.code === 'auth/weak-password') {
        setLocalError("Le mot de passe est trop faible");
      } else {
        setLocalError(err.message || "Une erreur s'est produite lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✕</button>
        
        <h2>Inscription</h2>
        
        {(error || localError) && (
          <p className="error">{localError || error}</p>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              type="email"
              id="reg-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reg-password">Mot de passe</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;