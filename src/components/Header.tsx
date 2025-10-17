import styles from '@/styles/components/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>
            RCSeguros
          </a>
          <ul className={styles.navLinks}>
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
