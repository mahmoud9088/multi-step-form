<template>
    <!-- <div class="toggle-container">
        <button class="monthly-btn" type="button">Monthly</button> -->
        <label class="switch">
            <input readonly type="checkbox" :checked="isChecked" @input="togglePlanOption">
            <span class="slider round">
            </span>
        </label>
        <!-- <button class="yearly-btn" type="button" style="color: rgb(150, 153, 171);">Yearly</button>
    </div> -->

</template>

<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        name:"common-switch",
        props:["isChecked","togglePlanOption"]
    })
</script>

<style lang="scss">

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $marine-blue;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $marine-blue;
}

input:focus + .slider {
  box-shadow: 0 0 1px $marine-blue;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>