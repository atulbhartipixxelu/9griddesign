import React from "react";
import styles from "./contact.module.css";

const MapSection = () => {
  return (
    <section className={styles.teamSection}>

<div className={styles.mapWrapper}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.6534016523215!2d88.39470657587239!3d22.59206298225554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02760b99fd1cd3%3A0x663195711f613e87!2sAA%20Block%2C%20Sector%201%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1765195842600!5m2!1sen!2sin"
    width="100%"
    height="550"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="9Grid Location"
    className={styles.darkIframe}
  ></iframe>
</div>
      <div className={styles.joinBox}>
        <h2>JOIN OUR TEAM</h2>
        <p>
          Interested in working with us? Send your resume to{" "}
          <a href="mailto:info@9griddesign.com">
            info@9griddesign.com
          </a>
        </p>
      </div>

    </section>
  );
};

export default MapSection;
