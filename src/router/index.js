import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router = new Router ({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home-screen",
            component: () => import("../pages/Index"),
        },
        {
            path: "/add",
            name: "add-data",
            component: () => import("../pages/AddToDo"),
        },
        {
            path: "/edit/:id",
            name: "edit-data",
            component: () => import("../pages/EditToDo"),
        },
        {
            path: "/detail/:id",
            name: "detail-data",
            component: () => import("../pages/DetailToDo"),
        },
    ],
});

export default router;