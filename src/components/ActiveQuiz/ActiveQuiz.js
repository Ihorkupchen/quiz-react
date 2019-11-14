import React from "react";
import classes from "./ActiveQuiz.css"
import AnswerList from "../AnswerList/AnswerList";

const ActiveQuiz = props => (
    <div className = {classes.ActiveQuiz}>
        <p className = {classes.Question}>
            <span>
                <strong>{props.activeQuestion}.</strong> 
                {props.quiz.question}
            </span>
            <small> {props.activeQuestion} из {props.length }</small>
        </p>
       <AnswerList 
       answers = {props.quiz.answers}
       onAnswerClick = {props.onAnswerClick}
       state = {props.state}
       />
    </div>
)

export default ActiveQuiz 