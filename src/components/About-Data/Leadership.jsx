import React from "react";
import styles from "./about.module.css";

import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Leadership = () => {
  return (
    <section className={styles.leadershipSection}>
      <h2 className={styles.sectionTitle}>Our Leadership</h2>

      <div className={styles.card}>
        {/* Left Image */}
        <div className={styles.imageBox}>
          <div className={styles.placeholder}>CEO No Image</div>
        </div>

        {/* Right Content */}
        <div className={styles.contentBox}>
          <h3 className={styles.name}>Srirup Goswami</h3>
          <p className={styles.designation}>CEO & Architect</p>

          <p className={styles.description}>
            At 9GRID-DESIGNS, we believe in enhancing personal experiences
            through architecture and design. Our commitment to quality and open
            communication sets us apart, and we strive to create spaces that
            inspire and delight.
          </p>

          <div className={styles.socialIcons}>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
