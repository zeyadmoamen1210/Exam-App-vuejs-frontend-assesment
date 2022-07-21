<script setup>
import { computed } from 'vue';
import { useQuestionsStore } from "@/store/questions";
const store = useQuestionsStore();

const calcTotalPoints = computed(() => {
    let points = 0;
    store.questions.forEach((question) => {
        if(question.studentAnswer == question.correct_answer){
            points+=1
        }
    });
    return points;
})
</script>

<template>
  <div class="results">
    <div class="card card-light mb-3 mt-4">
      <div class="p-3">Results</div>
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead class="table-active">
            <tr>
                <th scope="col">#</th>
                <th scope="col">The Questions</th>
                <th scope="col">Correct Answer</th>
                <th scope="col">Your Asnwer</th>
                <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(question, index) in store.questions" :key="index">
              <td> {{index+1}} </td>
              <td> {{ question.question }} </td>
              <td> {{ question.correct_answer }} </td>
              <td
                 :class="question.studentAnswer == question.correct_answer ? 'text-success' : 'text-danger'"
              >
                <font-awesome-icon v-if="question.studentAnswer == question.correct_answer" icon="circle-check" />
                <font-awesome-icon v-else icon="circle-xmark" />
                {{ question.studentAnswer }}
              </td>
              <td
                 v-if="question.studentAnswer"
                 :class="question.studentAnswer == question.correct_answer ? 'text-success' : 'text-danger'"
              >
                <span> {{ question.studentAnswer == question.correct_answer ? 1 : 0 }} </span>
              </td>
            </tr>
          </tbody>
          <tfoot class="table-active">
            <tr>
              <td colspan="4">Total</td>
              <td colspan="4"> {{ calcTotalPoints }} </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.results {
    .table>:not(caption)>*>* {
        padding: 15px;
    }
}
</style>
