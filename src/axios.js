import Axios from 'axios';

const instance = Axios.create({
    baseURL: "https://burger-builder-c440d.firebaseio.com/"
});

export default instance;
