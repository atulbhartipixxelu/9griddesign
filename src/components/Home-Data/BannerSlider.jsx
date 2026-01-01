import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const folderId = "108rpcMnl7k7VEh7Fn9vDsWtE3Jjb0DQ3";
  const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name,mimeType)&key=${apiKey}`;

        const response = await axios.get(url);
        const driveImages = response.data.files;

        const formatted = driveImages.map((file) => ({
          // FULL SIZE IMAGE URL 🔥
          img: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
          title: file.name.replace(/\.[^/.]+$/, ""),
        }));

        setSlides(formatted);
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSlideChange = (swiper) => {
    document.querySelectorAll(".slide-title").forEach((e) =>
      e.classList.remove("active-title")
    );

    setTimeout(() => {
      document
        .querySelector(".swiper-slide-active .slide-title")
        ?.classList.add("active-title");
    }, 200);

    const currentNumber = swiper.realIndex + 1;
    const formatted = currentNumber < 10 ? `0${currentNumber}` : currentNumber;

    document.querySelector(".current-slide").innerText = formatted;
  };

  if (loading) return <p>Loading Slider...</p>;

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        autoplay={{ delay: 3000 }}
        speed={1200}
        pagination={{
          el: ".dot-pagination",
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        onInit={() => {
          setTimeout(() => {
            document
              .querySelector(".swiper-slide-active .slide-title")
              ?.classList.add("active-title");
            document.querySelector(".current-slide").innerText = "01";
          }, 300);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            ></div>

            <h2 className="slide-title">{slide.title}</h2>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="dot-pagination"></div>

      <div className="num-pagination">
        <span className="current-slide">01</span> /{" "}
        <span className="total-slides">
          {slides.length < 10 ? `0${slides.length}` : slides.length}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;
