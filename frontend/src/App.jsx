import React, { useEffect, useState } from 'react' // Ajout de React ici
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("En attente du backend...")

  useEffect(() => {
    // On ajoute un log pour voir si l'appel est lancé
    console.log("Appel au backend lancé...");
    
    axios.get('http://localhost:8081/api/hello')
      .then(res => {
        console.log("Réponse reçue :", res.data);
        setMessage(res.data);
      })
      .catch(err => {
        console.error("Détails de l'erreur :", err);
        setMessage("Erreur de connexion !");
      });
  }, [])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test de Liaison</h1>
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <strong>Statut : </strong> {message}
      </div>
    </div>
  )
}

export default App; // Vérifie bien que cette ligne est présente !