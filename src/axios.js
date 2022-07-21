import axios from 'axios';

export const axiosApi = axios.create({
    baseURL: 'https://opentdb.com/',
    headers: {
        'Content-type': 'application/json',
    }
})

// Global Loading shared in all http requests
// let loading = null;

axiosApi.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error);
})

axiosApi.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(error);
})

export const useAxios = () => ({ axios: axiosApi })
