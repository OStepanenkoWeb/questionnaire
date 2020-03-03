import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswerList from './AnswersList/AnswerList'

const ActiveQuiz = ({answerNumber, question, quzLenght, answerState, answers, onAnswerClickHandler}) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{answerNumber}</strong>&nbsp;
                {question}
            </span>
            <small>
                {answerNumber} из {quzLenght}
            </small>
        </p>
        <AnswerList
            answerState={answerState}
            answers={answers}
            onAnswerClickHandler={onAnswerClickHandler}
        />
    </div>
)

export default ActiveQuiz
