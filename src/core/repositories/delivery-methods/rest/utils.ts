type QueryParams = { [key: string]: string | number }

export const formatUrl = (url: string, queryParams?: QueryParams) => {
    let formattedUrl = url;

    if (formattedUrl.startsWith('/')) {
        formattedUrl = process.env.NEXT_PUBLIC_API_URL + formattedUrl;
    } else if (!formattedUrl.startsWith('http')) {
        formattedUrl = process.env.NEXT_PUBLIC_API_URL + '/' + formattedUrl;
    }

    if (queryParams) {
        const query = Object.keys(queryParams)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]));

        formattedUrl += '?' + query.join('&');
    }

    return formattedUrl;
}