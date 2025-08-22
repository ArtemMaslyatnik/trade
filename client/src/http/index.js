import axios from 'axios';
// import {store} from "../index";


export const API_URL = `http://localhost:8000/api/v1/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default $api;
