import axios from "axios";

export const getAllUsers = async () => {
    const request = await axios.get('/users');

    return request.data;
}