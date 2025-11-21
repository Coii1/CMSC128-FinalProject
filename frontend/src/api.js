// axios interceptor 
// api.js for authorization token to be automatically added
import axios from "axios"
import { ACCESS_TOKEN } from "./contants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL   // import anything specified in the environment variable file

})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`    // Authorization header
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api