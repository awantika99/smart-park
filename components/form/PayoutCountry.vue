<template>
  <div>
    <DetailBox :title="'Payout Country'">
      <form @submit.prevent="formSubmit()">
        <div class="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8">
          <div>
            <div>
              <label>Country<span class="text-red-500">*</span></label>
              <ASelect :options="bannerTypeOptions" :selectObject="true" label="Text" value="Id" v-model="country"
                placeholder="Select option" class="bg-white" />
            </div>
             <ValidationMessage>{{ v$.CountryId?.$errors[0]?.$message }}</ValidationMessage>
              <p class="text-xs text-red-500 mt-1" v-if="errors.CountryId">{{ errors.CountryId.message }}</p>
          </div>
          <div>
            <div>
              <label>Payment Mode<span class="text-red-500">*</span></label>
              <ASelect :options="paymentModeList" label="Text" value="Id" v-model="fields.PayoutMode"
                placeholder="Select option" class="bg-white" />
            </div>
            <ValidationMessage>{{ v$.PayoutMode?.$errors[0]?.$message }}</ValidationMessage>

          </div>
          <div>
            <div>
              <label>Amount Max Limit <span class="text-red-500">*</span></label>
              <input type="text" class="input-primary mt-1" v-model="fields.MaxLimit" />
            </div>
            <ValidationMessage>{{ v$.MaxLimit?.$errors[0]?.$message }}</ValidationMessage>
            <p class="text-xs text-red-500 mt-1" v-if="errors.MaxLimit">{{ errors.MaxLimit.message }}</p>
          </div>
          <div>
          </div>
        </div>
        <div>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-8">
          <label>Enter your information ( Account related guideline information)</label>
          <TextEditor v-model="fields.Message"> </TextEditor>
        </div>
        </div>
        <div class="flex gap-2 mt-4 md:mt-6">
          <loader v-if="loading"></loader>
          <button v-else class="btn" type="submit">Save</button>
          <NuxtLink to="/configuration/bank" class="btn-secondary">
            Cancel</NuxtLink>
        </div>
      </form>
    </DetailBox>
  </div>
</template>
<script setup lang="ts">
const {fields, v$, rules, errors,loading, formSubmit} = useForm(API.PAYOUT_COUNTRY, {needToRedirect:false})
const bannerTypeOptions = ref([])
const paymentModeList = ref([])
const country=ref({})
import { required,helpers } from '@vuelidate/validators';
rules.value = {
    CountryId: {required:helpers.withMessage('Country is required', required), $autodirty: true},
    PayoutMode: {required:helpers.withMessage('Payment mode is required', required), $autodirty: true},
    MaxLimit: {required:helpers.withMessage('Amount Max Limit is required', required), $autodirty: true},
}
const loadInitialData = async (search = '') => {
      let url = '/remit/list/country/excrate'
      const data: any = await useApi(`${url}`)
      const response: any = data
      console.log('response',response)
      bannerTypeOptions.value = response
  }

 await loadInitialData()

 const countryChanged=(e:any)=>{
  console.log('changed',e.target.value)
 }
 watch(country,
  (newVal) => {
    paymentModeList.value = newVal.PayoutModes
    fields.value.PayoutMode = ''
    fields.value.CountryId = newVal.Id
  }
)
</script>
  