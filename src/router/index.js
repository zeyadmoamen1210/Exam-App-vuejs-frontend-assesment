import { createRouter, createWebHistory } from 'vue-router';
import Questions from '@/views/Questions.vue';
import Result from '@/views/Results.vue';
import { useQuestionsStore } from '@/store/questions'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/questions/1',
      children:[
        {
          path: '/questions/:id',
          name: 'Questions',
          component: Questions
        }
      ]
    },
    {
      path: '/results',
      name: 'Results',
      component: Result,
      beforeEnter: (to,from,next) => {
        const store = useQuestionsStore();
        console.log("cdcddc", store.questions)
        if(store.ifAllQuestionsSolved){
          next();
        }else {
          next(`/`)
        }
      }
    }
  ]
})

export default router
