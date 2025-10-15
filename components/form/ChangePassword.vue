<template>
  <UModal v-model="isOpenModal" @close="closeModal()" v-bind:prevent-close="forceChangePassword"
    :ui="{ padding: 'p-16 sm:p-32', overlay: { background: forceChangePassword ? 'bg-gray-200/95 dark:bg-gray-800/95' : 'bg-gray-200/75 dark:bg-gray-800/75' } }">
    <UCard class="card-primary">
      <template #header>
        <div data-testid="ChangeModal" class="custom-header">
          <b>Change Password</b>
          <Icon v-if="!forceChangePassword" name="material-symbols:close" @click="closeModal()"
            class="absolute float-right top-2 right-2 w-5 h-5" />
        </div>
      </template>
      <div>
        <div>
          <!-- <DetailBox title="Banner: Create"> -->
          <form @submit.prevent="submitUpdateForm()">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-4">
              <div>
                <ALabel>Current Password</ALabel>
                <PasswordInput placeholder="Current Password" v-model="fields.old_password" autocomplete="off" />
                <ValidationMessage>{{ v$.old_password?.$errors[0]?.$message }}</ValidationMessage>
              </div>
              <div>
                <ALabel>New Password</ALabel>
                <PasswordInput placeholder="New Password" v-model="fields.new_password" autocomplete="off" />
                <ValidationMessage>{{ v$.new_password?.$errors[0]?.$message }}</ValidationMessage>
              </div>
              <div>
                <ALabel>Confirm New Password</ALabel>
                <PasswordInput placeholder="Confirm New Password" v-model="fields.confirm_new_password"
                  autocomplete="off" />
                <ValidationMessage>{{ v$.confirm_new_password?.$errors[0]?.$message }}</ValidationMessage>
              </div>
            </div>
            <div class="flex gap-2 mt-4 md:mt-6">
              <loader v-if="loading"></loader>
              <button v-else class="btn" type="submit">
                Change Password
              </button>
              <button v-if="forceChangePassword" @click="logout()"
                class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100" type="button" id="btn">
                Logout
              </button>
              <NuxtLink v-if="!forceChangePassword" @click="closeModal()" id="cancel"
                class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">Cancel</NuxtLink>
            </div>
          </form>
          <!-- </DetailBox> -->
        </div>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
const emit = defineEmits(['closeModal'])
const isOpenModal = ref(false)
const { $auth } = useNuxtApp()
const config = useRuntimeConfig()
let { fields, loading, errors, rules, v$, formSubmit } = useForm('/manage/change-password/', { needToRedirect: false, message: 'Password Changed Successfully' })

const props = defineProps({
  isOpenModal: {
    type: Boolean,
    default: false,
  },
  editingId: {
    type: Number,
    default: false,
  },
  forceChangePassword: {
    type: Boolean,
    default: false
  }
})
watch(
  () => props.isOpenModal,
  (newData) => {
    isOpenModal.value = newData
    fields.value = {}
  }
)
// rules.value = {
//   old_password: { required: helpers.withMessage('Current Password is required', required), $autodirty: true },
//   new_password: {
//     required: helpers.withMessage("New Password is required", required),
//     sameAs: helpers.withMessage("New Password can't be same as Current Password", () => { return fields.value.old_password != fields.value.new_password }),
//     containsPasswordRequirement: helpers.withMessage(
//       () => `New Password must contain an uppercase, lowercase, number and special character`,
//       helpers.regex(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/)),
//     minLength: helpers.withMessage("New Password length must be greater than or equal to 8 characters.", minLength(8)),
//     maxLength: helpers.withMessage("New Password length must be less than or equal to 20 characters.", maxLength(20)),
//     $autoDirty: true
//   },
//   confirm_new_password: {
//     required: helpers.withMessage('Confirm New Password is required', required),
//     sameAs: helpers.withMessage("Confirm New Password doesn't match with New Password", () => { return fields.value.new_password === fields.value.confirm_new_password }),
//     $autodirty: true
//   }
// }

const submitUpdateForm = async () => {
  if (await formSubmit()) {
    emit('closeModal')
    $auth.logOut()
  }
  // console.log('errors.value',errors.value)
  // if (Object.keys(errors.value).length === 0) {
  //   emit('closeModal')
  // }
}
const logout = () => {
  $auth.logOut()
}
const closeModal = async () => {
  isOpenModal.value = false
  emit('closeModal')
  v$.value.$reset()
}
</script>
  
<style scoped>
.custom-modal {
  overflow-y: auto;
}
</style>
  