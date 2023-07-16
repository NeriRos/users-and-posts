import {Post} from "@/features/posts/models/Post";
import {Card} from "@/core/components/Card";
import {DeleteIcon} from "@/core/components/Icons/DeleteIcon";
import {usePostsFeed} from "@/features/posts/pages/user-posts-feed/components/PostsFeed/usePostsFeed";

export const PostFeedItem = ({post}: { post: Post }) => {
    const {deletePost} = usePostsFeed();

    const cardActions = [<DeleteIcon key={"delete"} onClick={() => deletePost(post.id)}/>];

    return (
        <Card title={post.title} description={post.body} actions={cardActions}/>
    )
}