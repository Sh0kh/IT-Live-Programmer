import axios from 'axios';
import { BASE_URL, $axios } from '.';


export const $api = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
});



