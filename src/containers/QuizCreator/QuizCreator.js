import React, {Component} from 'react';
import classes from './QuizCreator.module.scss'
import Button from '../../components/Ui/Button/Button'
import {createControl, validate, validateForm} from '../../formFabric/formFabric'
import Input from '../../components/Ui/Input/Input'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import Select from '../../components/Ui/Select/Select'
import axios from '../../axios/api'

function createOptionControl(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        },
        {
            required: true
        }
    )
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым'
            },
            {
                required: true
            }
        ),
        answer1: createOptionControl(1),
        answer2:  createOptionControl(2),
        answer3:  createOptionControl(3),
        answer4:  createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = event => event.preventDefault();

    addQuestHandler = event => {
        event.preventDefault();

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1;
        const {
            question,
            answer1,
            answer2,
            answer3,
            answer4 } = this.state.formControls;
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: answer1.value,
                    id: answer1.id
                },
                {
                    text: answer2.value,
                    id: answer2.id
                },
                {
                    text: answer3.value,
                    id: answer3.id
                },
                {
                    text: answer4.value,
                    id: answer4.id
                }
            ]
        };

        quiz.push(questionItem)
        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    createQuizHandler = async event => {
        event.preventDefault()

        try {
            await axios.post('/quizes.json', this.state.quiz);

            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            })
        }catch (e) {
            console.log(e)
        }

    };

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = {...formControls[controlName]};

        console.log(control.validation)
        control.value = event.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })


    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: + event.target.value
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxilliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        touched={control.touched}
                        onChange={event=> this.onChangeHandler(event, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </Auxilliary>

            )
        })
    };

    render() {
        const select = <Select
        label='Выберите правильный ответ'
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
            { text: 1, value: 1},
            { text: 2, value: 2},
            { text: 3, value: 3},
            { text: 4, value: 4},
            { text: 5, value: 5}
        ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}
                        <Button
                            type='primary'
                            onClick={this.addQuestHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
