<template>
  <div>
    <div class="mt-4">
      <Table :titles="{
        name: 'Name',
        description: 'Description',
        is_active: 'Active',
        updated_at: 'Update Date'
      }" :actions="['edit', 'delete']" :enable-search="true" :endpoint="API.BOROLE">
        <template #is_active="{ datum }">
          {{ datum.is_active ? 'Yes' : 'No' }}
        </template>
        <template #updated_at="{ datum }">
          {{ formatDate(datum.updated_at, hasTime = true) }}
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
let { fields, loading, errors, v$, formSubmit } = useForm('/api/account/forgotpassword/', { needToRedirect: false, message: 'Password reset email has been sent' })
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
    