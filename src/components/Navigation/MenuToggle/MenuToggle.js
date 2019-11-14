import React from 'react'
import classes from './MenuToggle.css'

const MenuToggle = props => {
    const cls = [ classes.MenuToggle, 'fa'];
    if(props.isOpen) {
        cls.push('fa-times');
        cls.push(classes.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i onClick = {props.onToggle}  className = {cls.join(' ')} />
    )
}

export default MenuToggle