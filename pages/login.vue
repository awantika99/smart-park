<template>
  <div class="h-screen bg-gray-100/50 dark:bg-gray-200/50 overflow-hidden flex items-center justify-center">
    <div
      class="flex  flex-col md:flex-row w-full max-w-screen-md xl:max-w-screen-lg max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="w-full md:w-1/2 bg-white">
        <form class="p-8 md:p-14" @submit.prevent="formSubmit" v-if="formStep === 1">
          <div
            class="flex items-center justify-center px-4 py-3 font-bold font-mono  text-3xl text-gray-900 dark:text-gray-100 mb-8 tracking-wide rounded-lg">
            Login to Back Office</div>
          <div class="mb-6 md:mb-8">
            <ALabel>Username</ALabel>
            <div class="flex items-center text-lg">
              <div class="absolute ml-3">
                <Icon name="ic:baseline-person" class="text-xl" />
              </div>
              <input v-model="fields.username" type="text" id="username" class="input-primary w-full pl-12 py-2 md:py-4"
                placeholder="Username" :class="{
                  'input-error': v$.username?.$error,
                }" />
            </div>
            <ValidationMessage>{{ v$.username?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Password</ALabel>
            <PasswordInput v-model="fields.password" placeholder="Password"
              :class="{ 'input-error': v$.password?.$error, }" />
            <ValidationMessage>{{ v$.password?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div class="flex items-center justify-center mt-10">
            <loader v-if="loading"></loader>
            <button v-else type="submit" class="btn px-6 py-2" id="button">
              Login
            </button>
          </div>
          <div class="flex items-center justify-center mt-5" id="forgetpassword">
            <p class="text-gray-700 dark:text-blue-600 font-medium cursor-pointer" @click="forgetPasswordHandler()">
              Forgot Your Password ?</p>
          </div>
        </form>
      </div>
      <uilayout></uilayout>
    </div>
  </div>
</template>

<script setup lang="ts">

//import { UserData } from '~~/plugins/0.auth'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
let { fields, loading, errors, v$, rules, login } = await useForm('/api/Account/login',)
const formStep = ref(1)
definePageMeta({ layout: false })
const submitted = ref(false)
//fields.value = { username: '', password: '' }
//set default token
//const defaultToken = 'YOUR_DEFAULT_TOKEN'
const { $auth } = useNuxtApp()
const forgotPasswordEmail = ref('')
const otp = ref('')
const router = useRouter()
const forgotPasswordUserId: Ref<number | null> = ref(null)
const forgotPasswordUserAccessToken = ref('null')

const newPassword = ref('')
const confirmPassword = ref('')
//set default token
// if (defaultToken) {
//   // You might want to perform additional checks here based on your authentication logic
//   $auth.logIn({ token: defaultToken } as UserData)
// }

rules.value = {
  username: { required },
  password: { required },
}
// const formSubmit = async () => {
//   console.log('Starting formSubmit');
//   submitted.value = true;
//   loading.value = true;
//   let res =  await login();
//   if (res) {
//     console.log('res', res);
//     $auth.logIn(res.data as UserData);
//     //  router.push('/dashboard');
//     console.log('Redirected to dashboard successfully.');
//   }
//   loading.value = false;
//   console.log('Form submission complete.');
// };
const formSubmit = async () => {
  console.log('Starting formSubmit');
  submitted.value = true;
  loading.value = true;
  try {
    let res = await login();
    if (res) {
      console.log('loginres', res);
      $auth.logIn(res.Data as UserData);
      router.push('/payout');
      console.log('Redirected to dashboard successfully.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle the error appropriately, e.g., display an error message to the user.
  } finally {
    loading.value = false;
    console.log('Form submission complete.');
  }
};




const registerHandler = () => {
  console.log('registration')
  router.push('/register')
}

const forgetPasswordHandler = () => {
  console.log('forgetpassword')
  router.push('/forgetpassword')
}

// const resendOTP = async () => {
//   useFetch(`/api/auth/admin-forgot-password/`, {
//     method: 'POST',
//     body: { email: forgotPasswordEmail.value },
//   }).then(async (res) => {
//     if (res.error.value) {
//       toast.error('Failed to send OTP', {
//         timeout: 2000,
//       })
//     } else if (res.data.value) {
//       toast.success('OTP sent successfully', {
//         timeout: 2000,
//       })
//     }
//   })
// }

// const validateOTP = async () => {
//   useFetch(`/api/auth/validate-otp/`, {
//     method: 'POST',
//     body: { email: forgotPasswordEmail.value, otp: otp.value },
//   }).then(async (res) => {
//     if (res.error.value) {
//       const err = res.error.value
//       if (err.statusMessage) {
//         error.value = err.statusMessage
//       }
//     } else if (res.data.value) {
//       formStep.value = 4
//       forgotPasswordUserId.value = res.data.value.id
//       forgotPasswordUserAccessToken.value = res.data.value.accessToken
//       error.value = ''
//     }
//   })
// }

const checkPasswordMatch = () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Password does not match'
    return false
  } else {
    return true
  }
}

const resetPassword = () => {
  if (!checkPasswordMatch()) return
  if (newPassword.value === '') {
    error.value = 'Password is required'
    return
  }
  useFetch(`/api/${forgotPasswordUserId.value}`, {
    method: 'PATCH',
    body: { password: newPassword.value },
    headers: {
      Authorization: `Token ${forgotPasswordUserAccessToken.value}`,
    },
  }).then(async (res) => {
    if (res.error.value) {
      const err = res.error.value
      if (err.statusMessage) {
        error.value = err.statusMessage
      }
    } else if (res.data.value) {
      toast.success('Password reset successfully', {
        timeout: 2000,
      })
      formStep.value = 1
      forgotPasswordEmail.value = ''
      otp.value = ''
      forgotPasswordUserId.value = null
      forgotPasswordUserAccessToken.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
      error.value = ''
    }
  })
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
