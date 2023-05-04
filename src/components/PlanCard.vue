<template>
<div class="plan__card" :style="{borderColor:selectedPlan === value ?'hsl(243, 100%, 62%)':'hsl(231, 11%, 63%)' , backgroundColor: selectedPlan === value ? 'hsl(217, 100%, 97%)': 'hsl(0, 0%, 100%)' }">
    <input type="radio" name="plan" :value="value" @input="handlePlanChange"  />
        <div class="card__content">
            <span class="card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" filrule="evenodd"><circle cx="20" cy="20" r="20" fill="#FFAF7E"></circle><path fill="#FFF" filrule="nonzero" d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"></path></g></svg>
            </span>
        <div class="card__text">
                        <h3>{{title}}</h3>
                        <p class="price">${{price}}/mo</p>
                        <p class="discount" v-if="planOption === 'yearly'">2 month free</p>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue';

    export default defineComponent({
        name:"plan-card",
        props:["title", "price", "value" , "planOption", "selectedPlan","handlePlanChange"],
        setup(){
            let selectedPlanRef = ref("") 
            return{
                selectedPlanRef
            }
            
        }
    })
</script>

<style lang="scss">
    .plan__card{
                display: block;
                width: 140px;
                height: 160px;
                background-color: $white;
                position: relative;
                padding: 15px;
                border: 1px solid $cool-gray;
                border-radius: 10px;

                &:hover{
                    border-color: $purplish-blue;
                    cursor: pointer;
                }

                input{
                    position: absolute;
                    top:0;
                    left:0;
                    right: 0;
                    bottom: 0;
                    z-index: 3;
                    opacity: 0;
                    cursor: pointer;
                }

                .card__content{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    h3{
                        color:$marine-blue;
                        font-weight: $bold;
                    }
                    p{
                        font-weight: $normal;
                    }
                    .price{
                        color:$cool-gray;
                    }
                    .discount{
                        color:$marine-blue;
                        font-size: 14px
                    }
                }


            }


            @media (max-width: 475px) {
                .plan__card{
                display: block;
                width: 100%;
                height: fit-content;
                background-color: $white;
                position: relative;
                padding: 15px;
                border: 1px solid $cool-gray;
                border-radius: 10px;

                &:hover{
                    border-color: $purplish-blue;
                    cursor: pointer;
                }

                input{
                    position: absolute;
                    top:0;
                    left:0;
                    right: 0;
                    bottom: 0;
                    z-index: 3;
                    opacity: 0;
                    cursor: pointer;
                }

                .card__content{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    gap:20px;
                    height: 100%;
                    h3{
                        color:$marine-blue;
                        font-weight: $bold;
                    }
                    p{
                        font-weight: $normal;
                    }
                    .price{
                        color:$cool-gray;
                    }
                    .discount{
                        color:$marine-blue;
                        font-size: 14px
                    }
                }


            }    
            }
</style>