<template>
  <div>
    <!-- component -->
    <div class="h-screen bg-gray-100/90 dark:bg-gray-900/90 overflow-hidden flex items-center justify-center">
      <div
        class="flex flex-col md:flex-row w-full max-w-screen-md xl:max-w-screen-lg max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="w-full md:w-1/2 bg-white">
          <form class="p-8 md:p-14" @submit.prevent="resetPassword">
            <div class="text-2xl text-gray-900 dark:text-gray-100 font-bold font-mono mb-5 tracking-wide">Reset Password
            </div>
            <div class="mb-6 md:mb-8">
              <ALabel>Password</ALabel>
              <div class="flex items-center text-lg">
                <PasswordInput placeholder="Password" class="w-80" v-model="fields.new_password" autocomplete="off" />
              </div>
              <ValidationMessage>{{ v$.new_password?.$errors[0]?.$message }}</ValidationMessage>
            </div>
            <div>
              <ALabel>Confirm Password</ALabel>
              <div class="flex items-center text-lg">
                <PasswordInput autocomplete="off" placeholder="Confirm Password" class="w-80"
                  v-model="fields.confirm_new_password" />
              </div>
              <ValidationMessage>{{ v$.confirm_new_password?.$errors[0]?.$message }}</ValidationMessage>
            </div>
            <div class="flex justify-items-start mt-16 md:mt-10">
              <button class="btn px-6 md:px-4 md:py-2" type="submit" id="button">Reset Password</button>
            </div>
          </form>
        </div>
        <uilayout></uilayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
let { fields, loading, errors, v$, rules, formSubmit } = useForm('/manage/reset-password/', { needToRedirect: false })
const formStep = ref(1)
definePageMeta({ layout: false, auth: false })

//fields.value = { username: '', password: '' }
const { token } = useRoute().query

const router = useRouter()

rules.value = {
  new_password: {
    required: helpers.withMessage("New Password is required", required),
    containsPasswordRequirement: helpers.withMessage(
      () => `New Password must contain an uppercase, lowercase, number and special character`,
      helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
    minLength: helpers.withMessage("New Password length must be greater than or equal to 8 characters.", minLength(8)),
    maxLength: helpers.withMessage("New Password length must be less than or equal to 20 characters.", maxLength(20)),
    $autoDirty: true
  },
  confirm_new_password: {
    required: helpers.withMessage('Confirm Password is required', required),
    sameAs: helpers.withMessage("Confirm  Password doesn't match with New Password", () => { return fields.value.new_password === fields.value.confirm_new_password }),
    $autodirty: true
  }
}

// rules.value = {
//   email: { required,email },
// }
// const submitForgotPasswordForm = async () => {
//   console.log('submitted')
//   submitted.value = true
//   loading.value = true

//   let res: any = await formSubmit()
//   console.log('res',res)
//   // if (res) {
//   //   $auth.logIn(res as UserData)
//   // }
//   loading.value = false
//   //formStep.value = 2
// }



// const checkPasswordMatch = () => {
//   if (newPassword.value !== confirmPassword.value) {
//     error.value = 'Password does not match'
//     return false
//   } else {
//     return true
//   }
// }

const backHandler = () => {
  router.push('/login')
}
const resetPassword = async () => {
  console.log('token', token)
  fields.value.token = token
  let res: any = await formSubmit()
  if (res) {
    router.push('/login')
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
