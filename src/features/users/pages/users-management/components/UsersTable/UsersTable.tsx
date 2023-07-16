import React from "react";
import {useUsersTable} from "@/features/users/pages/users-management/components/UsersTable/useUsersTable";
import {User} from "@/features/users/models/User";
import {UsersTableRow} from "@/features/users/pages/users-management/components/UsersTable/UsersTableRow";

import Styles from './UsersTable.module.css';
import {TEXTS} from "@/features/users/pages/users-management/components/UsersTable/texts";

export const UsersTable = () => {
    const {users, isLoading} = useUsersTable();

    return (
        <table className={Styles.table}>
            <thead>
            <tr>
                <th>{TEXTS.tableHeaders.name}</th>
                <th>{TEXTS.tableHeaders.email}</th>
                <th className={Styles.addressColumn}>{TEXTS.tableHeaders.address}</th>
                <th>{TEXTS.tableHeaders.actions}</th>
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