import React from "react";
import {User} from "@/features/users/models/User";
import {AddressText} from "@/core/components/Address";
import {useUsersTable} from "@/features/users/pages/users-management/components/UsersTable/useUsersTable";
import Styles from './UsersTable.module.css';
export const UsersTableRow = ({user}: { user: User }) => {
    const {onUserSelected} = useUsersTable();

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className={Styles.addressColumn}><AddressText address={user.address}/></td>
            <td className={"actions"}>
                <button onClick={(e) => onUserSelected(user, e)}>Select</button>
            </td>
        </tr>
    )
}