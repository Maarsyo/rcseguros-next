// src/pages/cotacao.tsx
import { useState } from 'react';
import styles from '../styles/components/Cotacao.module.css'; 

export default function Cotacao() {
  const [possuiVeiculo, setPossuiVeiculo] = useState<null | boolean>(null);

  return (
    <div className={styles.container}>
      <h1>Pattini SEGUROS</h1>
      <h2>Cotação de Seguro Auto com até 15 Seguradoras</h2>
      <p>Preencha seus dados e receba sua cotação personalizada em minutos</p>

      <div className={styles.pergunta}>
        <p>Você já possui o veículo?</p>
        <div className={styles.botoes}>
          <button onClick={() => setPossuiVeiculo(false)} className={possuiVeiculo === false ? styles.ativo : ''}>
            👎 Não
          </button>
          <button onClick={() => setPossuiVeiculo(true)} className={possuiVeiculo === true ? styles.ativo : ''}>
            👍 Sim
          </button>
        </div>
      </div>

      {possuiVeiculo !== null && (
        <div className={styles.formulario}>
          {/* Aqui você pode adicionar os campos do formulário */}
          <p>Formulário para cotação aparecerá aqui...</p>
        </div>
      )}
    </div>
  );
}
