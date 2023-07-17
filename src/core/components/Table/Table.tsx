import React, {ReactNode} from "react";
import Styles from './Table.module.css';
import {TEXTS} from "@/features/users/pages/users-management/components/UsersTable/texts";
import clsx from "clsx";

export type TableProps = {
    className?: string,
    rows: ReactNode[],
    isLoading?: boolean,
    headers: { props?: any, content: ReactNode }[],
}

export const Table = (props: TableProps) => {
    const columnsCount = props.headers.length;

    return (
        <div className={Styles.tableContainer}>
            <table className={clsx([Styles.table, props.className])}>
                <thead>
                <tr>
                    {props.headers.map((header, index) =>
                        <th key={index} {...header.props}>
                            {header.content}
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {!props.isLoading ? props.rows :
                    <tr>
                        <td colSpan={columnsCount}>{TEXTS.loadingText}</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}