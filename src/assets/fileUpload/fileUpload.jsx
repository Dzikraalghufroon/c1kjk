import React, { useState, useEffect, useRef } from "react";
import Styles from "./fileUpload.module.css";
import styles from "./ok.module.css";
import ImageUpload from "./image/upload-image-icon.png";
import ikon from './assets/bold.png';
import ikon1 from './assets/underline-icon.png';
import ikon2 from './assets/italic.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const File_upload = () => {
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);  // Store image file
    const [title, setTitle] = useState('');  // Set default to empty string
    const [genre, setGenre] = useState('');  // Set default to empty string
    const [soal, setSoal] = useState('');  // Set default to empty string for description
    const textInputRef = useRef(null);
    const commandRefs = useRef({
        bold: null,
        italic: null,
        underline: null,
        insertUnorderedList: null,
        insertOrderedList: null,
        formatBlock: null
    });
    const navigate = useNavigate();

    const toggleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        updateActiveButtons();
    };

    const updateActiveButtons = () => {
        const commands = ['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList', 'formatBlock'];
        commands.forEach(command => {
            const button = commandRefs.current[command];
            if (button) {
                const isActive = document.queryCommandState(command);
                if (isActive) {
                    button.classList.add(styles.active);
                } else {
                    button.classList.remove(styles.active);
                }
            }
        });

        const quoteButton = commandRefs.current['formatBlock'];
        if (quoteButton && document.queryCommandValue('formatBlock') === 'blockquote') {
            quoteButton.classList.add(styles.active);
        } else if (quoteButton) {
            quoteButton.classList.remove(styles.active);
        }
    };

    const previewImage = event => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);  // Store image file
            const reader = new FileReader();
            reader.onload = e => {
                setPreviewImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const input = textInputRef.current;
        if (input) {
            input.addEventListener('input', updateActiveButtons);
            input.addEventListener('keyup', updateActiveButtons);
            input.addEventListener('mouseup', updateActiveButtons);
        }

        return () => {
            if (input) {
                input.removeEventListener('input', updateActiveButtons);
                input.removeEventListener('keyup', updateActiveButtons);
                input.removeEventListener('mouseup', updateActiveButtons);
            }
        };
    }, []);

    const renderEditor = (ref, setFunction, placeholder) => (
        <div>
            <div
                className={styles.content}
                ref={ref}
                contentEditable
                onInput={(e) => setFunction(e.target.innerHTML)} 
                placeholder={placeholder}
                suppressContentEditableWarning={true} // Avoid warnings about contentEditable
            ></div>
            <div className={styles.controls}>
                <button type="button" ref={el => commandRefs.current.bold = el} onClick={() => toggleFormat('bold')}>
                    <img className={styles.ikon} src={ikon} alt="Bold" />
                </button>
                <button type="button" ref={el => commandRefs.current.italic = el} onClick={() => toggleFormat('italic')}>
                    <img className={styles.ikon} src={ikon2} alt="Italic" />
                </button>
                <button type="button" ref={el => commandRefs.current.underline = el} onClick={() => toggleFormat('underline')}>
                    <img className={styles.ikon1} src={ikon1} alt="Underline" />
                </button><br />
                <button type="button" ref={el => commandRefs.current.insertUnorderedList = el} onClick={() => toggleFormat('insertUnorderedList')}>
                    Bullet List
                </button>
                <button type="button" ref={el => commandRefs.current.insertOrderedList = el} onClick={() => toggleFormat('insertOrderedList')}>
                    Numbered List
                </button>
            </div>
        </div>
    );

    const handleSave = async () => {
        try {
            // Create a unique image name with timestamp
            const uniqueImageName = `${Date.now()}-${imageFile.name}`;

            // 1. Send the image file to the first endpoint
            const formData = new FormData();
            formData.append('image', imageFile, uniqueImageName);  // Add unique image name

            await axios.post(`${import.meta.env.VITE_SERVER}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // 2. Send other data to the second endpoint
            const data = {
                title: title,  // Use title state
                genre: genre,  // Use genre state
                description: soal,  // Use soal state
                imageName: uniqueImageName // Send unique image name
            };

            await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/post/book`, data, { withCredentials: true });
            navigate("/profile")
        } catch (error) {
            console.log(`${import.meta.env.VITE_SERVER}/api/dashboard/post/book`);
            console.error('Error saat mengirim data:', error);
        }
    };

    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.File_upload}>
                    {previewImageUrl && <div className={styles.previewImageContainer}><img src={previewImageUrl} alt="Preview" /></div>}
                    <label htmlFor="file-upload" className={Styles.File_upload_label}>
                        <span><img src={ImageUpload} alt="Upload" /></span>
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className={Styles.File_upload_input}
                        onChange={previewImage} />
                </div>
                <div className={Styles.file_info}>
                    <label htmlFor="judul-input" className={Styles.judul_label}>
                        <span>Judul :</span>
                    </label>
                    <input
                        type="text"
                        id="judul-input"
                        className={Styles.judul_input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="genre-input" className={Styles.genre_label}>
                        <span>Genre :</span>
                    </label>
                    <input
                        type="text"
                        id="genre-input"
                        className={Styles.genre_input}
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />

                    <label htmlFor="description-input" className={Styles.description_label}>
                        <span>Deskripsi :</span>
                    </label>
                    {renderEditor(textInputRef, setSoal, "Ketik teks di sini...")}

                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <button onClick={handleSave}>Simpan</button>
                </div>
            </div>
        </>
    );
};

export default File_upload;
