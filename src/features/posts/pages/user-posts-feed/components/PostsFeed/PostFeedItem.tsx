import {Post} from "@/features/posts/models/Post";

export const PostFeedItem = ({post}: { post: Post }) => {
    return (
        <div className={"card"}>
            <div className={"card-body"}>
                <h2 className={"card-title"}>{post.title}</h2>
                <p className={"card-text"}>{post.body}</p>
            </div>
        </div>
    )
}