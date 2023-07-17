import React from "react";
import {useUsersTable} from "@/features/users/pages/users-management/components/UsersTable/useUsersTable";
import {User} from "@/features/users/models/User";
import {UsersTableRow} from "@/features/users/pages/users-management/components/UsersTable/components/UsersTableRow";

import Styles from './UsersTable.module.css';
import {TEXTS} from "@/features/users/pages/users-management/components/UsersTable/texts";
import {ColumnSort} from "@/core/components/Table/ColumnSort";

export const UsersTable = () => {
    const {users, isLoading, changeSortDirection} = useUsersTable();

    return (
        <div className={Styles.tableContainer}>
            <table className={Styles.table}>
                <thead>
                <tr>
                    <th>
                        <div className={Styles.sortingHeader}>
                            <span>{TEXTS.tableHeaders.name}</span>
                            <ColumnSort sortKey={"name"} onChange={changeSortDirection}/>
                        </div>
                    </th>
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
        </div>
    )
}