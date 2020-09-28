import axios from "axios";

const AxiosAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://secretrecipebw.herokuapp.com/",
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    });
};
export default AxiosAuth;