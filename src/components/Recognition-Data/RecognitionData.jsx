import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./recognition.module.css";

const Recognition = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "183V-3x_oTsPEGAVDtbYt3tuzSK3xsLkJ";
        const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

        // FIXED: Added thumbnailLink in fields
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name,thumbnailLink)&key=${apiKey}`;

        const response = await axios.get(url);

        const driveData = response.data.files.map((file) => ({
          img: file.thumbnailLink, // ✔ REAL working link
          category: "Recognition",
          title: file.name.replace(/\.[^/.]+$/, ""),
          date: "MARCH 6TH, 2016",
        }));

        setItems(driveData);
      } catch (error) {
        console.error("Failed to fetch images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>RECOGNITION AND TESTIMONIALS</h2>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.img} alt={item.title} className={styles.image} />
            {/* <p className={styles.category}>{item.category}</p> */}
            <h3 className={styles.title}>{item.title}</h3>
            {/* <p className={styles.date}>{item.date}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recognition;
