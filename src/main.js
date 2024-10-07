import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importera Bootstrap, Popper.js och jQuery
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Denna fil inkluderar också Popper.js

const app = createApp(App)

app.use(router)

app.mount('#app')
