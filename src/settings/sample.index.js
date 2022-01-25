import axios from 'axios';

//
export const baseURL = 'https://cryptic-thicket-69508.herokuapp.com/api';

//
export const api = axios.create({ baseURL });