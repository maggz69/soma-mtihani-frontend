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

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const urlParms = {
            redirect_uri: window.location.href,
            message: "You are not logged in. Please login to continue"
        }
        if (error.response.status === 401) {
            window.location.href = '/#/login?' + new URLSearchParams(urlParms)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance