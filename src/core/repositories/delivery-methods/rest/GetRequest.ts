import {restRequest, RestRequestParams} from "@/core/repositories/delivery-methods/rest/RestDelivery";

export const restGetRequest = (url: string, options?: RestRequestParams) => {
    return restRequest(url, 'GET', options);
};