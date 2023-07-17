import {useSearch} from "@/core/hooks/useSearch";
import {useEffect, useRef, useState} from "react";
import {Post} from "@/features/posts/models/Post";

import Styles from './PostsSearch.module.css';
import {TEXTS} from "@/features/posts/pages/user-posts-feed/components/PostsSearch/texts";

export const PostsSearch = (props: {
    posts: Post[],
    children: (posts: Post[]) => React.ReactNode | React.ReactNode[],
    onPostsFilter?: (posts: Post[]) => void,
}) => {
    const [searchText, setSearchText] = useState<string>('');
    const filteredPosts = useSearch<Post>(props.posts, searchText, (post: Post) => {
        return [post.title, post.body].join(' ')
    });
    const filteredPostsCount = useRef<number>(props.posts.length);

    useEffect(() => {
        if (filteredPosts.length !== filteredPostsCount.current) {
            props.onPostsFilter?.(filteredPosts);
            filteredPostsCount.current = filteredPosts.length;
        }
    }, [filteredPosts, props]);

    return <>
        <input placeholder={TEXTS.SEARCH_PLACEHOLDER} className={Styles.searchInput} type="text" value={searchText}
               onChange={(e) => setSearchText(e.target.value)}/>
        {props.children(filteredPosts)}
    </>
}