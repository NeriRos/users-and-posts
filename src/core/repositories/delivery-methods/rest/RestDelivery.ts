import axios from 'axios';
import {ApiConnectionError} from "@/core/repositories/errors/ApiConnectionError";
import {DeliveryError} from "@/core/repositories/errors/DeliveryError";
import {formatUrl, QueryParameters} from "@/core/repositories/delivery-methods/rest/utils";

export type RestRequestOptions = {
    data?: any;
    urlParameters?: QueryParameters;
    headers?: any;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const restRequest = async (url: string, method: string, options?: RestRequestOptions) => {
    let body = null;
    let fetchResponse = null;

    try {
        fetchResponse = await axios.request({
            url: formatUrl(url, options?.urlParameters),
            method,
            ...options,
            data: options?.data,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
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