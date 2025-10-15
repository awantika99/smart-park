<template>
  <div class="relative">
    <div class="flex items-center text-lg">
              <div class="absolute ml-3">
                <Icon name="material-symbols:lock" class="text-xl" />
              </div>
    <input
      ref="passwordInput"
      type="password"
      id="password-input"
      class="input-primary w-full pl-12 py-2 md:py-2 mt-2"
      :placeholder="placeholder"
      v-model="password"
      autocomplete="off"
      :required="required"
    />
    </div>
    <div
      class="absolute h-5/4 m-1 flex items-center cursor-pointer justify-center top-4 right-0 bg-white p-1"
      @click="changeVisibility"
    >
      <Icon v-if="visibility" name="tabler:eye" class="h-4 w-4" />
      <Icon v-else name="mdi:eye-off-outline" class="h-4 w-4" />
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

const password = ref(props.modelValue)

watch(password, (value) => {
  emit('update:modelValue', value)
})

const changeVisibility = () => {
  visibility.value = !visibility.value
  passwordInput.value.type = visibility.value ? 'text' : 'password'
}
</script>
