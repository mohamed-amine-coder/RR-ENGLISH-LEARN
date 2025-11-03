import styles from "./Hero.module.css";
import HelloImg from "../../assets/hello.png";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.textContainer}>
        <h1>
          <span className={styles.name}>RR-ENGLISH</span> <br /> <br />
          <span className={styles.learn}>تعلم</span>
          <span className={styles.interact}>تفاعل</span>
          <span className={styles.succeed}>وتفوق</span>
        </h1>
      </div>
      <div className={styles.imageContainer}>
        <img src={HelloImg} alt="Hello" />
      </div>
    </section>
  );
}
