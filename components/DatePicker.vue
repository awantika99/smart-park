<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    modelValue: any
    mode?: 'datetime' | 'date' | 'time'
    min?: string | Date | null
    max?: string | Date | null
  }>(),
  {
    mode: 'datetime',
    min: null,
    max: null,
  }
)

const parseDate = (value: string | Date) => {
  if (typeof value === 'string') {
    return new Date(value)
  }

  return value
}

const fromatIncomingValue = (value: any) => {
  switch (props.mode) {
    case 'datetime':
      return value ? new Date(value) : null
    case 'date':
      return value
    case 'time':
      if (typeof value === 'string') {
        const [hours, minutes, seconds] = value.split(':')
        return {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        }
      }
      return value
  }
}

const formatOutgoingValue = (value: any) => {
  switch (props.mode) {
    case 'datetime':
      return value ? moment(value).format('YYYY-MM-DDTHH:mm:ss') : null
    case 'date':
      return value ? new Date(value).toISOString().substring(0, 10) : null
    case 'time':
      if (typeof value === 'object') {
        const {hours, minutes, seconds} = value
        return `${hours}:${minutes}:${seconds}`
      }
      return value
  }
}

const value = ref(fromatIncomingValue(props.modelValue))

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = fromatIncomingValue(newValue)
  }
)

watch(value, (value) => {
  emit('update:modelValue', formatOutgoingValue(value))
})
</script>

<template>
  <div class="relative">
    <VueDatePicker class="h-5"
      v-model="value"
      text-input
      auto-apply
      :min-date="props.min ? parseDate(props.min) : ''"
      :max-date="props.max ? parseDate(props.max) : ''"
      :min-time="
        props.min
          ? {
              hours: parseDate(props.min).getHours(),
              minutes: parseDate(props.min).getMinutes(),
            }
          : undefined
      "
      :max-time="
        props.max
          ? {
              hours: parseDate(props.max).getHours(),
              minutes: parseDate(props.max).getMinutes(),
            }
          : undefined
      "
      :is24="false"
      :time-picker="props.mode === 'time'"
      :enable-time-picker="props.mode === 'datetime'" />
  </div>
</template>
