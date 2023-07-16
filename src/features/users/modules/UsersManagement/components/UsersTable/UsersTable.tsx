import React from "react";
import {useUsersTable} from "@/features/users/modules/UsersManagement/components/UsersTable/useUsersTable";
import {User} from "@/features/users/models/User";
import {UsersTableRow} from "@/features/users/modules/UsersManagement/components/UsersTable/UsersTableRow";

import Styles from './UsersTable.module.css';
import {TEXTS} from "@/features/users/modules/UsersManagement/components/UsersTable/texts";

export const UsersTable = () => {
    const {users, isLoading} = useUsersTable();

    return (
        <table className={Styles.table}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {isLoading ? <tr>
                <td colSpan={4}>{TEXTS.loadingText}</td>
            </tr> : users.map((user: User) => <UsersTableRow key={user.id} user={user}/>)}
            </tbody>
        </table>
    )
}