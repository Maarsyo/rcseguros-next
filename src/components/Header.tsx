"use client"

import { useState } from 'react';
import styles from '@/styles/components/Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>
            RCSeguros
          </a>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
            <li><a href="/seguros-auto">Seguros Auto</a></li>
            <li><a href="/outros-seguros">Outros Seguros</a></li>
            <li><a href="/consorcio">Consórcio</a></li>
            <li><a href="/seguro-empresa">Seguro Empresa</a></li>
            <li><a href="/sobre-nos">Sobre nós</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}