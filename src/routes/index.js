import welcomeRoutes from "@/routes/welcome.js";
import learningPathRoutes from "@/routes/learningPath.js";
import authenticationRoutes from "@/routes/authentication.js";

// merge all routes into one array
const allRoutes = [...welcomeRoutes, ...learningPathRoutes, ...authenticationRoutes];

export default [{ path: '/', component: () => import('@/layouts/AuthenticatedLayout.vue'), children: allRoutes }];