import axios from 'axios';

export default axios.create({
    //baseURL: 'https://gesco-app.com/api'
    baseURL: 'http://localhost:8000/api'
});