import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ProjectSingle.module.css";

const apiKey = "AIzaSyAAgFvKs3Vo5nuo_bkIY1ePkNqNsSmB33g";
const mainFolderId = "1se1WvZ297MXYbBHjl8qxIpvrRgJCv35b";

const ProjectSingle = () => {
  const { slug } = useParams();

  const [mainImage, setMainImage] = useState(null);
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [activeFolder, setActiveFolder] = useState("ALL");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageTitle = slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const realName = slug.split("-").join(" ").toLowerCase();

  /* STEP 1: FETCH CATEGORIES */
  const fetchCategories = async () => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${mainFolderId}' in parents and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&key=${apiKey}`;
    const res = await axios.get(url);
    return res.data.files;
  };

  /* STEP 2: FIND PROJECT FOLDER */
  const findProjectFolder = async (categories) => {
    for (let cat of categories) {
      const url = `https://www.googleapis.com/drive/v3/files?q='${cat.id}' in parents and mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&key=${apiKey}`;
      const res = await axios.get(url);

      const match = res.data.files.find(
        f => f.name.toLowerCase() === realName
      );

      if (match) return match.id;
    }
    return null;
  };

  /* STEP 3: LOAD PROJECT ROOT */
  const loadProjectRoot = async (folderId) => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id,name,mimeType)&key=${apiKey}`;
    const res = await axios.get(url);

    let subFolders = [];
    let directImages = [];

    res.data.files.forEach(file => {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        subFolders.push(file);
      } else if (file.name.toLowerCase().includes("mainimage")) {
        setMainImage({
          id: file.id,
          src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
        });
      } else if (file.mimeType.includes("image")) {
        directImages.push({
          id: file.id,
          src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
        });
      }
    });

    // CASE: SUBFOLDERS
    if (subFolders.length > 0) {
      setFolders(subFolders);
      let collectedImages = [];

      for (let folder of subFolders) {
        const imgs = await loadFolderImages(folder.id, false);
        collectedImages = [...collectedImages, ...imgs];
      }

      setAllImages(collectedImages);
      setImages(collectedImages);
      setActiveFolder("ALL");
      setLoading(false);
    }
    // CASE: DIRECT IMAGES
    else {
      setImages(directImages);
      setLoading(false);
    }
  };

  /* STEP 4: LOAD FOLDER IMAGES */
  const loadFolderImages = async (folderId, setState = true) => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id)&key=${apiKey}`;
    const res = await axios.get(url);

    const imgs = res.data.files.map(file => ({
      id: file.id,
      src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`,
    }));

    if (setState) setImages(imgs);
    return imgs;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const categories = await fetchCategories();
        const projectId = await findProjectFolder(categories);
        if (projectId) await loadProjectRoot(projectId);
        else setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    init();
  }, [slug]);

  return (
    <div className={styles.singlePage}>
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          {/* TOP SECTION */}
          <div className={styles.topSection}>
            <div className={styles.leftContent}>
              {/* <h1>{pageTitle}</h1>
              <p>
                Discover the elegance of {pageTitle}.  
                A blend of innovation and design excellence.
              </p> */}
            </div>

            {mainImage && (
              <div className={styles.mainImage}>
                <img src={mainImage.src} alt={pageTitle} />
              </div>
            )}
          </div>

          {/* FILTERS */}
          {folders.length > 0 && (
            <div className={styles.filterWrap}>
              <button
                className={activeFolder === "ALL" ? styles.active : ""}
                onClick={() => {
                  setActiveFolder("ALL");
                  setImages(allImages);
                }}
              >
                ALL
              </button>

              {folders.map(folder => (
                <button
                  key={folder.id}
                  className={activeFolder === folder.id ? styles.active : ""}
                  onClick={async () => {
                    setActiveFolder(folder.id);
                    await loadFolderImages(folder.id);
                  }}
                >
                  {folder.name.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* GALLERY */}
          <div className={styles.gallery}>
            {images.map(img => (
              <div key={img.id} className={styles.imgBox}>
                <img src={img.src} alt="" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectSingle;
