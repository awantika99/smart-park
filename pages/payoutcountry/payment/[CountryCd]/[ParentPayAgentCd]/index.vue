<template>
  <div>
    <PageHeader PageHeader="Payout Country"></PageHeader>
  
  <form @submit.prevent="formSubmit">
    <ContentBox Contenttitle="PayOut Details">
      <slot>
        <div class="grid grid-cols-3 gap-4 mb-6">

          <div>
            <ALabel>Country Name</ALabel>
            <!--          <ASelect :options="roleTypeOptions" label="name" placeholder="Select option"
                               class="bg-white" />--><input class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" v-model="fields.CountryName"
                    :class="{
                  'input-error': v$.CountryName?.$error,
                }" readonly>
            <ValidationMessage>{{ v$.CountryName?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Parent Pay Agent Cd</ALabel>
            <!--          <ASelect :options="roleTypeOptions" label="name" placeholder="Select option"
                               class="bg-white" />--> <input
            class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
            v-model="fields.ParentPayAgentCd" placeholder="Username"
            :class="{
                  'input-error': v$.ParentPayAgentCd?.$error,
                }" readonly/>
<!--            <option value="">Select</option>
            <option v-for="country in payoutCountryList"
                    :key="country.ParentPayAgentCd"
                    :value="country.ParentPayAgentCd">
              {{ country.ParentPayAgentName }}
            </option>-->
            <ValidationMessage>{{ v$.ParentPayAgentCd?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Remittance Type</ALabel>
            <select
              class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" v-model="fields.RemitType"
              :class="{
                  'input-error': v$.RemitType?.$error,
                }">
              <option value="">Select</option>
              <option v-for="country in initialData?.RemitTypeDetails" :key="country.RemitType"
                      :value="country.RemitType">
                {{ country.Description }}
              </option>
            </select>
            <ValidationMessage>{{ v$.RemitType?.$errors[0]?.$message }}</ValidationMessage>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <ALabel>Main Table Details</ALabel>
            <!--          <ASelect :options="roleTypeOptions" label="name" placeholder="Select option"
                               class="bg-white" />-->
            <select
              class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" v-model="fields.MainTableId"
              :class="{
                  'input-error': v$.MainTableId?.$error,
                }">
              <option value="">Select</option>
              <option v-for="mainTable in initialData?.MainTableDetails" :key="mainTable.Id"
                      :value="mainTable.Id">
                {{ mainTable.TableName }}
              </option>
            </select>
            <ValidationMessage>{{ v$.MainTableId?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Method Type</ALabel>
            <select
              class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" v-model="fields.MethodType"
              :class="{
                  'input-error': v$.MethodType?.$error,
                }">
              <option value="">Select</option>
              <option v-for="country in initialData?.MethodTypeDetails" :key="country.MethodType"
                      :value="country.MethodType">
                {{ country.Description }}
              </option>
            </select>
            <ValidationMessage>{{ v$.MethodType?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>URL</ALabel>
            <input type="text" class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
                   v-model="fields.MethodUrl" :class="{
                  'input-error': v$.MethodUrl?.$error,
                }">
            <ValidationMessage>{{ v$.MethodUrl?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Method Name</ALabel>
            <input type="text" class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
                   v-model="fields.MethodName" :class="{
                  'input-error': v$.MethodName?.$error,
                }">
            <ValidationMessage>{{ v$.MethodName?.$errors[0]?.$message }}</ValidationMessage>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6">

          <div class="flex items-center  mt-2">

            <input v-model="fields.IsSignatureRequired" type="checkbox" :id="'toggle-IsSignatureRequired'" class="hidden"
            >
            <label :for="'toggle-IsSignatureRequired'"
                   class="flex items-center cursor-pointer" style="width: 100%">
              Is Signature
              Required

            </label>

            <!--            <div class="relative">
                          <div class="w-12 h-6 bg-gray-300 rounded-full"></div>
                          <div
                              :class="{ 'translate-x-full bg-green-500': fields.IsSignatureRequired, 'translate-x-0 bg-white': !fields.IsSignatureRequired }"
                              class="toggle__dot absolute w-6 h-6 rounded-full shadow-md inset-y-0 left-0 transform transition"></div>
                        </div>-->
            <UToggle
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              :model-value="true"
              v-model="fields.IsSignatureRequired"
            />
          </div>
          <div class="flex items-center  mt-2">

            <input v-model="fields.IsActionCdRequired" type="checkbox" :id="'toggle-IsActionCdRequired'" class="hidden" value="true"
            >
            <label :for="'toggle-IsActionCdRequired'" class="flex items-center cursor-pointer"  style="width: 100%">
              Is Action
              Required

            </label>
            <br>
            <UToggle
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              :model-value="true"
              v-model="fields.IsActionCdRequired"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <ALabel>Header Details</ALabel>
            <textarea rows="5" type="text"
                      class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
                      v-model="fields.HeaderDetail"> </textarea>
          </div>
        </div>
      </slot>
    </ContentBox>
    <ContentBox Contenttitle="">
      <UTabs :items="items" class="custom-tab-list" v-model="selectedTab">
        <template #item="{ item }">
          <UCard>
            <div v-if="item.key === 'jsonSection'" class="space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-4 mb-4">
                <div>
                  <div>
                    <ALabel for="role-name">JSON</ALabel>
                    <textarea
                      type="text"
                      rows="15"
                      class="resize bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
                      v-model="jsonFields"
                      id="role-description"/>
                  </div>
                  <button class="btn mt-4" id="role-json" @click.prevent="generateFieldMapping(item)">Generate Form
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="item.key === 'fieldMapSection'" class="space-y-3">
              <div class="overflow-x-auto">
                <table class="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                  <tr>
                    <th class="px-4 py-2 bg-gray-100 tw-300" rowspan="2">Partner Field</th>
                    <th class="px-4 py-2 bg-gray-100 tw-100" rowspan="2">Is Default</th>
                    <th class="px-4 py-2 bg-gray-100 tw-200" rowspan="2">Table</th>
                    <th class="px-4 py-2 bg-gray-100 tw-200" rowspan="2">Column</th>
                    <th class="px-4 py-2 bg-gray-100 tw-200" colspan="3">Additional Condition</th>
                    <th class="px-4 py-2 bg-gray-100 tw-400" rowspan="2">Default Value</th>
                  </tr>
                  <tr>
                    <th class="px-4 py-2 bg-gray-100 tw-200">Required</th>
                    <th class="px-4 py-2 bg-gray-100 tw-400">Function</th>
                    <th class="px-4 py-2 bg-gray-100 tw-200">DataType</th>
                  </tr>
                  </thead>
                  <FieldMapping
                    v-for="(value, innerIndex) in fields.FieldMappingConfigs"
                    :set="value.SequenceOrder = innerIndex+1"
                    :innerIndex="innerIndex"
                    :tables="initialData?.TableNames"
                    :sqlDataTypeDetails="initialData?.SqlDataTypeDetails"
                    :sqlFunctionDetails="initialData?.SqlFunctionDetails"
                    :fieldMap="value"

                  />


                </table>
              </div>
              <div class="flex gap-2 mt-4 md:mt-6">
                <button class="btn" type="submit" id="role-save">Save</button>
                <!-- <button class="btn" type="button" id="role-save-back" @click.prevent="selectedTab = 0">Back</button>
                <NuxtLink to="/user-management/userrole" class="btn-secondary" id="role-cancel">Cancel</NuxtLink> -->
              </div>
            </div>
          </UCard>

        </template>
      </UTabs>
    </ContentBox>
  </form>
  </div>
  
</template>
<script setup lang="ts">

import {useForm} from '~/composables/useForm'
import {helpers, required} from '@vuelidate/validators'
import FieldMapping from '~/pages/payoutcountry/payment/FieldMapping.vue'

let {fields, v$, rules, prePayLoad, formSubmit} = await useForm("", {
  needFormData: false,
  needToFetch: false,
  needToRedirect: true,
  redirectURl: "/redirect",
  message: "Data Updated Successfully",
  requestUrl: "/configmapping/add",
  id: null,
  hideToast: false
})
fields.value = {
  CountryName: null,
  ParentPayAgentCd: null,
  MethodName: null,
  MainTableId: null,
  RemitType: null,
  MethodUrl: null,
  HeaderDetail: null,
  MethodType: null,
  IsSignatureRequired: false,
  IsActionCdRequired: false,
  FieldMappingConfigs: [],
  SequenceOrder: 0
};
rules.value = {
  CountryName: {required: helpers.withMessage('Country is required', required), $autodirty: true},
  ParentPayAgentCd: {required: helpers.withMessage('Payout  is required', required), $autodirty: true},
  MethodName: {required: helpers.withMessage('Method name is required', required), $autodirty: true},
  MainTableId: {required: helpers.withMessage('Main table  is required', required), $autodirty: true},
  RemitType: {required: helpers.withMessage('Remit type is required', required), $autodirty: true},
  MethodUrl: {required: helpers.withMessage('Method url is required', required), $autodirty: true},
  MethodType: {required: helpers.withMessage('Method type is required', required), $autodirty: true}
}

const payoutCountryList = ref({})
/*const initPayoutData = ref({
  })*/
const initialData:any = ref({})
const selectedTab = ref(0)
const jsonFields = ref();
/*const jsonFieldss = ref(`{
    "transferRequestId": "20220216100000200",
    "instructedAmountType": "TRANSFER_TO",
    "bizSceneType": "TUITION",
    "additionalTransferDetails": {
      "payer": {
        "userName": {
          "fullName": "YAN MIN",
          "firstName": "YAN",
          "lastName": "MIN"
        },
        "certificate": {
          "certificateType": "ID_CARD",
          "certificateNo": "123456"
        },
        "userId": "xxxxxxx"
      },
      "beneficiary": {
        "userName": {
          "fullName": "EDINBURGH"
        }
      },
      "paymentBill": {
        "buyer": {
          "userName": {
            "fullName": "YAN MIN",
            "firstName": "YAN",
            "lastName": "MIN"
          },
          "birthDate": "1993-02-21"
        }
      },
      "transferFromRegion": "KR",
      "transferToRegion": "JP",
      "transferReference": "附言xxo"
    },
    "transferToAmount": {
      "currency": "JPY",
      "value": "10000"
    },
    "beneficiaryReceiptMethod": {
      "paymentMethodId": "BANK_jsonSection",
      "bankjsonSectionDetail": {
        "referenceId": "2022021019097120000000000023837"
      }
    }
  }`)*/
const items = [{
  key: 'jsonSection',
  label: 'Json Details',
}, {
  key: 'fieldMapSection',
  label: 'Generated Fields'
}]
const loadInitialData = async () => {
  try {
    var parts=window.location.pathname.split('/')
    fields.value.CountryName = parts[3];
    fields.value.ParentPayAgentCd = parts[4];
    let url = '/configmapping/init'
    const response = await useApi(url)
    initialData.value = response.Data || {};

  } catch (error) {
    console.error('Error loading initial data:', error)
  }
}

// const generateFieldMapping = function () {
//   this.fields.FieldMappingConfigs = this.flattenObject(JSON.parse(this.jsonFields))
//   this.selectedTab = 1
// }
const generateFieldMapping = function () {
  fields.value.FieldMappingConfigs= flattenObject(JSON.parse(jsonFields.value))
  selectedTab.value = 1
}

prePayLoad.value = function (): any {
  let requestObject = JSON.parse(JSON.stringify(fields.value))
  requestObject.FieldMappingConfigs.forEach((item: any, index: any) => {
    delete item.FieldMappingConfigs;
    let additionalConditions = null;
    if (item.AdditionalConditions && item.AdditionalConditions.length != 0) {
      item.AdditionalConditions.forEach((itemInner: any, indexInner: any) => {
        delete itemInner.FieldMappingConfigs;
      });
      additionalConditions = JSON.stringify(item.AdditionalConditions)
    }
    delete item.AdditionalConditions
    item["AdditionalConditions"] = additionalConditions;
  })

  return requestObject;
}
// const handleCountryChange = function (value) {
//   this.payoutCountryList = [];
//   if (value)
//     this.payoutCountryList = this.initPayoutData.Data.CountryDetails.find(item => item['CombinedName'] === value).PayoutDetails
// }


const sqlFunctionChangeCase = function (value) {
  console.log('checkbox', value)
}
const flattenObject = function (obj, path = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    console.log(key, value)
    const currentPath = path ? `${path}.${key}` : key
    let template = {
      PartnerFieldName: currentPath,
      TableMappingConfigId: null,
      FieldMappingConfigId: null,
      DefaultValue: null,
      IsDefaultValue: false,
      SequenceOrder: 0,
      SqlDataType: null,
      SqlFunction: null,
      AdditionalCondition: null,
      AdditionalConditions: [],
      MethodId: null,
      DisableColumn: false,
      DisableMasterColumn: false,
      IsAdditionalConditionRequired: false,
      FieldMappingConfig: []
    }
    if (typeof value === 'object' && value !== null) {
      return [template, ...flattenObject(value, currentPath)]
      // return [template, ...this.flattenObject(value, currentPath)]
    } else {
      return template
    }
  })
}

onMounted(() => {
  loadInitialData()
})

</script>


<style>
.custom-tab-list .relative.w-full .px-4.py-5 {
  padding: 0;
  padding-top: 10px;
}

.custom-tab-list .rounded-lg.divide-y.divide-gray-200.dark\:divide-gray-800.ring-1.ring-gray-200.dark\:ring-gray-800.shadow.bg-white.dark\:bg-gray-900 {
  border: 0 !important;
  box-shadow: none;
}


</style>

