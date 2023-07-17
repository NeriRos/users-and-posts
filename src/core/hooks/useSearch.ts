import {useMemo} from "react";

export const useSearch = <T>(
    items: T[],
    searchQuery: string,
    searchBy: (item: T) => string
) => {
    return useMemo(() => items.filter((item) => {
        if (searchQuery === "") return true;
        const itemText = searchBy(item).toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    }), [items, searchBy, searchQuery]);
}