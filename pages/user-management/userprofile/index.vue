<template>
  <div>
    <div class="mt-4">
      <Table :titles="{
        email: 'Email',
        staff_id: 'Staff ID',
        name: 'User Name',
        role: 'Role',
      }" :actions="['edit', 'delete']" header="User Profile" :enable-search="true" :endpoint="API.BOUSER">
        <template #additional-action="{ datum }">
          <UButton class="m-1" placement="top" data-bs-toggle="tooltip" @click="resetPassword(datum)"
            data-bs-placement="top" title="Reset Password" name="Reset Password" square color="white">
            <Icon name="material-symbols:lock-reset" class="h-4 w-4" />
          </UButton>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
let { fields, loading, errors, v$, formSubmit } = useForm('/api/account/forgotpassword/',{ needToRedirect: false, message: 'Password reset email has been sent' })

const resetPassword = async (datum: any) => {
  loading.value = true
  fields.value = { username: datum.username }
  useModal()
    .confirmAction('reset password')
    .then(async () => {
      let res: any = await formSubmit()
      console.log('res', res)
    });

}


</script>
  