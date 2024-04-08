import axios from "axios";

// Class for managing HTTP requests using Axios
class AxiosClient {
    // Base URL for API requests
    static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`

    // Constructor for creating an instance of AxiosClient
    constructor() {
        // Initialize Axios instance with base URL and default headers
        this.axiosInstance = axios.create({
            baseURL: AxiosClient.baseUrl,
            maxContentLength: Infinity,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: '' 
            }
        })
    }

    // Method to set custom headers for the Axios instance
    setHeaders(headers) {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers
        }
    }

    // Method for making GET requests
    async get(url, config) {
        const response = await this.axiosInstance.get(url, config)
        return response.data
    }

    // Method for making POST requests
    async post(url, payload, config) {
        const response = await this.axiosInstance.post(url, payload, config)
        return response.data
    }

    // Method for making PATCH/UPDATE requests
    async update(url, payload, config) {
        return await this.axiosInstance.patch(url, payload, config)
    }

    // Method for making DELETE requests
    async delete(url, config) {
        return await this.axiosInstance.delete(url, config);
    }
}

export default AxiosClient; 
