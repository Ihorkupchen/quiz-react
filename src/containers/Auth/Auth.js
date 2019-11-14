import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input';
import is from 'is_js'
import axios from 'axios'



export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMassage: 'Введите корректный email ',
                touched: false,
                valid: false,
                validation:{
                    required: true,
                    email:true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMassage: 'Введите корректный пароль',
                touched: false,
                valid: false,
                validation:{
                    required: true,
                    minLength:6,
                }
            }
        }
    }

    validateControl = (value, validation) => {
        if (!validation) return true ;

        let isValid = true;

        

        if(validation.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

        

    }

    onChangeHandler = (value, controlName) => {

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = this.validateControl(value, control.validation);
        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach( name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid
        })

    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    label = {control.label}
                    errorMassage = {control.errorMassage}
                    touched = {control.touched}
                    valid ={control.valid}
                    shouldValidate = {!!control.validation}
                    onChange = {event => this.onChangeHandler(event.target.value, controlName)}
                />
            )
        })
    }

    loginHandler = async () => {
        const authDate = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9Uz57BoiLokg15XwboteBsFr6CR3WkL0', authDate)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    registerHandler = async () => { 

        const authDate = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9Uz57BoiLokg15XwboteBsFr6CR3WkL0', authDate)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }

    }

    onSubmitHandler = event => {
        event.preventDefault()
    }


    render() {
        return (
            <div className = {classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit = {this.onSubmitHandler}>
                        
                        {this.renderInputs()}
                        
                        <Button 
                            type = 'success'
                            onClick = {this.loginHandler}
                            disabled = {!this.state.isFormValid}
                        > Войти </Button>
                        
                        <Button 
                            type = 'primary'
                            onClick = {this.registerHandler}
                            disabled = {!this.state.isFormValid}
                        > Зарегистрироваться </Button>
                    </form>
                </div>
            </div>
        )
    }
} 