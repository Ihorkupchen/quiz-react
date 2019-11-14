import React, {Component} from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validateControl, formValidate} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';

function creatInputControls (number) {
    return createControl({
        label: `${number} вариант ответа :`,
        errorMassage: 'Ответ не может быть пустой строкой!',
        id: number,
    },{required: true})

}

function creatFormControls (){
    
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMassage: 'Вопрос не может быть пустой строкой!',
        },{required: true}),
        answer1: creatInputControls (1), 
        answer2: creatInputControls (2), 
        answer3: creatInputControls (3), 
        answer4: creatInputControls (4),                 
    }
}

export default class QuizCreator extends Component {
state = {
    quiz:[],
    isFormValid: false,
    rightAnswerId: 1,
    formControls:  creatFormControls ()
}

    onSubmitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, answer1, answer2, answer3, answer4} = this.state.formControls

        const quiz = this.state.quiz.concat();
        const questionItem = {
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            id: quiz.length,
            answers: [
                { text: answer1.value, id: answer1.id},
                { text: answer2.value, id: answer2.id},
                { text: answer3.value, id: answer3.id},
                { text: answer4.value, id: answer4.id}
            ]
        }

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls:  creatFormControls ()
         })
    }

    makeQuizHandler = async event => {
        event.preventDefault()
        try {
            await axios.post('/quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls:  creatFormControls () 
            })
        } catch (e) {
            console.log(e)
        }
         
    }

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validateControl(value, control.validation);
        formControls[controlName] = control;
        const isFormValid = formValidate (formControls) ;

        this.setState({
            formControls,
            isFormValid,
        })

    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <React.Fragment key = {controlName + index}>
                <Input 
                    value = {control.value}
                    label = {control.label}
                    errorMassage = {control.errorMassage}
                    touched = {control.touched}
                    valid ={control.valid}
                    shouldValidate = {!!control.validation}
                    onChange = {event => this.onChangeHandler(event.target.value, controlName)}
                />
                {!index ? <hr/>: null}
                </React.Fragment>
            )
        })
    }
   
    onChangeSelectHandler = event => {
        
        this.setState ({
            rightAnswerId: +event.target.value,
        })
    }

   

    render() {
        const  select =  ( 
            <Select 
                value = {this.state.rightAnswerId}
                label = 'Выберете правильный вариант ответа '
                onChange = {this.onChangeSelectHandler}
                options = {[
                    {value: 1, text: 1 },
                    {value: 2, text: 2 },
                    {value: 3, text: 3 },
                    {value: 4, text: 4 },
                ]}
            />
        );
        return (
            <div className = {classes.QuizCreator}>
                <div>
                    <h1>Создать тест</h1>
                    <form onSubmit = {this.onSubmitHandler}>
                        {this.renderInputs()}

                        {select}

                        <Button 
                            type = 'primary'
                            onClick = {this.addQuestionHandler}
                            disabled = {!this.state.isFormValid}
                        >Добавить вопрос</Button>
                       
                        <Button
                            type = 'success'
                            onClick = {this.makeQuizHandler}
                            disabled = {!this.state.quiz.length}
                        > Создать тест</Button>

                    </form>
                </div>
            </div>
        )
    }
} 