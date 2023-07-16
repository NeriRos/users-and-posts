import {Post} from "@/features/posts/models/Post";

export const PostFeedItem = ({post}: { post: Post }) => {
    return (
        <div className={"card"}>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{post.title}</h5>
                <p className={"card-text"}>{post.body}</p>
            </div>
        </div>
    )
}