import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

import InstLogo from "@assets/images/instagram logo.png";

export default function InstagramGallery() {
  const [smallImages, setSmallImages] = useState([]);
  const [largeImages, setLargeImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const SMALL_FOLDER_ID = "15U74smREXienOIYL7C_K0BPbXsb80TbZ";
  const LARGE_FOLDER_ID = "1GWvkPQo0Ym1W4C5UKKrXvRRO-PiUWBWC";
  const API_KEY = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

  // Fetch images from Google Drive folder
  const fetchFromDrive = async (folderId) => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name)&key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.files.map((file) => ({
      img: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
      name: file.name,
    }));
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const small = await fetchFromDrive(SMALL_FOLDER_ID);
        const large = await fetchFromDrive(LARGE_FOLDER_ID);

        setSmallImages(small);
        setLargeImages(large);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading Gallery...</p>;

  // Combine small and large images into 15-image grid
  const finalGrid = [
    largeImages[0],         // First row: left column (40%)
    smallImages[0],         // First row: right column (nested 4 images)
    smallImages[1],
    smallImages[2],
    smallImages[3],

    smallImages[4],         // Second row: left column (nested 4 images)
    smallImages[5],
    smallImages[6],
    smallImages[7],
    largeImages[1],         // Second row: right column (40%)

    smallImages[8],         // Third row: first column (nested 2 images)
    smallImages[9],
    largeImages[2],         // Third row: second column (40%)
    smallImages[10],        // Third row: third column (nested 2 images)
    smallImages[11],
    smallImages[12],
  ].filter(Boolean); // Remove undefined images

  // Popup handlers
  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  const closePopup = () => setIsOpen(false);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % finalGrid.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + finalGrid.length) % finalGrid.length);

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.heading_inst}>
          <img src={InstLogo} alt="Instagram" />
          <h2>Instagram Gallery</h2>
        </div>

        <div className={styles.grid}>
          {/* First Row */}
          <div className={styles.row}>
            {finalGrid[0] && (
              <div className={styles.col40} onClick={() => openPopup(0)}>
                <img className={styles.imginstgallfix} src={finalGrid[0].img} alt="" />
              </div>
            )}
            <div className={styles.col60}>
              <div className={styles.nestedGrid}>
                {finalGrid.slice(1, 5).map((img, i) =>
                  img ? (
                    <div key={i} className={styles.nestedItem} onClick={() => openPopup(i + 1)}>
                      <img src={img.img} alt="" />
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className={styles.row}>
            <div className={styles.col60}>
              <div className={styles.nestedGrid}>
                {finalGrid.slice(5, 9).map((img, i) =>
                  img ? (
                    <div key={i} className={styles.nestedItem} onClick={() => openPopup(i + 5)}>
                      <img src={img.img} alt="" />
                    </div>
                  ) : null
                )}
              </div>
            </div>
            {finalGrid[9] && (
              <div className={styles.col40} onClick={() => openPopup(9)}>
                <img src={finalGrid[9].img} alt="" />
              </div>
            )}
          </div>

          {/* Third Row */}
          <div className={styles.row}>
            <div className={styles.col30}>
              <div className={styles.yoyo}>
                {finalGrid.slice(10, 12).map((img, i) =>
                  img ? (
                    <div key={i} className={styles.newitem} onClick={() => openPopup(i + 10)}>
                      <img src={img.img} alt="" />
                    </div>
                  ) : null
                )}
              </div>
            </div>
            {finalGrid[12] && (
              <div className={styles.col40r} onClick={() => openPopup(12)}>
                <img src={finalGrid[12].img} alt="" />
              </div>
            )}
            <div className={styles.col30}>
              <div className={styles.yoyo}>
                {finalGrid.slice(13, 15).map((img, i) =>
                  img ? (
                    <div key={i} className={styles.newitem} onClick={() => openPopup(i + 13)}>
                      <img src={img.img} alt="" />
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isOpen && finalGrid[currentIndex] && (
        <div className={styles.popupOverlay}>
          <span className={styles.closeBtn} onClick={closePopup}>
            &times;
          </span>
          <button className={styles.prevBtn} onClick={prevSlide}>
            ❮
          </button>
          <img src={finalGrid[currentIndex].img} alt="popup" className={styles.popupImage} />
          <button className={styles.nextBtn} onClick={nextSlide}>
            ❯
          </button>
        </div>
      )}
    </>
  );
}
