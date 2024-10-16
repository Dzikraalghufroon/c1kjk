import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchFunction = () => {
    const navigate = useNavigate();
    const [listSesiSiswa, setListSesiSiswa] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);  // For loading state
    const [searchFound, setSearchFound] = useState(false);  // To track if the search result exists

    useEffect(() => {
        // Ambil query search dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("search");
        setQuery(searchQuery);

        const fetchListSearchQuery = async () => {
            if (searchQuery) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/search/konten/${searchQuery}`);
                    setListSesiSiswa(response.data);
                    setIsLoading(false); // Set loading state to false once data is fetched

                    // Check if search has results
                    if (response.data.stat === true && response.data.length > 0) {
                        setSearchFound(true);  // Mark search as found
                    } else {
                        setSearchFound(false);  // Mark search as not found
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setIsLoading(false); // Set loading state to false even if error occurs
                }
            } else {
                setIsLoading(false); // If no searchQuery provided
            }
        };

        fetchListSearchQuery();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;  // Display a loading state
    }

    return (
        <div>
            <h1>Hasil Pencarian untuk: {query}</h1>
            {searchFound ? (
                <ul>
                    {listSesiSiswa.map((sesi, index) => (
                        <li key={index}>{sesi.title}</li>
                    ))}
                </ul>
            ) : (
                <h2>Tidak ada hasil yang ditemukan</h2>
            )}
        </div>
    );
};

export default SearchFunction;
