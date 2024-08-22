
import axios from "axios";

export const request = axios.create({
    baseURL: "https://dev-retail.jiddiy.uz/services/retail-admin/api/",
    timeout: 100000,
});

const errorHandler = (error, hooks) => {
    return Promise.reject(error.response);
}

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

request.interceptors.response.use(response => response.data, errorHandler);

export default request;
