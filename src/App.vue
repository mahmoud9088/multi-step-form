<template>
  <main class="main">
    <section class="container">
      <progress-bar />
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import ProgressBar from './components/ProgressBar.vue'

export default defineComponent({
  name: 'my-app',
  components: { ProgressBar },
  setup(props, ctx) {
    const store = useStore()
    const step = computed(() => store.state.step)
  },
})
</script>

<style lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .container {
    width: 900px;
    height: 600px;
    background-color: $white;
    border-radius: 20px;
    padding: 20px;
    display: flex;
  }
}

@media (max-width: $responsive-lg) {
  .main {
    display: block;
    height: auto;
    width: 100vw;
    overflow: hidden;
    .container {
      flex-direction: column;
      margin: 35px auto;
      width: 700px;
      height: fit-content;
    }
  }
}
@media (max-width: $responsive-md) {
  .main {
    display: block;
    height: auto;
    width: 100vw;
    overflow: hidden;
    .container {
      flex-direction: column;
      width: 450px;
      height: auto;
    }
  }
}

@media (max-width: $responsive-xs) {
  .main {
    display: block;
    height: auto;
    .container {
      height: fit-content;
      flex-direction: column;
      width: 100%;
      padding: 0;
      margin: 0;
      background-color: transparent;
    }
  }
}
</style>
