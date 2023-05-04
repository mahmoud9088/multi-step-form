<template>
  <div class="form-container">
    <FormTitle
      title="Finishing up"
      subtitle="Double-check everything looks OK before confirming."
    />
    <form action="#" @submit.prevent="handleSubmit">
      <div class="last-step-container">
        <div class="chosen-plan-addon-body">
          <div class="chosen-plan-container">
            <div class="chosen-plan">
              <h3>{{ selectedPlans[0].value }}</h3>
              <RouterLink to="/step-2">
                <button>Change</button>
              </RouterLink>
            </div>
            <h3>${{ selectedPlans[0].price }}/yr</h3>
          </div>
          <hr />
          <div
            class="chosen-addons-container"
            v-if="formData.addOnOptions.length > 0"
          >
            <div
              class="chosen-addon"
              v-for="option in selectedOns"
              :key="option.key"
            >
              <p>{{ option.value }}</p>
              <h4>
                +${{
                  planType === 'monthly'
                    ? `${option.pricePerMonth}/mo`
                    : `${option.pricePerYear}/yr`
                }}
              </h4>
            </div>
          </div>
        </div>
        <div class="total-container">
          <p>Total (per year)</p>
          <h2>${{ formData.totalPrice }}/yr</h2>
        </div>
      </div>

      <div class="form__buttons">
        <button class="back__btn" @click="toggleStep(step - 1)">Go Back</button>
        <button
          class="next__btn"
          @click="toggleStep('complete')"
          :style="{
            backgroundColor:
              step === 4 ? 'hsl(243, 100%, 62%)' : 'hsl(213, 96%, 18%)',
          }"
        >
          {{ step === 4 ? 'Confirm' : 'Next step' }}
        </button>
      </div>
    </form>
  </div>

  <div class="form__mobile__buttons">
    <button class="back__btn" @click="toggleStep(step - 1)">Go Back</button>
    <button
      class="next__btn"
      @click="toggleStep('complete')"
      :style="{
        backgroundColor:
          step === 4 ? 'hsl(243, 100%, 62%)' : 'hsl(213, 96%, 18%)',
      }"
    >
      {{ step === 4 ? 'Confirm' : 'Next step' }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import Input from '@/components/common/Input.vue'
import FormTitle from '@/components/FormTitle.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { FormData, ISelectedPlan, Ons } from '@/store'
import axios from 'axios'

export default defineComponent({
  name: 'personal-info',
  components: {
    Input,
    FormTitle,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const step = computed(() => store.state.step)
    const formData = computed<FormData>(() => store.state.formData)
    const planType = computed(() => store.state.planType)
    const selectedPlans = computed<ISelectedPlan[]>(() => {
      return store.getters.getSelectedPlan
    })
    const selectedOns = computed<Ons[]>(() => {
      return store.getters.getSelectedOns
    })

    const handleSubmit = (event: Event): void => {
      event.preventDefault()
    }

    const toggleStep = (step: number | string): void => {
      store.dispatch('toggleStep', 4)
      if (step === 'complete') {
        axios
          .post('http://localhost:3000/api/form-data', {...formData.value})
          .then((res) => {
            localStorage.clear()
            router.push(`/complete`)
          })
          .catch((err) => console.log(err))
      } else {
        router.push(`/step-${step}`)
      }
    }

    onMounted(() => {
      store.dispatch('toggleStep', 4)
      store.dispatch('calculateTotalPrice')
    })

    return {
      step,
      toggleStep,
      selectedPlans,
      selectedOns,
      formData,
      planType,
      handleSubmit,
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

  form {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .last-step-container {
      margin: 15px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .chosen-plan-addon-body {
      display: flex;
      flex-direction: column;
      background-color: $magnolia;
      padding: 0 15px;
      border-radius: 10px;
    }

    .chosen-plan-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 15px 0;
      height: 45px;
      h3 {
        font-size: 16px;
        color: $marine-blue;
        font-weight: bolder;
        align-self: center;
      }
    }

    .chosen-plan {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      h3 {
        font-size: 14px;
        color: $marine-blue;
      }
      button {
        border: none;
        color: $cool-gray;
        text-decoration: underline;
        background-color: transparent;
        cursor: pointer;
        font-weight: bolder;
        transition: 0.5s;
      }
      button:hover {
        color: $purplish-blue;
      }
    }

    .chosen-addons-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0;
    }

    .chosen-addon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0;

      h4 {
        font-size: 14px;
        font-weight: normal;
        color: $marine-blue;
      }

      p {
        font-size: 14px;
        color: $cool-gray;
      }
    }

    .total-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 30px 15px;

      p {
        font-size: 14px;
        color: $cool-gray;
      }

      h2 {
        font-size: 18px;
        color: $purplish-blue;
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
  }
}
</style>
