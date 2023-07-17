import React from "react";

import Styles from './PostsFeed.module.css';
import {usePostsFeed} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/usePostsFeed";
import {PostFeedItem} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/PostFeedItem";
import {TEXTS} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/texts";
import {Post} from "@/features/posts/models/Post";
import clsx from "clsx";
import {PostsSearch} from "@/features/posts/pages/user-posts-feed/components/PostsSearch/PostsSearch";

export const PostsFeed = () => {
    const {posts, isLoading} = usePostsFeed();

    return (
        <div className={Styles.postsContainer}>
            {isLoading ? <span>{TEXTS.loadingText}</span> :
                <PostsSearch posts={posts}>
                    {(filteredPosts: Post[]) =>
                        filteredPosts.length === 0 ?
                            <span>{TEXTS.NOT_ITEMS_FOUND}</span> :
                            <div className={clsx([Styles.posts, 'grid'])}>
                                {filteredPosts.map((post: Post) => <PostFeedItem
                                    key={post.id}
                                    post={post}/>)}
                            </div>}
                </PostsSearch>
            }
        </div>
    )
}