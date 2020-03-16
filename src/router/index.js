import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Dashboard = () =>
    import(
        /* webpackChunkName: "dashboard" */
        "@/views/dashboard"
    );

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
