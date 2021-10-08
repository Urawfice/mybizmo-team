import axios from 'axios';

const instance = axios.create({
    baseURL:'https://biz1.wellnessstg.mybizmo.com'
});

export default instance;