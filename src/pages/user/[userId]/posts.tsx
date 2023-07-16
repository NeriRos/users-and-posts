import {UsersService} from "@/features/users/services/UsersService";
import {UsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {UserPostsFeed} from "@/features/posts/pages/user-posts-feed/components/UserPostsFeed";

export default function userPostsManagement(props: { user: User }) {
    return <UserPostsFeed user={props.user}/>;
}

export const getServerSideProps = async () => {
    const userService = UsersService({
        apiRepository: UsersApiRepository(),
        dbRepository: UsersDbRepository()
    });

    const user = await userService.getUser(1);

    if (!user) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user: user.toJson()
        }
    }
}