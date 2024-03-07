import { useState } from "react";
import styles from './Home.module.css';
import img from '../assets/congrat.png'
const Home = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;
  const [luckyNumbers, setLuckyNumbers] = useState(
    Array.from({ length: 6 }, () => getRandomNumber())
  );
  const [spinning, setSpinning] = useState(false);

  const spinNumbers = () => {
    setSpinning(true);

    // Simulating the spinning effect by updating numbers after a delay
    setTimeout(() => {
      const newNumbers = Array.from({ length: 6 }, () => getRandomNumber());
      setLuckyNumbers(newNumbers);
      setSpinning(false);
    }, 2000); // Adjust the delay as needed
  };

  return (
    <div className={styles.mainDiv} >
      <h2>Lucky Draw Numbers</h2>
      <div className={styles.congratsDiv}>
        <img src={img} className={styles.congratsImg} alt="" />
      </div>
      <button onClick={spinNumbers} disabled={spinning}>
        Spin
      </button>
      <div className={styles.numberDivsContainer}>
      <div className={styles.numberContainer}>
        {luckyNumbers.map((number, index) => (
          <div key={index} className={`${styles.number} ${spinning ? styles.spin : ''}`}>
            {number}
          </div>
        ))}
      </div>    
      </div>
    </div>
  );
};
export default Home;
