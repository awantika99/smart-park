<template>
  <div class="relative">
    <div class="flex items-center">
       <!-- <button class="px-4 py-2 bg-blue-500 text-white rounded-l-lg">Button</button> -->
      <div class="absolute ml-3 py-2 mt-2 ">
        65
      </div>
    <input
      ref="pphoneInput"
      type="text"
      class="input-primary w-full pl-7 py-2 md:py-2 mt-2"
      :placeholder="placeholder"
      v-model="phoneNumber"
      autocomplete="off"
      maxlength="11"
      @input="checkNumber"
      :required="required"
    />
    </div>
  </div>
</template>

<script setup>
const passwordInput = ref(false)
const visibility = ref(false)

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const phoneNumber = ref(props.modelValue.replace('60',''))

watch(
  () => props.modelValue,
  () => {
    phoneNumber.value = props.modelValue.replace('60','')
  }
)

const checkNumber = (event)=>{
    const inputValue = event.target.value
    if(inputValue.length==1){
      phoneNumber.value = inputValue.replace(/[^1-9]/g, "");
    }
    else{
      phoneNumber.value = inputValue.replace(/[^0-9]/g, "");
    }  
}
const formatOutgoingValue = (value) => {
  if(!phoneNumber.value.startsWith(65)){
    return '65'+value
  }
  return value
  
}

watch(phoneNumber, (value) => {
  emit('update:modelValue',formatOutgoingValue(value))
})
</script>
<style scoped>
.append {
  font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
}
</style>
