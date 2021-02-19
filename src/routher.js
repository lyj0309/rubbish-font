import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./Main.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Main,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;