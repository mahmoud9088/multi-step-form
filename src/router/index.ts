import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PersonalInfo from "../views/PersonalInfo.vue";
import Plan from "../views/Plan.vue";
import AddOns from "../views/AddOns.vue";
import FinishingUp from "../views/FinishingUp.vue";
import Complete from "../views/Complete.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/step-1",
    name: "personal-info",
    component: PersonalInfo,
  },
  {
    path: "/step-2",
    name: "personal",
    component: Plan,
  },
  {
    path: "/step-3",
    name: "add-ons",
    component: AddOns,
  },
  {
    path: "/step-4",
    name: "finishing-up",
    component: FinishingUp,
  },
  {
    path: "/complete",
    name: "complete-view",
    component: Complete,
  },
  {
    path: "/:catchAll(.*)",
    component: PersonalInfo,
    beforeEnter: () => {
      router.push('/step-1');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
