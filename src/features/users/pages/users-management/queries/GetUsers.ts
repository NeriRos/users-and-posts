import axios from "axios";

export const getUsers = (count?: number, page?: number) => async () => {
    const parameters = `${count ? `count=${count}` : ''}${page ? `&page=${page}` : ''}`
    const request = await axios.get(`/users?${parameters}`);

    return request.data;
}