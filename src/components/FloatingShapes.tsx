import styles from '@/styles/components/FloatingShapes.module.css';

export default function FloatingShapes() {
  return (
    <div className={styles.floatingShapes}>
      <div className={`${styles.shape} ${styles.circle}`} style={{width: '20px', height: '20px', left: '10%', animationDelay: '0s'}}></div>
      <div className={`${styles.shape} ${styles.triangle}`} style={{left: '20%', animationDelay: '2s'}}></div>
      <div className={`${styles.shape} ${styles.square}`} style={{width: '15px', height: '15px', left: '30%', animationDelay: '4s'}}></div>
      <div className={`${styles.shape} ${styles.circle}`} style={{width: '25px', height: '25px', left: '40%', animationDelay: '6s'}}></div>
      <div className={`${styles.shape} ${styles.triangle}`} style={{left: '50%', animationDelay: '8s'}}></div>
      <div className={`${styles.shape} ${styles.square}`} style={{width: '18px', height: '18px', left: '60%', animationDelay: '10s'}}></div>
      <div className={`${styles.shape} ${styles.circle}`} style={{width: '22px', height: '22px', left: '70%', animationDelay: '12s'}}></div>
      <div className={`${styles.shape} ${styles.triangle}`} style={{left: '80%', animationDelay: '14s'}}></div>
      <div className={`${styles.shape} ${styles.square}`} style={{width: '16px', height: '16px', left: '90%', animationDelay: '16s'}}></div>
    </div>
  );
}
