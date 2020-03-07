import React from 'react'
import classes from './FinishedQuiz.module.scss'
import Button from '../Ui/Button/Button'
import CONSTANTS from '../../constants'
import {Link} from 'react-router-dom'

const FinishedQuiz = ({results, quiz, onRetry}) => {
    const successCount = Object.keys(results).reduce((total, key) => {

        return (results[key] === CONSTANTS.SUCCESS) ? total + 1 : total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        results[quizItem.id] === CONSTANTS.ERROR ? 'fa-times' : 'fa-check',
                        classes[results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                            <strong>{index +1}. &nbsp;</strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {quiz.length}</p>

            <div>
                <Button
                    onClick={onRetry}
                    disabled={false}
                    type={CONSTANTS.PRIMARY}
                >
                    Повторить
                </Button>
                <Link to={'/'}>
                    <Button
                        onClick={onRetry}
                        disabled={false}
                        type={CONSTANTS.SUCCESS}
                    >
                        Перейти в список тестов
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default FinishedQuiz
