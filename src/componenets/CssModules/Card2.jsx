// 일반적인 CSS
// import './Card2.css';
// CSS Module
import styles from './card2.module.css';
function Card1() {
  return <article className={styles.card}>Card2</article>;
}

export default Card1;
