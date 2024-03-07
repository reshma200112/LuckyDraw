import { useState,useEffect } from "react";
import styles from "./Home.module.css";
import img from "../assets/congrat.png";
const Home = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;
  const [luckyNumbers, setLuckyNumbers] = useState(
    Array.from({ length: 6 }, () => getRandomNumber())
  );
  const [spinning, setSpinning] = useState(false);
  const [showPrizeMessage, setShowPrizeMessage] = useState(false);

  const spinNumbers = () => {
    setSpinning(true);

    const animationDuration = 300; // Adjust the animation duration as needed

    // Simulating the spinning effect by updating numbers rapidly
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const newNumbers = Array.from({ length: 6 }, () => getRandomNumber());
        setLuckyNumbers(newNumbers);
      }, i * animationDuration);
    }

    // Reset spinning and show prize message after the animation is complete
    setTimeout(() => {
      // setSpinning(false);
      setShowPrizeMessage(true);
    }, 10 * animationDuration);
  };

  useEffect(() => {
    let timeout;
    
    if (showPrizeMessage) {
      timeout = setTimeout(async() => {
        setShowPrizeMessage(false);
        setSpinning(false); // Set spinning to false after 2 seconds
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [showPrizeMessage]);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.congratsDiv}>
        <img src={img} className={styles.congratsImg} alt="" />
      </div>
      <div>
        <div className={styles.prizeDisplayDiv}>
        {showPrizeMessage && (
          <div className={styles.prizeMessage} onAnimationEnd={() => setShowPrizeMessage(false)}>
           <h1 className={styles.prizeText}> 1st Prize</h1>
          </div>
        )}
        </div>
      </div>
      <div className={styles.numberDivsContainer}>
        <div className={styles.numberContainer}>
          {luckyNumbers.map((number, index) => (
            <div key={index} className={styles.number}>
              <div className={styles.numberDiv}>
                <div className={styles.numberText}>{number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footerDiv}>
        <div
          className={`${styles.btnDiv} ${spinning ? styles.disabled : ""}`}
          onClick={!spinning ? spinNumbers : undefined}
        ></div>
      </div>
    </div>
  );
};
export default Home;
