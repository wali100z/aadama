import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './BurgerMenu.css';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <header className="burger-header">
      <button aria-label="menu" className="burger-btn" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>
      {open && (
        <nav className="burger-nav" onClick={() => setOpen(false)}>
          <ul>
            <li><Link to="/">Forside</Link></li>
            <li><Link to="/min-liste">Min liste</Link></li>
            <li><Link to="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}