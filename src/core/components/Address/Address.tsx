import {Address} from "@/features/users/models/User";
import Styles from './Address.module.css';

export const AddressText = ({address}: { address: Address }) => {
    const addressText = `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;

    return <span className={Styles.address}>{addressText}</span>
}