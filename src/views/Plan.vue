<template>
  <div class="form-container">
    <FormTitle
      title="Select your plan"
      subtitle="You have the option of monthly or yearly billing."
    />
    <div class="plans___container">
      <div v-for="option in planOptions" :key="option.key">
        <PlanCard
          icon=""
          :title="option.key"
          :price="option.price"
          :value="option.value"
          :planOption="planOptionType"
          :selectedPlan="selectedPlanRef"
          :handlePlanChange="handlePlanChange"
        />
      </div>
    </div>

    <span v-show="displayErrorMessage" class="error-message"
      >Please select a plan</span
    >

    <form action="#" @submit.prevent="handleSubmit">
      <div class="toggle-container">
        <button class="monthly-btn" type="button">Monthly</button>
        <Switch
          :isChecked="switchChecked"
          :togglePlanOption="togglePlanOption"
        />
        <button
          class="yearly-btn"
          type="button"
          style="color: rgb(150, 153, 171)"
        >
          Yearly
        </button>
      </div>

      <div class="form__buttons">
        <button class="back__btn" @click="toggleStep(step - 1)">Go Back</button>
        <button class="next__btn" @click="toggleStep(step + 1)">
          Next step
        </button>
      </div>
    </form>
  </div>
  <div class="form__mobile__buttons">
    <button class="back__btn" @click="toggleStep(step - 1)">Go Back</button>
    <button class="next__btn" @click="toggleStep(step + 1)">Next step</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import Input from '@/components/common/Input.vue'
import Switch from '@/components/common/Switch.vue'
import { useStore } from 'vuex'
import PlanCard from '@/components/PlanCard.vue'
import { useRouter } from 'vue-router'
import FormTitle from '@/components/FormTitle.vue'
import { monthlyPlanOptions, yearlyPlanOptions } from '../data/data'

export default defineComponent({
  name: 'personal-info',
  components: {
    Input,
    Switch,
    PlanCard,
    FormTitle,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const selectedPlanRef = ref()
    const planOptionType = ref('')
    const displayErrorMessage = ref(false)
    const switchChecked = ref(false)

    const planOptions = ref<
      {
        key: string
        value: string
        price: number
        icon: string
      }[]
    >()

    const handleSubmit = (event: Event): void => {
      event.preventDefault()
    }

    const togglePlanOption = (event: Event) => {
      const target = event.target as HTMLInputElement
      selectedPlanRef.value = ''
      if (target.checked) {
        planOptionType.value = 'yearly'
        switchChecked.value = true
      } else {
        planOptionType.value = 'monthly'
        switchChecked.value = false
      }
    }

    const step = computed(() => store.state.step)

    const toggleStep = (step: number): void => {
      if (step === 1) {
        router.push(`/step-${step}`)
      }
      if (!selectedPlanRef.value.length) {
        displayErrorMessage.value = true
      } else {
        store.dispatch('addPlan', selectedPlanRef.value)
        store.dispatch('togglePlanType', planOptionType.value)
        store.dispatch('toggleStep', step)
        router.push(`/step-${step}`)
      }
    }

    const handlePlanChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      selectedPlanRef.value = target.value
      console.log(target.value)
      displayErrorMessage.value = false
    }

    onMounted(() => {
      store.dispatch('toggleStep', 2)
      const { planOption } = store.state.formData
      const { planType } = store.state
      selectedPlanRef.value = planOption
      planOptionType.value = planType
      planType === 'monthly'
        ? (switchChecked.value = false)
        : (switchChecked.value = true)
    })

    watch(planOptionType, () => {
      if (planOptionType.value === 'monthly') {
        planOptions.value = monthlyPlanOptions
      } else {
        planOptions.value = yearlyPlanOptions
      }
      store.dispatch('togglePlanType', planOptionType.value)
    })

    const selectedPlan = computed((e) => console.log(e.target.value))

    return {
      selectedPlan,
      selectedPlanRef,
      planOptionType,
      togglePlanOption,
      planOptions,
      handleSubmit,
      handlePlanChange,
      step,
      toggleStep,
      displayErrorMessage,
      switchChecked,
    }
  },
})
</script>

<style lang="scss" scoped>
.form-container {
  padding: 20px 70px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .plans___container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;
  }
  .error-message {
    color: $strawberry-red;
    font-weight: bolder;
    font-size: 13px;
    margin-top: 10px;
  }

  form {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .toggle-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 20px 0;
      padding: 0 140px;
      height: 50px;
      background-color: $magnolia;
      border-radius: 10px;
      .monthly-btn {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        font-weight: bolder;
        font-size: 14px;
        transition: 0.5s;
      }
      .monthly-btn:hover {
        color: $marine-blue !important;
      }
      .yearly-btn {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        font-weight: bolder;
        font-size: 14px;
        transition: 0.5s;
      }
      .yearly-btn:hover {
        color: $marine-blue !important;
      }
    }
  }
}

@media (max-width: $responsive-xs) {
   .form-container {
    padding: 25px 20px;
    height: fit-content;
    transform: translateY(-60px);
    border-radius: 10px;
    background-color: $white;
    width: 350px;
    margin: auto;
    margin-bottom: 60px;
  box-shadow: 5px 10px 18px #e9e9e9;


    .plans___container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 15px;
    }
    .error-message {
      color: $strawberry-red;
      font-weight: bolder;
      font-size: 13px;
      margin-top: 10px;
    }

    form {
      flex: 1;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .toggle-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 20px 0;
        padding: 5px 40px;
        height: 50px;
        background-color: $magnolia;
        border-radius: 10px;
        .monthly-btn {
          border: 0;
          background-color: transparent;
          cursor: pointer;
          font-weight: bolder;
          font-size: 14px;
          transition: 0.5s;
        }
        .monthly-btn:hover {
          color: $marine-blue !important;
        }
        .yearly-btn {
          border: 0;
          background-color: transparent;
          cursor: pointer;
          font-weight: bolder;
          font-size: 14px;
          transition: 0.5s;
        }
        .yearly-btn:hover {
          color: $marine-blue !important;
        }
      }
    }
  }
}
</style>
