
// create Welcome component with default message
const Welcome = { template: '<div>Welcome to the Vue 3 Vite App</div>' }

const About = { template: '<div>About</div>' }

const PrivacyPolicy = { template: '<div>Privacy Policy</div>' }

const welcomeRoutes = [
    { path: '/', component: Welcome, name: 'welcome' },
    { path: '/about', component: About, name: 'about' },
    { path: '/privacy-policy', component: PrivacyPolicy, name: 'privacy-policy' },
]

export default welcomeRoutes;