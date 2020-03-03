import React from 'react';
import classes from './Input.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = ({type = "text", label, value, errorMessage, ...props}) => {
    const inputType = type;
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if(isInvalid(props)) {
        cls.push(classes.invalide)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input type={inputType} id={htmlFor} value={value} onChange={props.onChange}/>

            {isInvalid(props) ? <span>{errorMessage || "Введите верное значение"}</span> : null}

        </div>
    );
};

export default Input;
