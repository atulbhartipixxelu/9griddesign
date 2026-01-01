import React from "react";
import styles from "./contact.module.css";
import OfficeImage from "@assets/images/office.jpg"; // replace with your actual image path

const InfoDetail = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.wrapper}>

          {/* Left Image Section */}
          <div className={styles.imageBox}>
            <img src={OfficeImage} alt="Office" />
          </div>

          {/* Right Content Section */}
          <div className={styles.contentBox}>
            <h2>CONTACT US</h2>

            <div className={styles.infoBlock}>
              <h4>ADDRESS</h4>
              <p>
                AA Block, Sector I, Bidhannagar, <br></br>Kolkata, West Bengal  PIN-700064
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h4>PHONE</h4>
              <p>+91 9007779889</p>
            </div>

            <div className={styles.infoBlock}>
              <h4>EMAIL</h4>
              <a href="mailto:info@9griddesign.com">
                info@9griddesign.com
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoDetail;
