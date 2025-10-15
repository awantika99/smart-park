<template>
    <div>
        <!-- component -->
        <div class="h-screen bg-gray-100/50 dark:bg-gray-200/50 overflow-hidden flex items-center justify-center">
            <div
                class="flex flex-col md:flex-row w-full max-w-screen-md xl:max-w-screen-lg max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div class="w-full md:w-1/2 bg-white">
                    <form class="p-12 md:p-16" @submit.prevent="submitForgotPasswordForm" v-if="formStep === 1">
                        <div
                            class="flex items-center px-4 py-3 font-bold font-mono text-3xl text-gray-900 dark:text-gray-100 mb-6 tracking-wide rounded-lg">
                            Forgot
                            Password</div>
                        <p class="mb-6  cera-regular">
                            Please enter your email to reset your password.
                        </p>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center text-lg">
                                <div class="absolute ml-3">
                                    <Icon name="ic:baseline-email" class="text-xl" />
                                </div>
                                <input v-model="fields.username" type="email"
                                    class="input-primary w-full pl-12 py-2 md:py-2" placeholder="Email" id="email" />
                            </div>
                            <ValidationMessage>{{ v$.username?.$errors[0]?.$message }}</ValidationMessage>
                            <!-- <div v-if="error" class="text-red-500">{{ error }}</div> -->
                        </div>
                        <div class="flex justify-between items-center mt-16 md:mt-10" id="btn-forgetpassword">
                            <button class="btn p-2 md:px-4 md:py-2" type="submit">Submit</button>
                            <button class="btn-secondary p-2 md:px-4 md:py-2 " type="button" @click="backHandler">
                                Back
                            </button>

                        </div>
                    </form>
                    <form class="p-8 md:p-14" v-if="formStep === 2">
                        <div class="text-3xl text-gray-900 dark:text-gray-100 font-bold font-mono mb-5 tracking-wide">Email
                            Sent</div>
                        <p class="mb-6 text-lg cera-regular">
                            Password reset email has been sent. Please check your email.
                        </p>
                        <div class="flex justify-between items-center mt-16 md:mt-10">

                            <button class="btn p-2 md:px-4 md:py-3" type="button" @click="() => { formStep-- }">
                                Resend
                            </button>
                            <p class="text-red-700 dark:text-blue-600 font-medium cursor-pointer" @click="backHandler()">
                                Login ?</p>

                        </div>
                    </form>
                </div>
                <uilayout></uilayout>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { required, email, helpers, sameAs, minLength } from '@vuelidate/validators'
let { fields, loading, errors, v$, rules, formSubmit } = await useForm('/api/Account/forgotpassword', { needToRedirect: false, hideToast: true })
const router = useRouter()
const formStep = ref(1)
definePageMeta({ layout: false, auth: false })
const submitted = ref(false)
//fields.value = { username: '', password: '' }


rules.value = {
    username: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Email Must be valid email address", email)
    }
}

const backHandler = () => {
    router.push('/login')
}
const submitForgotPasswordForm = async () => {
    submitted.value = true
    loading.value = true
    let res: any = await formSubmit()
    console.log('forgetpassword', res)
    //router.push('/resetPassword')
    loading.value = false
    if (res) {
        formStep.value = 2
    }
}

</script>
  
<style>
body {
    margin: 0;
}
</style>
  