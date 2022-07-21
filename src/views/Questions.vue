<script setup>
/*
    Import
*/
    import { ref, onMounted } from "vue";
    import Loading from "@/components/Loading.vue";
    import { useQuestionsStore } from "@/store/questions";
    import { useQuestionMoving } from '@/use/useQuestionMoveing'
    import { useRouter } from 'vue-router'

    const router = useRouter();
/*
    Get Questions
*/
    const loading = ref(true);
    const questions = ref([]);
    const store = useQuestionsStore();

    onMounted(async () => {
        questions.value = await store.getQuestions();
        // created randomAnswers array
        questions.value = questions.value.map((question) => {
            let answers = [...question.incorrect_answers, question.correct_answer];
            question.randomAnswers = answers.sort(() => Math.random() - 0.5);
            return question;
        });
        // close the loading
        loading.value = false;
    });

/*
    Answer Question
*/
    const answerQuestion = (questionIndex, answer) => {
        store.answerQuestion(questionIndex, answer);
    };
/*
    Move Prev / Next Question
*/
    let { goNext, goPrev} = useQuestionMoving()
/*
    Go To Result
*/
    const goTheResult = () => {
        store.openTheResult()
        router.push(`/results`)
    }
</script>

<template>
  <div>
    <Loading v-if="loading" />
    <div
      v-else
      v-for="(question, questionIndex) in questions"
      :key="questionIndex"
    >
      <div class="card mt-4" v-if="questionIndex + 1 == $route.params.id">
        <div class="card-header p-4">
          <h4 class="fs-3 mb-0">{{ question.question }}</h4>
        </div>
        <div class="card-body text-primary">
          <ul class="list-group lh-lg pt-2 pb-2">
            <li
              class="list-group-item"
              v-for="(answer, answerIndex) in question.randomAnswers"
              :key="answerIndex"
            >
              <input
                class="form-check-input mt-2 me-3"
                type="radio"
                name="listGroupRadio"
                :value="answer.studentAnswer"
                :id="answerIndex"
                :checked="
                  question.studentAnswer
                    ? answer == question.studentAnswer
                    : false
                "
                @change="answerQuestion(questionIndex, answer)"
              />
              <label class="form-check-label" :for="answerIndex">
                {{ answer }}
              </label>
            </li>
          </ul>
        </div>
        <div class="card-footer p-4 d-flex gap-2 justify-content-between">
            <div class="d-flex gap-2">
                <button
                    @click="goPrev(questionIndex)"
                    :disabled="questionIndex == 0"
                    type="button"
                    class="btn btn-dark"
                >
                    <font-awesome-icon icon="chevron-left" /> Previous
                </button>
                <button
                    @click="goNext(questionIndex)"
                    v-if="questionIndex != questions.length - 1"
                    type="button"
                    class="btn btn-dark"
                >
                    Next <font-awesome-icon icon="chevron-right" />
                </button>
            </div>
            <button
                v-if="questionIndex == questions.length - 1"
                :disabled="!store.ifAllQuestionsSolved"
                type="button"
                class="btn btn-dark"
                @click="goTheResult()"
            >
            Results
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-body {
    overflow-x: scroll;
}
</style>