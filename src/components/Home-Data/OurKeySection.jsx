import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const CounterSection = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // Counter function
  const useCounter = (to, duration = 2000, shouldStart) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return; // start only when visible

      let start = 0;
      let end = to;
      let speed = duration / end;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, speed);

      return () => clearInterval(timer);
    }, [to, duration, shouldStart]);

    return count;
  };

  // Observers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const count1 = useCounter(350, 2000, startCount);
  const count2 = useCounter(2800, 2000, startCount);
  const count3 = useCounter(25, 2000, startCount);

  return (
    <section className={styles.counterSection} ref={sectionRef}>
      <div className={styles.headingBox}>
        <h2>Our Key Highlights</h2>
        <p>Discover the achievements</p>
      </div>

      <div className={styles.counterWrapper}>

        <div className={styles.counterItem}>
          <h3>{count1}K+</h3>
          <p>Square feet of land surveyed</p>
        </div>

        <div className={styles.counterItem}>
          <h3>{count2}+</h3>
          <p>Construction plans developed</p>
        </div>

        <div className={styles.counterItem}>
          <h3>{count3}+ Years</h3>
          <p>Years leading the industry</p>
        </div>

      </div>
    </section>
  );
};

export default CounterSection;
