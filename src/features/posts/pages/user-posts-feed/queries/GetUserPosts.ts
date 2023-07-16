import axios from "axios";

export const getUserPosts = async (userId: number | string) => {
    const request = await axios.get(`/users/${userId}/posts`);

    return request.data;
}