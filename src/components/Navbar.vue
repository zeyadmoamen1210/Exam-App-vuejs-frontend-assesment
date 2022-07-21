<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/*
    Composables
*/
import { useQuestionMoving } from "@/use/useQuestionMoveing";

/*
    Stores
*/
import { useQuestionsStore } from "@/store/questions";

const store = useQuestionsStore();
const route = useRoute();
const router = useRouter();

/*
    Move Prev / Next Question
*/
let { goNext, goPrev } = useQuestionMoving();

const goToResult = () => {
    store.openTheResult()
    router.push(`/results`)
}

const showNextBtn = computed(() => {
    if(route.path == '/results') return false;
    return route.params.id != store.questions.length;
})
const showPrevBtn = computed(() => {
    if(route.path == '/results') return false;
    return route.params.id != 1;
})
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Logo</a>
      <button
         class="navbar-toggler"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
         data-bs-target="#navbarSupportedContent"
         data-bs-toggle="collapse"
         type="button"
      >
      <span class="navbar-toggler-icon"></span>
    </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="showPrevBtn">
            <button
              class="nav-link btn btn-link"
              @click="goPrev($route.params.id - 1)"
            >
              Previous
            </button>
          </li>
          <li class="nav-item">
            <span class="nav-link" to="#">
              <font-awesome-icon icon="circle-question" />
              <template v-if="$route.path != '/results'">
                {{ $route.params.id }}
              </template>
              <template v-else>
                10
              </template>
               /10
            </span>
          </li>

          <li
            class="nav-item"
            v-if="showNextBtn"
          >
            <button
              class="nav-link btn btn-link"
              @click="goNext($route.params.id - 1)"
            >
              Next
            </button>
          </li>
          <li class="nav-item" v-else>
            <button class="btn btn-link nav-link" :disabled="!store.ifAllQuestionsSolved" @click.prevent="goToResult">Results</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style></style>
