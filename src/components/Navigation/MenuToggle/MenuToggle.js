import React from 'react'
import classes from './MenuToggle.module.scss'

const MenuToggle = ({isOpen, onToggle}) => {
    const cls = [ classes.MenuToggle, 'fa' ]

    isOpen ? cls.push('fa-times', classes.open) : cls.push('fa-bars')
    
    return (
        <i
            className={cls.join(' ')}
            onClick={onToggle}
        />
    )
}

export default MenuToggle
