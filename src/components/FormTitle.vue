<template>
<div class="form__title">
            <h1>{{title}}</h1>
            <p>{{ subtitle }}</p>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name:"form-title",
    props:["title" , "subtitle"]
})
</script>

<style lang="scss">
     .form__title{
            display: flex;
            flex-direction: column;
            gap: 8px;
    
            h1{
                font-size: 32px;
                color:$marine-blue;
                font-weight: $bold;
                text-transform: capitalize;
            }
            p{
                font-size: 16px;
                color: $cool-gray;
            }
          }
</style>