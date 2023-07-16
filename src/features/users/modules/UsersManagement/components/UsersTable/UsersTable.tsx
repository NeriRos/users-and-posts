import {useQueryClient} from "@tanstack/react-query";

export const UsersTable = () => {
    const queryClient = useQueryClient()

    return (
        <div>
            <h1>Users Table</h1>
        </div>
    )
}