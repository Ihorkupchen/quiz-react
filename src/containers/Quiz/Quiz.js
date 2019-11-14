import React, {Component} from "react"
import classes from "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import axios from "../../axios/axios-quiz"
import Loader from "../../components/UI/Loader/Loader"


class Quiz extends Component {
    state = {
        res: {},
        isFinished: false,
        activeQuestion: 0,
        madeAnswer: null,
        loading: true,
        quiz: [
           /*  {
                question: "Какого цвета небо ?",
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: "Белый", id: 1},
                    {text: "Черный", id: 2},
                    {text: "Синий", id: 3},
                    {text: "Красный", id: 4}
                ]
            },
            {
                question: "В каком году родился Игорь ?",
                rightAnswerId: 1,
                id: 2,
                answers: [
                    {text: "2000", id: 1},
                    {text: "1999", id: 2},
                    {text: "2001", id: 3},
                    {text: "1998", id: 4}
                ]
            } */
        ]
    };

    onAnswerClickHandler = answerId => {
        if (this.state.madeAnswer) {
            const key = Object.keys(this.state.madeAnswer)[0];
            if (this.state.madeAnswer[key] === "success") return;
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const res = this.state.res;

        if (question.rightAnswerId === answerId) {
            if (!this.state.res[question.id]) {
                res[question.id] = "success";
            }

            this.setState({
                madeAnswer: {[answerId]: "success"},
                res
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true});
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        madeAnswer: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            res[question.id] = "fail";
            this.setState({
                madeAnswer: {[answerId]: "fail"},
                res
            });
        }
    
    };

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    retryHandler = () => {
        this.setState({
            res: {},
            isFinished: false,
            activeQuestion: 0,
            madeAnswer: null
        });
    };

    async componentDidMount() {
        try {
            const response  = await axios(`/quizes/${this.props.match.params.id}.json `)
            const quiz = response.data;
             this.setState({
                 quiz,
                 loading: false,
             })
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper} >

                    <h1>Quiz</h1>
                    
                    {this.state.loading 
                        ? <Loader/>
                        : this.state.isFinished ? 
                            <FinishedQuiz
                                res={this.state.res}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : 
                            <ActiveQuiz
                                quiz={this.state.quiz[this.state.activeQuestion]}
                                onAnswerClick={this.onAnswerClickHandler}
                                activeQuestion={this.state.activeQuestion + 1}
                                length={this.state.quiz.length}
                                state={this.state.madeAnswer}
                            />
                    }
                    
                </div>
            </div>
        );
    }
}

export default Quiz;
