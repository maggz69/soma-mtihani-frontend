import { createApp } from 'vue/dist/vue.esm-bundler'
import './style.css'
import App from './App.vue'

import { createWebHashHistory, createRouter } from 'vue-router'
import routes from '@/routes/index.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


createApp(App).use(router).mount('#app')
