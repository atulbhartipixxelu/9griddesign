import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./index.module.css";

export default function AboutSection() {
  const [showHeading, setShowHeading] = useState(false);
  const [exitHeading, setExitHeading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const sectionRef = useRef(null);
  const triggered = useRef(false);

  // Google Drive
  const folderId = "1AGs5D1Kh2fAMakNwbXijktGE5HkiHvLj";
  const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

  // Fetch Image
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id)&key=${apiKey}`
      )
      .then((res) => {
        if (res.data.files.length > 0) {
          setImageUrl(
            `https://drive.google.com/thumbnail?id=${res.data.files[0].id}&sz=w2000`
          );
        }
      });
  }, []);

  // 🔥 STRICT ON-SCROLL TRIGGER
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || triggered.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      // ⛔ Jab tak section viewport me enter na kare
      if (rect.top <= window.innerHeight * 0.5) {
        triggered.current = true;

        // 1️⃣ Show heading
        setShowHeading(true);

        // 2️⃣ Hold for 3 sec
        setTimeout(() => {
          setExitHeading(true);
        }, 3000);

        // 3️⃣ Exit heading → show content
        setTimeout(() => {
          setShowHeading(false);
          setShowContent(true);
        }, 3800);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className="container">

        {/* CENTERED HEADING */}
        {showHeading && (
          <h2
            className={`${styles.heading} ${
              exitHeading ? styles.exit : styles.enter
            }`}
          >
            Innovating Spaces, Defining Skylines
          </h2>
        )}

        {/* CONTENT */}
        {showContent && (
          <div className={styles.inner}>
            <div className={styles.imageWrap}>
              <img src={imageUrl} alt="About" />
            </div>

            <div className={styles.content}>
              <p>
                9GRID DESIGN creates inspiring commercial and residential spaces.
                We offer innovative, custom, and economic architectural solutions
                that elevate how people experience the built environment.
              </p>

              <a href="/about-us" className={styles.btn}>
                MORE ABOUT US
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
