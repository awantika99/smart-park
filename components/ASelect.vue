<template>
  <div class="rounded-md">
    <v-select
      :options="selectOptions"
      :label="label"
      :placeholder="placeholder"
      :reduce="(obj:Record<string, any>) => selectObject ? obj: obj[value]"
      v-model="local"
      :multiple="multiple"
      class="input-primary mt-1"
      :disabled="disabled"
      append-to-body
      :class="customDropDownWidth ? customDropDownWidth : ''">
    </v-select>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import vSelect from 'vue-select'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number || String || Object ,
    default: null,
  },
  label: {
    type: String,
    default: 'nameEn',
  },
  selectObject: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: 'id',
  },
  placeholder: {
    type: String,
    default: 'Select Option',
  },
  options: {
    type: Array,
    default: null,
  },
  processOptions: {
    type: Function || undefined,
  },
  endpoint: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  customDropDownWidth: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

type OptionList = Ref<Array<Record<string, any>>>
const selectOptions: OptionList = ref([])

if (props.options) {
  // @ts-ignore
  selectOptions.value = props.options
} else if (props.endpoint) {
  const {data: fetchedData} = await useFetch(props.endpoint)
  let optionsList = (<OptionList>fetchedData).value
  if (props.processOptions) {
    optionsList = props.processOptions(optionsList)
  }
  selectOptions.value = optionsList
}

const getId = (v: {id: number}) => {
  return v.id
}

const processValue = (val: number | object[]) => {
  console.log('neVal',val)
  if (selectOptions.value.length <= 0) {
    return ''
  }
  if (Array.isArray(val) && val.length && typeof val[0] === 'object' && 'id' in val[0]) {
    // @ts-ignore
  
    const newVal = val.map(getId)
    emit('update:modelValue', newVal)
    return newVal
  }
  return val
}

const local = ref(processValue(props.modelValue))
watch(
  () => props.modelValue,
  () => {
    local.value = processValue(props.modelValue)
  }
)
watch(
  () => props.options,
  () => {
    // @ts-ignore
    selectOptions.value = props.options
    local.value = processValue(props.modelValue)
  }
)
watch(local, (value) => {
  emit('update:modelValue', value)
})
</script>

<style>
@import 'vue-select/dist/vue-select.css';
.vs__dropdown-toggle {
  border: 0px !important;
}
.vs__search {
  opacity: 0.1;
  font-size: 1.05em !important;
  font-weight: 400;
}
.v-select.input-primary {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}
.vs__dropdown-menu {
  overflow: scroll !important;
  z-index: 9999;
  opacity: 1 !important;
  @apply text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800;
}
.vs__selected {
  @apply text-gray-900 dark:text-gray-100;
}
</style>
