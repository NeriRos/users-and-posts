import {SORT_DIRECTION} from "@/features/users/pages/users-management/components/UsersTable/consts";

import Styles from '../../../features/users/pages/users-management/components/UsersTable/UsersTable.module.css';
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export const Pagination = (props: { perPage: number, page: number, onChange: (page: number) => void }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(Number(e.target.value))
    }

    const name = `pagination`;

    return <div className={Styles.pagination}>
        <label>
            <input type="radio"
                   name={name}
                   value={SORT_DIRECTION.ASC}
                   onChange={onChange}/>
        </label>
        <label>
            <input type="radio"
                   name={name}
                   value={SORT_DIRECTION.DESC}
                   onChange={onChange}/>
        </label>
    </div>
}