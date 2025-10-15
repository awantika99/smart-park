<template>
  <div>
    <DetailBox title="User Profile">
      <form @submit.prevent="formSubmit()">
        <div class="grid grid-cols-3 gap-4 content-start ...">
          <div>
            <div>
              <ALabel>User Role</ALabel>
              <ASelect :options="roleTypeOptions" label="name" v-model="fields.role" placeholder="Select option"
                class="bg-white" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.type">{{ errors.type.message }}</p>
            <ValidationMessage>{{ v$.role?.$errors[0]?.$message }}</ValidationMessage>
          </div>

        </div>

        <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
          <div>
            <div>
              <ALabel>Name</ALabel>
              <input type="text" class="input-primary mt-1" v-model="fields.name" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.name">{{ errors.name.message }}</p>
            <ValidationMessage>{{ v$.name?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <div>
              <ALabel>Email</ALabel>
              <input type="text" class="input-primary mt-1" v-model="fields.email" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.email">{{ errors.email.message }}</p>
            <ValidationMessage>{{ v$.email?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <div>
              <ALabel>Department</ALabel>
              <input type="text" class="input-primary mt-1" v-model="fields.department" />
              <!-- <MobileNumberInput v-model="fields.department" class="bg-white mb-2"></MobileNumberInput> -->
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.department">{{ errors.department.message }}</p>
            <ValidationMessage>{{ v$.department?.$errors[0]?.$message }}</ValidationMessage>
          </div>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
          <div>
            <div>
              <ALabel>Staff Id</ALabel>
              <input type="text" class="input-primary mt-1" v-model="fields.staff_id" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.staff_id">{{ errors.staff_id.message }}</p>
            <ValidationMessage>{{ v$.staff_id?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <div>
              <ALabel>Password Expiry Days</ALabel>
              <input type="number" class="input-primary mt-1" v-model="fields.password_expiry" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.password_expiry">{{
              errors.password_expiry.message }}</p>
            <ValidationMessage>{{ v$.password_expiry?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <div>
              <ALabel>Designation</ALabel>
              <input type="text" class="input-primary mt-1" v-model="fields.designation" />
            </div>
            <p class="text-xs text-red-500 mt-1" v-if="errors.designation">{{ errors.designation.message }}</p>
            <ValidationMessage>{{ v$.designation?.$errors[0]?.$message }}</ValidationMessage>
          </div>
        </div>


        <div class="flex gap-2 mt-4 md:mt-6">
          <button class="btn" type="submit">Save</button>
          <NuxtLink to="/user-management/userprofile"
            class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">Cancel</NuxtLink>
          <span class="text-red-500 ml-auto">*indicates mandatory fields</span>
        </div>
      </form>
    </DetailBox>
  </div>
</template>
<script setup lang="ts">
import { helpers, required, } from '@vuelidate/validators'
import { useForm } from '~/composables/useForm'
let { fields, errors, v$, rules, formSubmit } = await useForm(API.BOUSER)
console.log('fields', fields.value)
const statusTypeOptions = [
  { label: 'Active', id: 'Active' },
  { label: 'Inactive', id: 'Inactive' },
  { label: 'Blocked', id: 'Blocked' },
  { label: 'Suspended', id: 'Suspended' },
  { label: 'Deleted', id: 'Deleted' },
]
const roleTypeOptions = ref([])

const loadInitialData = async () => {
  let url = '/api/users/init'
  const data: any = await useApi(`${url}`)
  const response: any = data
  roleTypeOptions.value = response.data.roles
  console.log('APi responseee', roleTypeOptions.value)
}
loadInitialData()
rules.value = {
  role: { required: helpers.withMessage("User type is required", required), $autodirty: true },
  department: { required: helpers.withMessage("User id is required", required), $autodirty: true },
  name: { required: helpers.withMessage("Name is required", required), $autodirty: true },
  email: { required: helpers.withMessage("Phone Number is required", required), $autodirty: true },
  staff_id: { required: helpers.withMessage("Staff id is required", required), $autodirty: true },
  password_expiry: { required: helpers.withMessage("Password change Period  is required", required), $autodirty: true },
  designation: { required: helpers.withMessage("Designation is required", required), $autodirty: true },
 
}
</script>
  