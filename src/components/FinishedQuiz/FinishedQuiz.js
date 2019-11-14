import React from "react";
import classes from "./FinishedQuiz.css";
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const amountSuccess = Object.keys(props.res).reduce((amount,key)=>{
    if(props.res[key] === 'success') amount++ ;
    return amount
  },0);
  
  return (
    <div className={classes.FinishedQuiz}>
  
      <ul>
        {props.quiz.map((quiz, index) => {
          const cls = [
            "fa",
            props.res[quiz.id] === "fail" ? "fa-times" : "fa-check",
            classes[props.res[quiz.id]]
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong> &nbsp;
              {quiz.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {amountSuccess} из {props.quiz.length}
      </p>

      <Button onClick={props.onRetry} type="primary">
        Повторить
      </Button>
      <Link to = '/'>
      <Button type="success">
        Перейти к списоку тестов
      </Button>
      </Link>
    </div>
  );
};

export default FinishedQuiz;
