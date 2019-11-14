import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-f4d94.firebaseio.com/'
})