export type QueryParameters = { [key: string]: string | number }

export const formatUrl = (url: string, queryParameters?: QueryParameters) => {
    let formattedUrl = url;

    if (formattedUrl.startsWith('/')) {
        formattedUrl = process.env.NEXT_PUBLIC_API_URL + formattedUrl;
    } else if (!formattedUrl.startsWith('http')) {
        formattedUrl = process.env.NEXT_PUBLIC_API_URL + '/' + formattedUrl;
    }

    if (queryParameters) {
        const query = Object.keys(queryParameters)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParameters[k]));

        formattedUrl += '?' + query.join('&');
    }

    return formattedUrl;
}