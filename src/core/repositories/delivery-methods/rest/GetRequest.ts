import {restRequest, RestRequestOptions} from "@/core/repositories/delivery-methods/rest/RestDelivery";

export const restGetRequest = (url: string, options?: RestRequestOptions) => {
    return restRequest(url, 'GET', options);
};