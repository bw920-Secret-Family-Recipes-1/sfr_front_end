import axios from "axios";

const AxiosAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://secretrecipebw.herokuapp.com/auth",
        headers: {
            Authorization: token
        }
    });
};
export default AxiosAuth;