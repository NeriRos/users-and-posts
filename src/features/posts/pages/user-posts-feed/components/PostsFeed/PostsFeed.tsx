import React from "react";

import Styles from './PostsFeed.module.css';
import {usePostsFeed} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/usePostsFeed";
import {PostFeedItem} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/PostFeedItem";
import {TEXTS} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/texts";
import {Post} from "@/features/posts/models/Post";
import clsx from "clsx";

export const PostsFeed = () => {
    const {posts, isLoading} = usePostsFeed();

    return (
        <div className={clsx([Styles.posts, 'grid'])}>
            {isLoading ? <span>{TEXTS.loadingText}</span> : posts.map((post: Post) => <PostFeedItem key={post.id}
                                                                                                    post={post}/>)}
        </div>
    )
}