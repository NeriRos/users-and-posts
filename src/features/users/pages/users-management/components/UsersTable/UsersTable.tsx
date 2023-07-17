import React from "react";
import {useUsersTable} from "@/features/users/pages/users-management/components/UsersTable/useUsersTable";
import {User} from "@/features/users/models/User";
import {UsersTableRow} from "@/features/users/pages/users-management/components/UsersTable/components/UsersTableRow";

import Styles from './UsersTable.module.css';
import {TEXTS} from "@/features/users/pages/users-management/components/UsersTable/texts";
import {ColumnSort, Pagination, Table} from "@/core/components/Table";

export const UsersTable = () => {
    const {users, usersCount, isLoading, changeSortDirection, paginate} = useUsersTable();


    return (
        <Table isLoading={isLoading}
               className={Styles.table}
               pagination={<Pagination itemsCount={usersCount} onChange={paginate}/>}
               rows={users.map((user: User) => <UsersTableRow key={user.id} user={user}/>)}
               headers={[
                   {
                       content: <div className={"sortingHeader"}>
                           <span>{TEXTS.tableHeaders.name}</span>
                           <ColumnSort sortKey={"name"} onChange={changeSortDirection}/>
                       </div>
                   },
                   {
                       content: TEXTS.tableHeaders.email
                   },
                   {
                       props: {className: Styles.addressColumn},
                       content: TEXTS.tableHeaders.address
                   },
                   {
                       content: TEXTS.tableHeaders.actions
                   },
               ]}/>
    )
}