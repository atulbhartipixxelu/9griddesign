import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "1OQoaDl9kb7VEAYF1m4HHkble-j_FWJs7";
        const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name)&key=${apiKey}`;

        const res = await axios.get(url);

        const imgs = res.data.files.map((file) => ({
          id: file.id,
          name: file.name,
          url: `https://lh3.googleusercontent.com/d/${file.id}=w2000`,
        }));

        setImages(imgs);
      } catch (err) {
        console.error("Drive fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Masonry */}
      <div className={styles.masonry}>
        {images.map((img, index) => (
          <div
            key={img.id}
            className={styles.item}
            onClick={() => {
              setCurrentIndex(index);
              setIsOpen(true);
            }}
          >
            <img src={img.url} alt={img.name} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Popup */}
      {isOpen && (
        <div className={styles.popup}>
          <span className={styles.close} onClick={() => setIsOpen(false)}>
            ×
          </span>

          <button
            className={styles.prev}
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + images.length) % images.length
              )
            }
          >
            ❮
          </button>

          <img src={images[currentIndex].url} className={styles.popupImg} />

          <button
            className={styles.next}
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % images.length)
            }
          >
            ❯
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
