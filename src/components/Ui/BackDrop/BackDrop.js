import React from 'react'
import classes from './BackDrop.module.scss'

const BackDrop = ({onClick}) => (
        <div 
            className={classes.BackDrop} 
            onClick={onClick}
        />
    )

export default BackDrop
