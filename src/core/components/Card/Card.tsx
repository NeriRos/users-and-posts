import React, {ReactNode} from 'react';
import Styles from './Card.module.css';

export const Card = (props: { title: string, description: string, children?: ReactNode, actions?: ReactNode[] }) => {
    return (
        <div className={Styles.card}>
            {props.title ? <h3>{props.title}</h3> : null}
            {props.description ? <p>{props.description}</p> : null}
            {props.children}
            {props.actions ? <div className={Styles.actions}>{props.actions}</div> : null}
        </div>
    )
}