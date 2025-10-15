<template>
  <div>
    <ContentBox Contenttitle="PayOut">
      <form @submit.prevent="submitPayout(fields)">
        <div class="grid grid-cols-3 gap-4 content-start ...">
          <div>
            <div>
              <ALabel>Country</ALabel>
              <!-- <ASelect :options="countryTypeOptions" :selectObject="true" label="CombinedName" value="CountryCd"
                v-model="fields.CountryId" placeholder="Select option" class="bg-white" /> -->
              <select class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" @change="countryChanged"
                v-model="fields.CountryId">
                <option value="">Select</option>
                <option v-for="countryDetail in countryTypeOptions" :key="countryDetail.CombinedName"
                  :value="countryDetail.CountryCd">
                  {{ countryDetail.CombinedName }}
                </option>
              </select>
            </div>
            <ValidationMessage>{{ v$.CountryId?.$errors[0]?.$message }}</ValidationMessage>
            <p class="text-xs text-red-500 mt-1" v-if="errors.CountryId">{{ errors.CountryId.message }}</p>
          </div>
          <div>
            <div>
              <ALabel>Agent Name</ALabel>
              <select class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" v-model="fields.PayoutMode" @change="pagerefreshHandler()">
                <option value="">Select</option>
                <option v-for="paymentMode in selectedCountry" :key="paymentMode.Id" :value="paymentMode.Id">
                  {{ paymentMode.CombinedName }}
                </option>
              </select>
              <!-- <ASelect :options="paymentModeList" label="ParentPayAgentName" value="Id" v-model="fields.PayoutMode"
                placeholder="Select option" class="bg-white" /> -->
            </div>
            <ValidationMessage>{{ v$.PayoutMode?.$errors[0]?.$message }}</ValidationMessage>
          </div>

        </div>
        <div class="flex gap-2 mt-4 md:mt-6">
          <loader v-if="loading"></loader>
          <button v-else type="submit" class="btn">Search</button>
          <!-- <NuxtLink
            :to="{ name: '/PayoutCountry/Payment', query: { countryCd: countryDetail.CountryCd, payoutModeId: fields.PayoutMode } }"
            class="btn-secondary">
            Cancel
          </NuxtLink> -->

          <span class="text-red-500 ml-auto">*indicates mandatory fields</span>
        </div>
      </form>

    </ContentBox>
    <div class="mt-8" v-if="showCountryDetail">
      <div>
        <ContentBox Contenttitle="Payout">
          <Tab :tabMenus="tabMenus">
            <template v-slot:tab-content="{ activeTab }">
              <FormPayout :isPayout="isPayout" :countryDetail="countryDetail" :isCompleteTitle=false
                v-if="activeTab == 'Payout Details'" @deleteEvent="submitPayout" />
              <div>
                <PayoutDataMapping :countryDetail="countryDetail" v-if="activeTab == 'Payout Data Maping'"></PayoutDataMapping>
              </div>
            </template>
          </Tab>

        </ContentBox>
        <PayoutMethodTable :isPayout="isPayout" :countryDetail="countryDetail" :isCompleteTitle=false class="mt-5">
        </PayoutMethodTable>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { helpers, required, } from '@vuelidate/validators'
import { useForm } from '~/composables/useForm'
let { fields, errors, v$, rules, loading } = await useForm()
console.log('fields', fields.value)
const countryTypeOptions = ref([]);
const selectedCountry = ref([]);
const countryId = ref([])
const countryDetail = ref([])
const showCountryDetail = ref(false)
const isPayout = ref(false)
const tabMenus = [
  'Payout Details',
  'Payout Data Maping',
]
const submitPayout = async (fields: any) => {
  countryDetail.value = []
  showCountryDetail.value = false;
  if (fields.PayoutMode) {
    loading.value = true;
    let url = `/payoutdetail/get/${fields.PayoutMode}`;
    const response = await useApi(url, {
      method: 'POST',
    });
    countryDetail.value = response.Data;

    loading.value = false;
    showCountryDetail.value = true;
  }
};
const pagerefreshHandler =function(){
  showCountryDetail.value = false;
  console.log('pagerefreshHandler')
}
const loadInitialData = async () => {
  let url = '/payoutdetail/init'
  const data: any = await useApi(`${url}`)
  const response: any = data
  countryTypeOptions.value = response.Data.CountryDetails
  console.log('APi responseee', countryTypeOptions.value)
}
await loadInitialData()
rules.value = {
  CountryId: { required: helpers.withMessage("ParentPayAgentCd is required", required), $autodirty: true },
  PayoutMode: { required: helpers.withMessage('Payment mode is required', required), $autodirty: true },
}

const countryChanged = (e: any) => {
  let selectedCountryId = e.target.value;
  if (selectedCountryId)
    selectedCountry.value = countryTypeOptions.value.find(country => country.CountryCd === selectedCountryId).PayoutDetails;
  else
    selectedCountry.value = [];
};
// export { Submitpayout };
// watch(countryId,
//   (newVal) => {
//     console.log('countryId', this.paymentModeList)
//     paymentModeList.value = newVal.PayoutDetails
//     fields.value.PayoutMode = ''
//     fields.value.CountryId = newVal.Id
//   }
// )

</script>
    