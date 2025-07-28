import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.gesco-app.com/api'
    //baseURL: 'http://localhost:8000/api'
});