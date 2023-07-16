import React from "react";
import {useUsersTable} from "@/features/users/modules/UsersManagement/components/UsersTable/useUsersTable";
import {User} from "@/features/users/models/User";
import {UsersTableRow} from "@/features/users/modules/UsersManagement/components/UsersTable/UsersTableRow";

import Styles from './UsersTable.module.css';

export const UsersTable = () => {
    const {users} = useUsersTable();

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
            {users.map((user: User) => <UsersTableRow key={user.id} user={user}/>)}
            </tbody>
        </table>
    )
}