<template>
  <div class="form-container">
    <FormTitle
      title="personal info"
      subtitle="Please provide your name, email adress and phone number."
    />
    <form action="#" @submit.prevent="handleSubmit">
      <div class="form__inputs">
        <Input
          id="name"
          title="Name"
          placeholder="e.g. Stephen King"
          :error="personalInfoValidation.name"
          :value="personalInfo.name"
          :handleChange="handleChange"
          :handleInputBlur="handleInputBlur"
        />
        <Input
          id="email"
          title="Email"
          placeholder="e.g. stephenking@lorem.com"
          :error="personalInfoValidation.email"
          :value="personalInfo.email"
          :handleChange="handleChange"
          :handleInputBlur="handleInputBlur"
        />
        <Input
          id="phone"
          title="Phone number"
          placeholder="e.g. +1 234 567 890"
          :error="personalInfoValidation.phone"
          :value="personalInfo.phone"
          :handleChange="handleChange"
          :handleInputBlur="handleInputBlur"
        />
      </div>

      <div class="form__buttons">
        <button
          class="back__btn"
          v-if="step !== 1"
          @click="toggleStep(step - 1)"
        >
          Go Back
        </button>
        <button class="next__btn" @click="toggleStep(step + 1)">
          Next step
        </button>
      </div>
    </form>
  </div>
  <div class="form__mobile__buttons">
    <button class="back__btn" v-if="step !== 1" @click="toggleStep(step - 1)">
      Go Back
    </button>
    <button class="next__btn" @click="toggleStep(step + 1)">Next step</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import Input from '@/components/common/Input.vue'
import { useStore } from 'vuex'
import FormTitle from '@/components/FormTitle.vue'
import { PersonalInfo } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'personal-info',
  components: {
    Input,
    FormTitle,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const personalInfo = reactive<PersonalInfo>({
      name: '',
      email: '',
      phone: '',
    })
    const personalInfoValidation = reactive<PersonalInfo>({
      name: '',
      email: '',
      phone: '',
    })

    const step = computed(() => store.state.step)
    const handleSubmit = (event: Event): void => {
      event.preventDefault()
    }

    const handleInputBlur = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (!target.value.length) {
        personalInfoValidation[target.name as keyof PersonalInfo] =
          'This field is required'
      } else {
        personalInfoValidation[target.name as keyof PersonalInfo] = ''
      }
    }
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      personalInfo[target.name as keyof PersonalInfo] = target.value
    }

    const handleRequiredValidation = (key: keyof PersonalInfo) => {
      if (!personalInfo[key].length) {
        personalInfoValidation[key] = 'This field is required'
      }
    }

    const toggleStep = (step: number): void => {
      if (
        !personalInfo.name.length ||
        !personalInfo.email.length ||
        !personalInfo.phone.length
      ) {
        Object.keys(personalInfo).map((key) => {
          handleRequiredValidation(key as keyof PersonalInfo)
        })
      } else {
        store.dispatch('toggleStep', step)
        store.dispatch('addPersonalInfo', personalInfo)
        router.push(`/step-${step}`)
      }
    }
    onMounted(() => {
      store.dispatch('toggleStep', 1)
      const { name, email, phone } = store.state.formData
      personalInfo.name = name
      personalInfo.email = email
      personalInfo.phone = phone
    })

    return {
      step,
      toggleStep,
      personalInfo,
      personalInfoValidation,
      handleSubmit,
      handleChange,
      handleInputBlur,
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

    .form__inputs {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      }
    }
  }
}
</style>
