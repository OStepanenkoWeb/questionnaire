import React, { Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import CONSTANTS from '../../constants'
import axios from '../../axios/api'
import Loader from "../../components/Ui/Loader/Loader";

class Quiz extends Component{
    constructor (props) {
        super(props)
        this.state = {
            results: {},
            isFinished: false,
            answerState: null,
            activeQuestion: 0,
            quiz: [],
            loading: true
        }
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[key] === CONSTANTS.SUCCESS){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) results[question.id] = CONSTANTS.SUCCESS
            this.setState( {
                answerState: { [answerId]: CONSTANTS.SUCCESS},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinish()) {
                    this.setState ({
                        isFinished: true
                    })
                } else {
                    this.setState ({
                        activeQuestion: this.state.activeQuestion +1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = CONSTANTS.ERROR
            this.setState( {
                answerState: { [answerId]: CONSTANTS.ERROR},
                results
            })
        }
    };

    isQuizFinish() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    async componentDidMount() {
        try{
            const { data: quiz } = await axios(`/quizes/${this.props.match.params.id}.json`)

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                        ? <Loader/>
                        :
                            this.state.isFinished
                            ? <FinishedQuiz
                                 onRetry={this.retryHandler}
                                 results={this.state.results}
                                 quiz={this.state.quiz}
                            />
                            : <ActiveQuiz
                                 answerState={this.state.answerState}
                                 answers={this.state.quiz[this.state.activeQuestion].answers}
                                 question={this.state.quiz[this.state.activeQuestion].question}
                                 onAnswerClickHandler={this.onAnswerClickHandler}
                                 quzLenght={this.state.quiz.length}
                                 answerNumber={this.state.activeQuestion + 1}
                            />
                    }

                </div>
            </div>
        )
    }

}

export default Quiz
