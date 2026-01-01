import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./about.module.css";

const ClientSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "1NzNGcIU0rxZOUqycCnDeWt5dyg2ljieU";
        const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name)&key=${apiKey}`;

        const response = await axios.get(url);

        const sortedClients = response.data.files
          .map((file) => {
            const name = file.name.replace(/\.[^/.]+$/, "");
            const match = name.match(/^(\d+)__/);

            return {
              img: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
              order: match ? parseInt(match[1]) : 9999,
            };
          })
          .sort((a, b) => a.order - b.order);

        setClients(sortedClients);
      } catch (err) {
        console.error("Image load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p className={styles.loading}>Loading clients...</p>;

  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.clientsTitle}>Our Clients</h2>

      <div className={styles.clientsGrid}>
        {clients.map((item, index) => (
          <div key={index} className={styles.clientItem}>
            <img src={item.img} alt="Client Logo" className={styles.clientLogo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientSection;
