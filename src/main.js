import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// pinia state management 
import { createPinia } from 'pinia'
const pinia = createPinia();

// bootsrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

// font awsome 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleQuestion, faChevronLeft, faChevronRight, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleQuestion);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faCircleCheck);
library.add(faCircleXmark);

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)
app.use(pinia)

app.mount('#app')
