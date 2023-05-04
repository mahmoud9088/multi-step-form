<template>
  <div class="input__container">
    <div class="label__container">
      <label :for="id" class="label__text">{{ title }}</label>
      <span v-if="error" class="error">{{ error }}</span>
    </div>
    <input
      :id="id"
      :placeholder="placeholder"
      :name="id"
      :value="value"
      @input="handleChange"
      @blur="handleInputBlur"
      :style="{ borderColor: error && 'hsl(354, 84%, 57%)' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  name: 'common-input',
  props: [
    'id',
    'title',
    'error',
    'placeholder',
    'name',
    'value',
    'handleChange',
    'handleInputBlur',
  ],
})
</script>

<style lang="scss" scoped>
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
    &:focus {
      border-color: $purplish-blue;
    }
  }
}
</style>
