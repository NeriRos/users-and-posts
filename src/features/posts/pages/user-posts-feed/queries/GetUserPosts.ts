import axios from "axios";

export const getUserPosts = async (userId: number) => {
    const request = await axios.get(`/user/${userId}/posts`);

    return request.data;
}