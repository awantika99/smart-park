<template>
  <div class="h-screen bg-gray-100/50 dark:bg-gray-200/50 overflow-hidden flex items-center justify-center">
    <div
      class="flex flex-col md:flex-row w-full max-w-screen-md xl:max-w-screen-lg max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="w-full md:w-1/2 bg-white">
        <form class="p-8 md:p-14" @submit.prevent="formSubmit" v-if="formStep === 1">
          <div
            class="flex items-center justify-center px-4 py-3 font-bold font-mono text-3xl text-gray-900 dark:text-gray-100 mb-8 tracking-wide rounded-lg">
          </div>

          <!-- Username -->
          <div class="mb-6 md:mb-8">
            <ALabel>Username</ALabel>
            <div class="flex items-center text-lg">
              <div class="absolute ml-3">
                <Icon name="ic:baseline-person" class="text-xl" />
              </div>
              <input
                v-model="fields.username"
                type="text"
                id="username"
                class="input-primary w-full pl-12 py-2 md:py-4"
                placeholder="Username"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <ALabel>Password</ALabel>
            <PasswordInput v-model="fields.password" placeholder="Password" />
          </div>

          <!-- Login Button -->
          <div class="flex items-center justify-center mt-10">
            <button type="submit" class="btn px-6 py-2" id="button">
              Login
            </button>
          </div>

          <!-- Forgot Password -->
          <div class="flex items-center justify-center mt-5" id="forgetpassword">
            <p class="text-gray-700 dark:text-blue-600 font-medium cursor-pointer" @click="forgetPasswordHandler">
              Forgot Your Password?
            </p>
          </div>
        </form>
      </div>
      <uilayout></uilayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const router = useRouter()

definePageMeta({ layout: false })

const formStep = ref(1)
const fields = ref({
  username: '',
  password: '',
})

// 🔹 Simplified — no validation or API call
const formSubmit = () => {
  console.log('Login clicked — redirecting to parking page...')
  router.push('/parking')
}

const forgetPasswordHandler = () => {
  router.push('/forgetpassword')
}
</script>

<style>
.h-screen {
  border: 1px solid gray;
}
body {
  margin: 0;
}
</style>
