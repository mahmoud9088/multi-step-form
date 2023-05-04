<template>
  <div class="progress-step">
    <span class="step">{{ step }}</span>
    <div class="step-desc">
      <p>step {{ step }}</p>
      <h4>{{ title }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
export default defineComponent({
  name: 'progess-step',
  props: ['step', 'title'],
})
</script>
