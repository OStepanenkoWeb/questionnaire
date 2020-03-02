import React from 'react'
import classes from './AnsverList.module.scss'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                    answer={answer}
                    key={index}
                    onAnswerClickHandler={props.onAnswerClickHandler}
                />
            )
        }) }
    </ul>
)

export default AnswersList
