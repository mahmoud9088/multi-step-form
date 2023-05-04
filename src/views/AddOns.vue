<template>
  <div class="form-container">
    <FormTitle
      title="Pick add-ons"
      subtitle="Add-ons help enhance your gaming experience."
    />

    <form action="#">
      <div class="form__inputs">
        <!-- <div class="checkbox-input-container">
          <input type="checkbox" />
          <div class="label-text-container">
            <label htmlFor="{option.value}">
              <div>
                Online Service
                <p>Access to multiplayer games</p>
              </div>
              <div class="price-container">
                <span> +$10/yr </span>
              </div>
            </label>
          </div>
        </div> -->

        <!-- <div class="checkbox-input-container">
          <input type="checkbox" />
          <div class="label-text-container">
            <label htmlFor="{option.value}">
              <div>
                Online Service
                <p>Access to multiplayer games</p>
              </div>
              <div class="price-container">
                <span> +$10/yr </span>
              </div>
            </label>
          </div>
        </div> -->

        <div
          class="checkbox-input-container"
          v-for="(option , index) in addOnsOptions"
          :key="option.key"
        >
          <input type="checkbox" :value="option.value" v-model="onsSelected" />
          <div class="label-text-container">
            <label htmlFor="{option.value}">
              <div>
                {{option.value}}
                <p>{{option.description}}</p>
              </div>
              <div class="price-container">
                <span> {{plan==="monthly"?`+$${option.pricePerMonth}/mo` :`+$${option.pricePerYear}/yr`}} </span>
              </div>
            </label>
          </div>
        </div>
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
        <button class="next__btn" @click="toggleStep(step + 1)">
          Next step
        </button>
      </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref , watch } from 'vue'
import Input from '@/components/common/Input.vue'
import { useStore } from 'vuex'
import FormTitle from '@/components/FormTitle.vue'
import { useRouter } from 'vue-router'
import {addOnsOptions} from '../data/data'

export default defineComponent({
  name: 'personal-info',
  components: {
    Input,
    FormTitle,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const plan = ref('')
    const onsSelected = ref([])

    const toggleStep = (step: number): void => {
      store.dispatch('toggleStep', step)
      store.dispatch('addOnOptions', onsSelected.value)
      router.push(`/step-${step}`)
      console.log(step, 'steo')
    }

    onMounted(() => {
      store.dispatch('toggleStep', 3)
      const { planType } = store.state
      plan.value = planType
    })

    const step = computed(() => store.state.step)

    return {
      step,
      toggleStep,
      addOnsOptions,
      plan,
      onsSelected
    }
  },
})
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  height: 100%;
  padding: 20px 70px;
  display: flex;
  flex-direction: column;

  form {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .form__inputs {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .input__container {
        .label__container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 5px 0px;
          .error {
            color: $strawberry-red;
          }
        }

        input {
          width: 100%;
          outline: none;
          padding: 13px;
          border-radius: 7px;
          border: 1px solid $cool-gray;
        }
      }
    }

    .form__buttons {
      align-self: flex-end;
      .next__btn {
        border: none;
        outline: none;
        background-color: $marine-blue;
        width: 120px;
        border-radius: 7px;
        padding: 15px 30px;
        cursor: pointer;
        color: #fff;
        font-weight: $bold;

        &:hover {
          opacity: 60%;
        }
      }
    }
  }

  .checkbox-input-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 15px;
    margin: 7px 0;
    border: 1px solid $light-gray;
    border-radius: 10px;
    cursor: pointer;
  }

  .checkbox-input-container:hover {
    background-color: $magnolia;
    border: double 1px transparent;
    border-radius: 10px;
    background-image: linear-gradient($white, $white),
      linear-gradient(to right, $purplish-blue, $marine-blue);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  .checkbox-input-container input {
    margin: 10px;
    height: 17px;
    width: 17px;
    cursor: pointer;
  }

  .label-text-container {
    justify-content: space-between;
    margin: 0 10px;
    flex-grow: 2;
  }

  .label-text-container label {
    color: $marine-blue;
    font-weight: bolder;
    font-size: 14px;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .label-text-container label p {
    color: $cool-gray;
    font-weight: normal;
    font-size: 14px;
    cursor: pointer;
  }

  .price-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purplish-blue;
    font-size: 14px;
  }
}

@media (max-width: $responsive-xs) {
  .form-container {
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  transform: translateY(-60px) ;
  border-radius: 10px;
  background-color: $white;
  width: 350px;
  margin: auto;
  margin-bottom: 60px;
  box-shadow: 5px 10px 18px #e9e9e9;


}
}
</style>
