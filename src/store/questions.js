import { defineStore } from 'pinia';
import { useAxios } from '@/axios';


export const useQuestionsStore = defineStore('useQuestions', {
    state(){
        return {
            questions: [],
            isResultOpened: false,
        }
    },
    getters: {
        ifAllQuestionsSolved() {
            if(this.questions.length == 0) return false;
            let allSolved = true;
            this.questions.forEach(question => {
                console.log("ds ",question.studentAnswer)
                if(!question.studentAnswer) {
                    allSolved = false;
                }
            })
            return allSolved;
        }
    },
    actions: {
        setQuestions(questions) {
            this.questions = questions;
        },
        async getQuestions(){
            const { axios } = useAxios();
            try {
                // base url in axios.js
                let questionsReq = await axios.get(`/api.php?amount=10&category=18&difficulty=medium&type=multiple`);
                this.questions = questionsReq?.data?.results;
                return this.questions;
            } catch {
                return null;
            }
        },
        answerQuestion(questionIndex, answer){
            this.questions[questionIndex].studentAnswer = answer;
        },
        openTheResult(){
            this.isResultOpened = true;
        }
    }
})