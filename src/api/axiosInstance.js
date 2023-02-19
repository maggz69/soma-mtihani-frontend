/**
 * Pius Gumo
 * 
 * 24/01/2023
 * 
 * Create an axios instance that can be used by the API calls
 */

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export default axiosInstance