import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./gallery.module.css";

const CollapsibleGallery = () => {
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleGallery = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "1_9SPrKHGpiD9pCKoPfG2fQhG6Y5byZOP";
        const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'%20in%20parents%20and%20mimeType%20contains%20'image/'&fields=files(id,name,webContentLink,thumbnailLink)&key=${apiKey}`;
        
        const response = await axios.get(url);

        const imageFiles = response.data.files.map((file) => ({
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
        }));

        setImages(imageFiles);
      } catch (err) {
        console.error("Failed to fetch images", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const centerIndex =
    images.length > 0 ? Math.floor(images.length / 2) : null;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.left}>
          <h2 className={styles.title}>Collapsible Gallery</h2>
          <p className={styles.desc}>
            Welcome to 9GRID DESIGN! Dive into a world of creativity and innovation where
            every piece tells a story. Our gallery is a vibrant showcase of our finest
            work—crafted with passion and precision to inspire and captivate.
            <br />
            Use the button to the right
          </p>
        </div>

        <button className={styles.toggleBtn} onClick={toggleGallery}>
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Gallery Section */}
      <div
        className={`${styles.galleryWrapper} ${
          expanded ? styles.show : ""
        }`}
      >
        {loading ? (
          <p className={styles.loading}>Loading images...</p>
        ) : (
          <div className={styles.gallery}>
            {images.map((img, index) => (
              <img
                key={img.id}
                src={img.url}
                alt="gallery"
                className={`${styles.img} ${
                  expanded && index === centerIndex
                    ? styles.centerExpanded
                    : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleGallery;
