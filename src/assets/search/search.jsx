import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchFunction = async (e) => {
    const navigate = useNavigate();
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/search`, {
            input
        });

        if (response.data.stat === true) {
            
            navigate('/ok/bung');
        } else {
            // setMessage(response.data.message);
            // setSuccess(false);
            navigate("/gagal/bung")
        }
        
    } catch (error) {
        console.error("error", error)
    }
}
export default SearchFunction