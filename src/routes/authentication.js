/**
 * Pius Gumo
 * 19/02/2023
 * 
 * Authentication routes to allow users to login with Github and Google.
 * 
 */

import Login from '@/pages/auth/Login.vue'

const authenticationRoutes = [
    { path: '/login', component: Login, name: 'login' },
]

export default authenticationRoutes