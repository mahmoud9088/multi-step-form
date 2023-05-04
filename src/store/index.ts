import { createStore } from "vuex";
import { monthlyPlanOptions, yearlyPlanOptions, addOnsOptions } from '../data/data'

export interface FormData {
  name: string,
  email: string,
  phone: string,
  planOption: string,
  addOnOptions: string[],
  totalPrice: number
}

export interface PersonalInfo {
  name: string,
  email: string,
  phone: string,
}


export interface ISelectedPlan {
  key: string;
  value: string;
  price: number;
  icon: string;
}

export interface Ons {
  key: string,
  value: string,
  description: string,
  pricePerMonth: number,
  pricePerYear: number
}

export interface RootState {
  formData: FormData,
  step: number | string,
  planType: "monthly" | "yearly"
}

const storedData: any = localStorage.getItem("formData")
const plan: any = localStorage.getItem("plan")

export default createStore<RootState>({
  state: {
    formData: storedData ? JSON.parse(storedData) : {
      name: "",
      email: "",
      phone: "",
      planOption: "",
      addOnOptions: [],
      totalPrice: 0
    },
    step: 1,
    planType: plan ? JSON.parse(plan) : "monthly"
  },
  getters: {
    getSelectedPlan: state => {
      console.log(state, state.formData.planOption)
      if (state.planType === "monthly") {
        return monthlyPlanOptions.filter(option => option.value === state.formData.planOption)
      } else {
        return yearlyPlanOptions.filter(option => option.value === state.formData.planOption)
      }

    },
    getSelectedOns: state => {
      const selectedOns = addOnsOptions.filter(option => state.formData.addOnOptions.includes(option.value))
      return selectedOns
    }
  },
  mutations: {
    toggleStep(state, step: number) {
      state.step = step
    },
    addPersonalInfo(state, personalInfo: PersonalInfo) {
      state.formData = { ...state.formData, ...personalInfo }
      localStorage.setItem("formData", JSON.stringify(state.formData))
    },
    addPlan(state, plan: string) {
      state.formData = { ...state.formData, planOption: plan }
      localStorage.setItem("formData", JSON.stringify(state.formData))
    },
    togglePlanType(state, plan: "monthly" | "yearly") {
      state.planType = plan
      localStorage.setItem("plan", JSON.stringify(state.planType))
    },
    addOnOptions(state, ons: string[]) {
      state.formData.addOnOptions = ons
      localStorage.setItem("formData", JSON.stringify(state.formData))
    },
    calculateTotalPrice(state, { getters }) {
      console.log(getters)
      console.log(getters.getSelectedPlan[0].price, "dfffff")
      const planPrice: number = getters.getSelectedPlan[0].price;
      let totalOnsPrice: number = 0;
      if (state.formData.addOnOptions.length > 0) {
        if (state.planType === "monthly") {
          totalOnsPrice = getters.getSelectedOns.reduce((acc: number, item: Ons) => acc + item.pricePerMonth, 0)
        } else {
          totalOnsPrice = getters.getSelectedOns.reduce((acc: number, item: Ons) => acc + item.pricePerYear, 0)
        }
      }

      state.formData.totalPrice = planPrice + totalOnsPrice
      localStorage.setItem("formData", JSON.stringify(state.formData))
      return planPrice + totalOnsPrice

    }
  },
  actions: {
    toggleStep(context, step: number) {
      context.commit('toggleStep', step)
    },
    addPersonalInfo(context, personalInfo: PersonalInfo) {
      context.commit('addPersonalInfo', personalInfo)
    },
    addPlan(context, plan: string) {
      context.commit('addPlan', plan)
    },
    togglePlanType(context, plan: "monthly" | "yearly") {
      context.commit('togglePlanType', plan)
    },
    addOnOptions(context, ons: string[]) {
      context.commit('addOnOptions', ons)
    },
    calculateTotalPrice(context) {
      context.commit('calculateTotalPrice', { getters: context.getters })
    }
  },
  modules: {},
});
