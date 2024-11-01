import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Styles from "./search.module.css"

const SearchFunction = () => {
    const navigate = useNavigate();
    const [listSesiSiswa, setListSesiSiswa] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);  // For loading state
    const [searchFound, setSearchFound] = useState(false);  // To track if the search result exists
    const { Searchquery } = useParams()

    useEffect(() => {
        // Ambil query search dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("search");

        // setQuery(searchQuery);
        setQuery(Searchquery)

        const fetchListSearchQuery = async () => {
            if (Searchquery) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/search/konten/${Searchquery}`, { withCredentials: true });
                    setListSesiSiswa(response.data.result);
                    setIsLoading(false);
                    if (response.data.stat === false && response.data.result === 0) {
                        setSearchFound(false);
                    } else {
                        setSearchFound(true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchListSearchQuery();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;  // Display a loading state
    }

    return (
        <div>

            {searchFound ? (
                <div className={Styles.container}>
                        {/* <br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /> */}
                    {listSesiSiswa.map((sesi, index) => (
                        <>
                        <ul className={Styles.ul}>
                            <img
                                src={`${import.meta.env.VITE_SERVER}/get-img/${sesi.route_image}`}
                                alt={sesi.route_image}
                                className={Styles.image}
                            />
                            <li><h4 className={Styles.title}>Judul: {sesi.title}</h4></li>
                            <li><h4 className={Styles.genre}>Genre: {sesi.genre}</h4></li>
                        </ul>
                        </>
                    ))}
                </div>
            ) : (
                <>
                    <h1>Hasil Pencarian untuk: {query}</h1>
                    <h2>Tidak ada hasil yang ditemukan</h2>
                </>
            )}
        </div>
    );
};

export default SearchFunction;
