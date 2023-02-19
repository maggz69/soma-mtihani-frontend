import welcomeRoutes from "@/routes/welcome.js";
import learningPathRoutes from "@/routes/learningPath.js";

// merge all routes into one array
const allRoutes = [...welcomeRoutes, ...learningPathRoutes];

export default [{ path: '/', component: () => import('@/layouts/AuthenticatedLayout.vue'), children: allRoutes }];