import React, {Component} from 'react';
import classes from './Auth.module.scss'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import axios from 'axios'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched:false,
                validation: {
                    required: true,
                    email: true
                }

            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched:false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.valid,
            password: this.state.formControls.password.valid,
            returnSecureToken: true
        };
        try{
            await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD17TMV4jZYfvbtwbORBJ1bfErcSdKVeDY', authData)
        } catch (e) {
            console.log(e)
        }
    };

    registerHandler= async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try{
            await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD17TMV4jZYfvbtwbORBJ1bfErcSdKVeDY', authData)
        } catch (e) {
            console.log(e)
        }
    };

    submitHandler= (event) => {
        event.preventDefault()
    };

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        console.log(this.state)

        formControls[controlName] = control;

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    };

    validateEmail = (email) => {
        const re = /^(([^<>().,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
    };

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            console.log(123)
            isValid = this.validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    touched={control.touched}
                    onChange={event=> this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
                        <Button type='primary' onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегестрироватся</Button>
                    </form>
                </div>

            </div>
        );
    }
}
