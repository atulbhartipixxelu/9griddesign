import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectsFilter.module.css";

const Projects = () => {
  const [folders, setFolders] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(
    sessionStorage.getItem("activeProjectFilter") || "All"
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔹 GOOGLE DRIVE CONFIG
  const mainFolderId = "1se1WvZ297MXYbBHjl8qxIpvrRgJCv35b";
  const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";

  // 🔹 SLUG FUNCTION
  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, "-").trim();

  /* ===============================
     LOAD DP IMAGE FROM PROJECT FOLDER
     =============================== */
  const loadDpImage = async (folderId) => {
    try {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType!='application/vnd.google-apps.folder'&fields=files(id,name)&key=${apiKey}`;
      const res = await axios.get(url);

      // 🔥 FIND DP IMAGE
      const dpImage = res.data.files.find((file) =>
        file.name.toLowerCase().includes("dp")
      );

      if (!dpImage) return null;

      return {
        id: dpImage.id,
        img: `https://drive.google.com/thumbnail?id=${dpImage.id}&sz=w2000`,
      };
    } catch (error) {
      console.log("DP image error:", error);
      return null;
    }
  };

  /* ===============================
     LOAD ALL PROJECTS
     =============================== */
  const loadAllProjects = async (foldersList) => {
    try {
      const requests = foldersList.map(async (folder) => {
        const subUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}' in parents and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&key=${apiKey}`;
        const res = await axios.get(subUrl);

        const items = await Promise.all(
          res.data.files.map(async (projectFolder) => {
            const dp = await loadDpImage(projectFolder.id);
            if (!dp) return null;

            return {
              category: folder.name,
              title: projectFolder.name,
              img: dp.img,
              id: dp.id,
            };
          })
        );

        return items;
      });

      const data = (await Promise.all(requests)).flat().filter(Boolean);

      setAllProjects(data);
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log("Project load error:", error);
      setLoading(false);
    }
  };

  /* ===============================
     LOAD CATEGORIES (MAIN FOLDERS)
     =============================== */
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${mainFolderId}' in parents and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&key=${apiKey}`;
        const res = await axios.get(url);

        setFolders(res.data.files);
        loadAllProjects(res.data.files);
      } catch (error) {
        console.log("Folder fetch error:", error);
      }
    };

    fetchFolders();
  }, []);

  /* ===============================
     RESTORE FILTER AFTER BACK
     =============================== */
  useEffect(() => {
    if (!allProjects.length) return;

    const saved =
      sessionStorage.getItem("activeProjectFilter") || "All";

    setActive(saved);

    if (saved === "All") {
      setProjects(allProjects);
    } else {
      setProjects(
        allProjects.filter(
          (p) => p.category.toLowerCase() === saved.toLowerCase()
        )
      );
    }
  }, [allProjects]);

  /* ===============================
     FILTER CLICK
     =============================== */
  const handleFilter = (cat) => {
    setActive(cat);
    sessionStorage.setItem("activeProjectFilter", cat);

    if (cat === "All") {
      setProjects(allProjects);
    } else {
      setProjects(
        allProjects.filter(
          (p) => p.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  };

  return (
    <div className={styles.projectSection}>
      <div className="container">
        <h2 className={styles.heading}>PROJECTS</h2>
        <p className={styles.subtext}>
          Our portfolio showcases a diverse range of projects…
        </p>

        {/* FILTER BUTTONS */}
        <div className={styles.filterWrapper}>
          <button
            className={`${styles.filterBtn} ${
              active === "All" ? styles.active : ""
            }`}
            onClick={() => handleFilter("All")}
          >
            All
          </button>

          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`${styles.filterBtn} ${
                active === folder.name ? styles.active : ""
              }`}
              onClick={() => handleFilter(folder.name)}
            >
              {folder.name}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <p className={styles.loading}>Loading Projects...</p>
        )}

        {/* PROJECT GRID */}
        {!loading && (
          <div className={styles.grid}>
            {projects.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                onClick={() =>
                  navigate(`/projects/${slugify(item.title)}`)
                }
              >
                <div className={styles.imgWrapper}>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className={styles.image}
                  />
                </div>

                <div className={styles.overlay}>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
