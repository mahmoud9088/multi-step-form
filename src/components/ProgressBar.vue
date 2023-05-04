<template>
  <div class="progress-container">
    <div class="progress-step" v-for="{ step, title } in progress" :key="step">
      <span
        class="step"
        :style="{
          backgroundColor:
            step === currentStep ? 'hsl(206, 94%, 87%)' : 'transparent',
          color: step === currentStep ? '#000' : '#fff',
        }"
        >{{ step }}</span
      >
      <div class="step-desc">
        <p>step {{ step }}</p>
        <h4>{{ title }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { progress } from '@/data/data'

export default defineComponent({
  name: 'progress-bar',
  setup() {
    const store = useStore()
    const currentStep = computed(() => store.state.step)
    return {
      currentStep,
      progress,
    }
  },
})
</script>

<style lang="scss" scoped>
.progress-container {
  width: 275px;
  min-width: 275px;
  background-image: url('../assets/images/bg-sidebar-desktop.svg');
  background-repeat: no-repeat;
  border-radius: 10px;
  padding: 35px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .progress-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    .step {
      height: 30px;
      width: 30px;
      border: 1px solid $light-blue;
      border-radius: 50%;
      color: $white;
      display: grid;
      place-items: center;
    }

    .step-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 5px;
      padding: 2px;
      text-transform: uppercase;

      p {
        color: $pastel-blue;
      }

      h4 {
        color: $white;
        font-weight: $bold;
      }
    }
  }
}

@media (max-width: $responsive-lg) {
    .progress-container {
      width: 100%;
      min-width: 375px;
      height: 185px;
      min-height: 175px;
      background-image: url('../assets/images/bg-sidebar-mobile.svg');
      background-size:cover ;
      flex-direction: row;
      justify-content: center;
      gap: 50px;
      padding-top: 40px;
  

      .progress-step {

        flex-direction: column;
        align-items: center;
        text-align: center;
        .step-desc {
          /* display: none; */
        }
      }

    }
  }

  @media (max-width: $responsive-md) {
    .progress-container {
      width: 100%;
      min-width: 375px;
      height: 185px;
      background-image: url('../assets/images/bg-sidebar-mobile.svg');
      background-size:cover ;
      flex-direction: row;
      justify-content: center;
      gap: 20px;

      .progress-step {

        flex-direction: column;
        align-items: center;
        text-align: center;
        .step-desc {
          display: none;
        }
      }

    }
  }


  @media (max-width: $responsive-xs) {
    .progress-container {
      border-radius: 0px;

    }
  }
</style>
