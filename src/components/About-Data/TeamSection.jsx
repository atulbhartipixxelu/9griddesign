import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./about.module.css";

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "1ag9JBbOKzhbq6h9VszjZiU17ugXXdaCP"; 
        const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id,name,webContentLink,thumbnailLink)&key=${apiKey}`;

        const response = await axios.get(url);
        const imageFiles = response.data.files;

        // ---- SORTING + NAME CLEANING LOGIC ----
        const teamData = imageFiles
          .map((file) => {
            const rawName = file.name.replace(/\.[^/.]+$/, ""); // remove extension

            // Check if name starts with number__ format
            const match = rawName.match(/^(\d+)__(.*)$/);

            return {
              img: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
              order: match ? parseInt(match[1]) : 9999, // sorting number
              name: match ? match[2] : rawName, // clean name for UI
            };
          })
          .sort((a, b) => a.order - b.order); // sort by numbering

        setTeam(teamData);
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading team...</p>;

  return (
    <section className={styles.team_area}>
      <h2 className={styles.team_title}>Meet Our Team</h2>

      <div className={styles.team_wrapper}>
        {team.map((member, index) => (
          <div key={index} className={styles.team_card}>
            <div className={styles.team_image}>
              <img src={member.img} alt={member.name} />
            </div>

            <p className={styles.team_name}>{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
