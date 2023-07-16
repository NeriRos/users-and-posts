import {IconButton, IconProps} from "@/core/components/Icons/IconButton";
import {FaTrash} from "react-icons/fa";

export const DeleteIcon = (props: IconProps) => (
    <IconButton  {...props}>
        <FaTrash/>
    </IconButton>
);