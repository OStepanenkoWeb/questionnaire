import React, { Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {connect} from 'react-redux'
import Loader from "../../components/Ui/Loader/Loader";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz"

class Quiz extends Component{
    constructor (props) {
        super(props)
    }

    async componentDidMount() {
       this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader/>
                        :
                            this.props.isFinished
                            ? <FinishedQuiz
                                 onRetry={this.props.retryQuiz}
                                 results={this.props.results}
                                 quiz={this.props.quiz}
                            />
                            : <ActiveQuiz
                                 answerState={this.props.answerState}
                                 answers={this.props.quiz[this.props.activeQuestion].answers}
                                 question={this.props.quiz[this.props.activeQuestion].question}
                                 onAnswerClickHandler={this.props.quizAnswerClick}
                                 quzLenght={this.props.quiz.length}
                                 answerNumber={this.props.activeQuestion + 1}
                            />
                    }

                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        activeQuestion: state.quiz.activeQuestion,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
