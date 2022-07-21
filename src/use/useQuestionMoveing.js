import { useRouter, useRoute } from 'vue-router';
import { useQuestionsStore } from '@/store/questions';
export const useQuestionMoving = () => {
    const router = useRouter();
    const route = useRoute();
    const store = useQuestionsStore();
    
    function goNext(questionIndex) {
        if (questionIndex == store.questions.length - 1) return;
        if (store.questions[questionIndex].studentAnswer) {
            router.push(`/questions/${questionIndex + 2}`);
        } else {
            alert("Select One Answer First");
        }
    }
    function goPrev(questionIndex) {
        if (questionIndex == 0) return;
        router.push(`/questions/${route.params.id - 1}`);
    }
    return { goNext, goPrev }
}