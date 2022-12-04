//api Config
import axios from "axios";

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASEURL, // Get REACT_APP_BASEURL from env here ...
    // baseURL: "http://localhost:5000/api/v1/",
});

    export const setAuthToken = (token) => {
        if (token) {
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete API.defaults.headers.common["Authorization"];
        }
    };