import axios from 'axios';
import {ApiConnectionError} from "@/core/repositories/errors/ApiConnectionError";
import {DeliveryError} from "@/core/repositories/errors/DeliveryError";
import {formatUrl} from "@/core/repositories/delivery-methods/rest/utils";

export type RestRequestParams = {
    data?: any;
    headers?: any;
}

export const restRequest = async (url: string, method: string, params?: RestRequestParams) => {
    let body = null;
    let fetchResponse = null;

    try {
        fetchResponse = await axios.request({
            url: formatUrl(url),
            method,
            ...params,
            data: params?.data,
            headers: {
                'Content-Type': 'application/json',
                ...params?.headers
            }
        });
    } catch (error) {
        throw new ApiConnectionError(`API request failed connect to ${url}`);
    }

    if (fetchResponse.status !== 200) {
        throw new DeliveryError(fetchResponse.statusText, fetchResponse.status, body);
    }

    return fetchResponse.data;
};