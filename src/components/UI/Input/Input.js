import React from 'react'
import classes from './Input.css'

const Input = props => {
    const cls = [classes.Input]
    const htmlFor = `${props.type}-${Math.random()} `;
    const isInvalid = ({valid,touched, shouldValidate}) => {
        return !valid && touched && shouldValidate
    }

    if(isInvalid(props)) {
        cls.push(classes.invalid)
    }
        return (
        <div className = {cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={props.type || 'text'} 
                id = {htmlFor}
                value = {props.value}
                onChange = {props.onChange}
            />
            {isInvalid(props) ? <span>{props.errorMassage}</span>: null }
            
        </div>
    )    
}

export default Input