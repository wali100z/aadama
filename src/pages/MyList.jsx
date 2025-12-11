import React from 'react';
import useLocalStorage from '../hooks/LocalStorage';
import { Link } from 'react-router-dom';

export default function MinListe() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  function remove(id) {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container">
        <h2>Din liste er tom</h2>
        <p><Link to="/">Gå tilbage til aktiviteter</Link></p>
      </div>
    );
  }

  return (
    <main className="container">
      {favorites.map(f => (
        <article key={f.id} className="card">
          <h3>{f.title}</h3>
          <p>{f.description}</p>
          <button onClick={() => remove(f.id)}>Fjern</button>
        </article>
      ))}
    </main>
  );
}