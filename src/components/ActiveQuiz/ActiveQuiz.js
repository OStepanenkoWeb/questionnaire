import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswerList from './AnswersList/AnswerList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                {props.question}
            </span>
            <small>
                {props.answerNumber} из {props.quzLenght}
            </small>
        </p>
        <AnswerList
            answerState={props.answerState}
            answers={props.answers}
            onAnswerClickHandler={props.onAnswerClickHandler}
        />
    </div>
)

export default ActiveQuiz
