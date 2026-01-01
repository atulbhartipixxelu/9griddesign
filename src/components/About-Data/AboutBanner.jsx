import React, { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          let increment = end / (duration / 10);

          let timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(Math.ceil(start));
            }
          }, 10);

          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        <h2 className={styles.heading}>About Us</h2>

        <p className={styles.description}>
          We develop commercial spaces for better business and create residential 
          spaces for good living. 9GRID DESIGN is known for its unique approach to 
          architecture and interior design...
        </p>

        {/* <div className={styles.statsRow}>
          
          <div className={styles.statBox}>
            <h3 className={styles.number}>
              <Counter end={15} duration={1200} />
            </h3>
            <span className={styles.label}>YEARS IN BUSINESS</span>
          </div>

          <div className={styles.statBox}>
            <h3 className={styles.number}>
              <Counter end={250} duration={1500} />+
            </h3>
            <span className={styles.label}>PROJECTS COMPLETED</span>
          </div>

          <div className={styles.statBox}>
            <h3 className={styles.number}>
              <Counter end={42} duration={1200} />
            </h3>
            <span className={styles.label}>AWARDS WON</span>
          </div>

          <div className={styles.statBox}>
            <h3 className={styles.number}>
              <Counter end={28} duration={1200} />
            </h3>
            <span className={styles.label}>COUNTRIES SERVED</span>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default AboutUs;
