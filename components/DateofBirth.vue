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
    }>(),
    {
        mode: 'datetime',
        min: null,
    }
)

const parseDate = (value: string | Date) => {
    if (typeof value === 'string') {
        return new Date(value)
    }

    return value
}

const formatIncomingValue = (value: any) => {
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
            return value ? moment(new Date(value)).set('year', 2007).toISOString().substring(0, 10) : null
        case 'time':
            if (typeof value === 'object') {
                const { hours, minutes, seconds } = value
                return `${hours}:${minutes}:${seconds}`
            }
            return value
    }
}

const isDateDisabled = (date: Date) => {
    // Disable dates after the year 2007
    return date.getFullYear() > 2007;
}

const value = ref(formatIncomingValue(props.modelValue) || new Date(2007, 0, 1));



watch(
    () => props.modelValue,
    (newValue) => {
        value.value = formatIncomingValue(newValue)
    }
)

watch(value, (newValue) => {
    emit('update:modelValue', formatOutgoingValue(newValue))
})
</script>

<template>
    <div class="relative">
        <VueDatePicker v-model="value" text-input auto-apply :min-date="props.min ? parseDate(props.min) : ''"
            :max-date="new Date(2007, 11, 31)" :min-time="props.min
                ? {
                    hours: parseDate(props.min).getHours(),
                    minutes: parseDate(props.min).getMinutes(),
                }
                : undefined
                " :value="new Date(2007, 11, 31)" :is24="false" :time-picker="props.mode === 'time'"
            :enable-time-picker="props.mode === 'datetime'" :is-date-disabled="isDateDisabled" />
    </div>
</template>

<!-- <script lang="ts">
import { ref } from 'vue';

const handleBeforeShow = (picker) => {
  picker.setOptions({
    maxDate: new Date(2007, 11, 31), 
    minDate: new Date(1900, 0, 1),   
  });
};
</script> -->
