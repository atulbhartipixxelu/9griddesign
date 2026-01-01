import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>

        <div className={styles.footerGrid}>

          {/* LEFT BLOCK */}
          <div className={styles.col}>
            <h2 className={styles.title}>9GRID DESIGN | ARCHITECTS.</h2>
            <p className={styles.desc}>
              We create cutting-edge design solutions that blend creativity and functionality. Our passion for architecture and aesthetics drives innovation in every project.
            </p>

            <div className={styles.contact}>
              <p>Contact Us:</p>
              <a href="mailto:info@9griddesign.com">info@9griddesign.com</a>
              <a href="mailto:info.9griddesign@gmail.com">info.9griddesign@gmail.com</a>
              <span>Phone: +91 9007779889</span>
            </div>
          </div>

          {/* CENTER BLOCK */}
          <div className={styles.col}>
            <h2 className={styles.title}>QUICK LINKS</h2>
            <ul className={styles.links}>
              <li><a href="#">Know about Us</a></li>
              <li><a href="#">Home</a></li>
              <li><a href="#">Where you can find Us</a></li>
              <li><a href="#">Our Projects</a></li>
              <li><a href="#">Hall of Fame</a></li>
              <li><a href="#">Recognition</a></li>
            </ul>
          </div>

          {/* RIGHT BLOCK */}
          <div className={styles.col}>
            <h2 className={styles.title}>GET IN TOUCH</h2>
            <p>Have a question or project in mind? Drop us a message or email—we'd love to connect!</p>

            <a href="https://mail.google.com/mail/u/0/?fs=1&to=info@9griddesign.com&su=Inquiry+from+your+Website%7D&tf=cm" target="_blank" className={styles.btn}>REACH US</a>
          </div>
        </div>

        {/* COPYRIGHT LINE */}
        <div className={styles.bottom}>
          © 2013 9GRID DESIGN | TERMS OF SERVICE | PRIVACY POLICY
        </div>

      </div>
    </footer>
  );
}
