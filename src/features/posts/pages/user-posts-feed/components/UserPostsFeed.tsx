import {PostsFeed} from "@/features/posts/pages/user-posts-feed/components/PostsFeed";
import {User} from "@/features/users/models/User";

export const UserPostsFeed = (props: { user: User }) => {
    return (
        <>
            <h1>{props.user.name}&quot;s Posts</h1>
            <PostsFeed/>
        </>
    )
}