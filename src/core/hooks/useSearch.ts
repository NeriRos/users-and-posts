export const useSearch = <T>(
    items: T[],
    searchQuery: string,
    searchBy: (item: T) => string
) => {
    const search = (query: string) => {
        return items.filter((item) => {
            const itemText = searchBy(item).toLowerCase();
            return itemText.includes(query.toLowerCase());
        });
    };

    return search(searchQuery);
}