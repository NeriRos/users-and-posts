import {SORT_DIRECTION} from "@/features/users/pages/users-management/components/UsersTable/consts";

import Styles from './Sort.module.css';
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export const ColumnSort = (props: { sortKey: string, onChange: (direction: string, key: string) => void }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value, props.sortKey)
    }

    const name = `sort-${props.sortKey}`;

    return <div className={Styles.tableSorter}>
        <label>
            <FaChevronUp/>
            <input type="radio"
                   name={name}
                   value={SORT_DIRECTION.ASC}
                   onChange={onChange}/>
        </label>
        <label>
            <FaChevronDown/>
            <input type="radio"
                   name={name}
                   value={SORT_DIRECTION.DESC}
                   onChange={onChange}/>
        </label>
    </div>
}