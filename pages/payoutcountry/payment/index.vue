<template>
  <div>
    <PageHeader PageHeader="Payout Country" backURL="/payout"></PageHeader>
    <form @submit.prevent="formSubmit">
    <ContentBox Contenttitle="PayOut Details">
      <slot>
        <div class="grid grid-cols-3 gap-4 mb-6">

          <div>
            <ALabel>Country Name</ALabel>
            <!--          <ASelect :options="roleTypeOptions" label="name" placeholder="Select option"
                               class="bg-white" />-->
            <select class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
                    @change="handleCountryChange(fields.CountryName)" v-model="fields.CountryName"
                    placeholder="Username"
                    :class="{
                  'input-error': v$.CountryName?.$error,
                }">
              <option value="">Select</option>
              <option v-for="countryDetail in initPayoutData.Data.CountryDetails" :key="countryDetail.CombinedName"
                      :value="countryDetail.CombinedName">
                {{ countryDetail.CombinedName }}


              </option>
            </select>

            <ValidationMessage>{{ v$.CountryName?.$errors[0]?.$message }}</ValidationMessage>
          </div>
          <div>
            <ALabel>Parent Pay Agent Cd</ALabel>
            <!--          <ASelect :options="roleTypeOptions" label="name" placeholder="Select option"
                               class="bg-white" />--> <select
              class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"
              v-model="fields.ParentPayAgentCd" placeholder="Username"
              :class="{
                  'input-error': v$.ParentPayAgentCd?.$error,
                }">
            <option value="">Select</option>
            <option v-for="country in payoutCountryList"
                    :key="country.ParentPayAgentCd"
                    :value="country.ParentPayAgentCd">
              {{ country.ParentPayAgentName }}
            </option>
          </select>


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
              <option v-for="country in initialData?.Data?.RemitTypeDetails" :key="country.RemitType"
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
              <option v-for="mainTable in initialData?.Data?.MainTableDetails" :key="mainTable.Id"
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
              <option v-for="country in initialData?.Data?.MethodTypeDetails" :key="country.MethodType"
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
                      :tables="initialData.Data.TableNames"
                      :sqlDataTypeDetails="initialData.Data.SqlDataTypeDetails"
                      :sqlFunctionDetails="initialData.Data.SqlFunctionDetails"
                      :fieldMap="value"

                  />


                </table>
              </div>
              <div class="flex gap-2 mt-4 md:mt-6">
                <button class="btn" type="submit" id="role-save">Save</button>
                <!-- <button class="btn" type="button" id="role-save-back" @click.prevent="selectedTab = 0">Back</button>
                <NuxtLink to="" class="btn-secondary" id="role-cancel">Cancel</NuxtLink> -->
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
  message: "Saved SuccessFully",
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
const initPayoutData = ref({
  'Data': {
    'CountryDetails': [
      {
        'CountryCd': 'AE',
        'CountryName': 'United Arab Emirates',
        'CombinedName': 'AE - United Arab Emirates',
        'PayoutDetails': [
          {
            'Id': '9d64af91-3274-4c31-8c95-255c2bfa0358',
            'ParentPayAgentCd': 'AE0003',
            'ParentPayAgentName': 'Instant Cash',
            'CombinedName': 'AE0003 - Instant Cash'
          },
          {
            'Id': 'bbf98e30-8747-4e3c-81ec-7fb1b71eafda',
            'ParentPayAgentCd': 'AE0001',
            'ParentPayAgentName': 'Lari Exchange UAE',
            'CombinedName': 'AE0001 - Lari Exchange UAE'
          }
        ]
      },
      {
        'CountryCd': 'AU',
        'CountryName': 'Australia',
        'CombinedName': 'AU - Australia',
        'PayoutDetails': [
          {
            'Id': '5fba454e-db01-46ef-b8e5-09c766a929e2',
            'ParentPayAgentCd': 'AU0005',
            'ParentPayAgentName': 'BRDGEPAY AUSTRALIA PTE LTD',
            'CombinedName': 'AU0005 - BRDGEPAY AUSTRALIA PTE LTD'
          },
          {
            'Id': '75ca2513-79d9-4e6b-ab9b-53d5ef7ace40',
            'ParentPayAgentCd': 'AU0001',
            'ParentPayAgentName': 'Orbit AU',
            'CombinedName': 'AU0001 - Orbit AU'
          },
          {
            'Id': '426d85a6-dc82-4eff-8a2b-963523a35d67',
            'ParentPayAgentCd': 'AU0004',
            'ParentPayAgentName': 'AUS Remit',
            'CombinedName': 'AU0004 - AUS Remit'
          },
          {
            'Id': '553095e7-8ac5-40c0-83cc-b9c4c59543e0',
            'ParentPayAgentCd': 'AU0006',
            'ParentPayAgentName': 'Thunes',
            'CombinedName': 'AU0006 - Thunes'
          },
          {
            'Id': 'cebe65e2-0394-4310-8588-e12fb52bb2dd',
            'ParentPayAgentCd': 'AU0007',
            'ParentPayAgentName': 'SINGX AUSTRALIA',
            'CombinedName': 'AU0007 - SINGX AUSTRALIA'
          }
        ]
      },
      {
        'CountryCd': 'BD',
        'CountryName': 'Bangladesh',
        'CombinedName': 'BD - Bangladesh',
        'PayoutDetails': [
          {
            'Id': '91478550-d0c8-4573-af87-4a1b724762e1',
            'ParentPayAgentCd': 'BD0014',
            'ParentPayAgentName': 'Eastern Bank',
            'CombinedName': 'BD0014 - Eastern Bank'
          },
          {
            'Id': 'd9e23f1b-ed52-49b9-97f8-530198d79830',
            'ParentPayAgentCd': 'BD0009',
            'ParentPayAgentName': 'PUBALI BANK',
            'CombinedName': 'BD0009 - PUBALI BANK'
          },
          {
            'Id': '8d0460bf-cacb-4204-9206-6111f8626db5',
            'ParentPayAgentCd': 'BD0006',
            'ParentPayAgentName': 'JanataBank',
            'CombinedName': 'BD0006 - JanataBank'
          },
          {
            'Id': 'c7ca9820-4f1e-4a77-b423-6157ffda1eda',
            'ParentPayAgentCd': 'BD0003',
            'ParentPayAgentName': 'Bkash',
            'CombinedName': 'BD0003 - Bkash'
          },
          {
            'Id': '309d3a9d-0649-4822-a45a-c85a10534c45',
            'ParentPayAgentCd': 'BD0001',
            'ParentPayAgentName': 'Brac Bank',
            'CombinedName': 'BD0001 - Brac Bank'
          }
        ]
      },
      {
        'CountryCd': 'CN',
        'CountryName': 'China',
        'CombinedName': 'CN - China',
        'PayoutDetails': [
          {
            'Id': 'a5c47c09-a4bc-4fb4-8f64-18740a7da0ab',
            'ParentPayAgentCd': 'CN0005',
            'ParentPayAgentName': 'AliPay',
            'CombinedName': 'CN0005 - AliPay'
          },
          {
            'Id': 'd3ca4d2f-d3e3-4c34-b663-286e778788c6',
            'ParentPayAgentCd': 'CN0009',
            'ParentPayAgentName': 'Tencent',
            'CombinedName': 'CN0009 - Tencent'
          },
          {
            'Id': '6c65a651-18d9-44b3-a300-36e64fdd0f8d',
            'ParentPayAgentCd': 'CN0007',
            'ParentPayAgentName': 'Thunes',
            'CombinedName': 'CN0007 - Thunes'
          },
          {
            'Id': '4841ea41-5927-45e4-822c-45c2374284b0',
            'ParentPayAgentCd': 'CN0006',
            'ParentPayAgentName': 'AUS Remit China',
            'CombinedName': 'CN0006 - AUS Remit China'
          },
          {
            'Id': 'a2357e45-0671-4178-bca2-4c4b355c5280',
            'ParentPayAgentCd': 'CN0008',
            'ParentPayAgentName': 'TerraPay Payment',
            'CombinedName': 'CN0008 - TerraPay Payment'
          },
          {
            'Id': '6704251c-c2db-4505-a773-a754d5035c8a',
            'ParentPayAgentCd': 'CN0004',
            'ParentPayAgentName': 'MONEYSWAP',
            'CombinedName': 'CN0004 - MONEYSWAP'
          }
        ]
      },
      {
        'CountryCd': 'HK',
        'CountryName': 'Hong Kong',
        'CombinedName': 'HK - Hong Kong',
        'PayoutDetails': [
          {
            'Id': '716b3fc8-7abd-496c-8656-3f3d1cee1ef1',
            'ParentPayAgentCd': 'HK0006',
            'ParentPayAgentName': 'SINGX HONGKONG',
            'CombinedName': 'HK0006 - SINGX HONGKONG'
          },
          {
            'Id': '2e88b460-1d2a-46cd-afb7-d251b6c165ae',
            'ParentPayAgentCd': 'HK0005',
            'ParentPayAgentName': 'Thunes',
            'CombinedName': 'HK0005 - Thunes'
          }
        ]
      },
      {
        'CountryCd': 'ID',
        'CountryName': 'Indonesia',
        'CombinedName': 'ID - Indonesia',
        'PayoutDetails': [
          {
            'Id': 'd9750f8c-70cc-43e9-9934-1293caac5ee8',
            'ParentPayAgentCd': 'ID0002',
            'ParentPayAgentName': 'BNI',
            'CombinedName': 'ID0002 - BNI'
          },
          {
            'Id': '82fd5a8c-41cf-4d25-aa7d-9352df4be219',
            'ParentPayAgentCd': 'ID0001',
            'ParentPayAgentName': 'BRI',
            'CombinedName': 'ID0001 - BRI'
          },
          {
            'Id': '0a9a3b7f-5536-4b86-9d3f-a7e99720a233',
            'ParentPayAgentCd': 'ID0007',
            'ParentPayAgentName': 'DOKU',
            'CombinedName': 'ID0007 - DOKU'
          },
          {
            'Id': 'a21fa053-b1de-4c58-a37b-e354304c5a30',
            'ParentPayAgentCd': 'ID0009',
            'ParentPayAgentName': 'ArtaJasa',
            'CombinedName': 'ID0009 - ArtaJasa'
          },
          {
            'Id': '0e0eac7c-3212-4c7a-a576-eb0bb26172c1',
            'ParentPayAgentCd': 'ID0008',
            'ParentPayAgentName': 'Jatim Bank',
            'CombinedName': 'ID0008 - Jatim Bank'
          }
        ]
      },
      {
        'CountryCd': 'IN',
        'CountryName': 'India',
        'CombinedName': 'IN - India',
        'PayoutDetails': [
          {
            'Id': '2e3c1d57-7b65-4b8c-8059-88645924b950',
            'ParentPayAgentCd': 'IN0003',
            'ParentPayAgentName': 'ICICI Bank',
            'CombinedName': 'IN0003 - ICICI Bank'
          },
          {
            'Id': 'd7d386b6-a7cd-4cd4-ab36-acfb0e4da512',
            'ParentPayAgentCd': 'IN0007',
            'ParentPayAgentName': 'NPCI',
            'CombinedName': 'IN0007 - NPCI'
          },
          {
            'Id': 'a4e8b3b1-c50f-434e-b96d-cd3dbcaf9972',
            'ParentPayAgentCd': 'IN0006',
            'ParentPayAgentName': 'HDFC',
            'CombinedName': 'IN0006 - HDFC'
          },
          {
            'Id': '11a805b7-24a4-4df8-8770-d4edbe477826',
            'ParentPayAgentCd': 'IN0004',
            'ParentPayAgentName': 'RoyalExchangeIndia',
            'CombinedName': 'IN0004 - RoyalExchangeIndia'
          },
          {
            'Id': '44e31235-0a24-4b37-a0c0-ece10ddab5c6',
            'ParentPayAgentCd': 'IN0005',
            'ParentPayAgentName': 'YesBank',
            'CombinedName': 'IN0005 - YesBank'
          }
        ]
      },
      {
        'CountryCd': 'KH',
        'CountryName': 'Cambodia',
        'CombinedName': 'KH - Cambodia',
        'PayoutDetails': [
          {
            'Id': 'ca240646-53e5-4352-9691-067e154fd318',
            'ParentPayAgentCd': 'KH0002',
            'ParentPayAgentName': 'LY Hour Cambodia',
            'CombinedName': 'KH0002 - LY Hour Cambodia'
          },
          {
            'Id': '44a130fe-87a5-4785-80a1-0d90f6c6626a',
            'ParentPayAgentCd': 'KH0003',
            'ParentPayAgentName': 'WING',
            'CombinedName': 'KH0003 - WING'
          },
          {
            'Id': '92ad19c5-d198-4b30-a1de-bac4453174a1',
            'ParentPayAgentCd': 'KH0001',
            'ParentPayAgentName': 'LY Hour Cambodia',
            'CombinedName': 'KH0001 - LY Hour Cambodia'
          }
        ]
      },
      {
        'CountryCd': 'LK',
        'CountryName': 'Sri Lanka',
        'CombinedName': 'LK - Sri Lanka',
        'PayoutDetails': [
          {
            'Id': '40f99df3-98c8-4feb-a406-65fde4a8f4ed',
            'ParentPayAgentCd': 'LK0002',
            'ParentPayAgentName': 'Sampath Bank',
            'CombinedName': 'LK0002 - Sampath Bank'
          }
        ]
      },
      {
        'CountryCd': 'MM',
        'CountryName': 'Myanmar',
        'CombinedName': 'MM - Myanmar',
        'PayoutDetails': [
          {
            'Id': 'c89d50fe-da62-4f7c-a45a-98ed474591cb',
            'ParentPayAgentCd': 'MM0004',
            'ParentPayAgentName': 'CBBank',
            'CombinedName': 'MM0004 - CBBank'
          }
        ]
      },
      {
        'CountryCd': 'MU',
        'CountryName': 'Mauritius',
        'CombinedName': 'MU - Mauritius',
        'PayoutDetails': [
          {
            'Id': '443a0824-f4ab-499c-96bc-04ec4b9a3a36',
            'ParentPayAgentCd': 'MU0002',
            'ParentPayAgentName': 'TerraPay Payment',
            'CombinedName': 'MU0002 - TerraPay Payment'
          }
        ]
      },
      {
        'CountryCd': 'MY',
        'CountryName': 'Malaysia',
        'CombinedName': 'MY - Malaysia',
        'PayoutDetails': [
          {
            'Id': '812bc8d0-7aac-4da7-bec7-0301370682b5',
            'ParentPayAgentCd': 'MY0007',
            'ParentPayAgentName': 'OZOPAY',
            'CombinedName': 'MY0007 - OZOPAY'
          },
          {
            'Id': 'fd918751-5d3d-41ef-902d-a134ee614ed8',
            'ParentPayAgentCd': 'MY0020',
            'ParentPayAgentName': 'AmBank Payment',
            'CombinedName': 'MY0020 - AmBank Payment'
          }
        ]
      },
      {
        'CountryCd': 'NP',
        'CountryName': 'Nepal',
        'CombinedName': 'NP - Nepal',
        'PayoutDetails': [
          {
            'Id': 'db92fec7-f4c6-46a9-ab48-07d9b02e68de',
            'ParentPayAgentCd': 'NP0007',
            'ParentPayAgentName': 'CTEXPRESS NEPAL',
            'CombinedName': 'NP0007 - CTEXPRESS NEPAL'
          },
          {
            'Id': '62bb167c-5e9b-481f-9cf5-517785b995d8',
            'ParentPayAgentCd': 'NP0006',
            'ParentPayAgentName': 'BestRemit',
            'CombinedName': 'NP0006 - BestRemit'
          },
          {
            'Id': 'cb7d821e-c027-4648-8100-671218da5273',
            'ParentPayAgentCd': 'NP0005',
            'ParentPayAgentName': 'Himal Remit',
            'CombinedName': 'NP0005 - Himal Remit'
          },
          {
            'Id': '731e1600-80e7-4ad3-ba86-b232eb168cd9',
            'ParentPayAgentCd': 'NP0008',
            'ParentPayAgentName': 'IPay Nepal',
            'CombinedName': 'NP0008 - IPay Nepal'
          },
          {
            'Id': '4d800666-887a-4965-a89d-e47229998838',
            'ParentPayAgentCd': 'NP0004',
            'ParentPayAgentName': 'IME',
            'CombinedName': 'NP0004 - IME'
          },
          {
            'Id': 'a334104c-26d0-41d4-93d1-eb3e347dfa50',
            'ParentPayAgentCd': 'NP0003',
            'ParentPayAgentName': 'Prabhu Money ',
            'CombinedName': 'NP0003 - Prabhu Money '
          }
        ]
      },
      {
        'CountryCd': 'NZ',
        'CountryName': 'New Zealand',
        'CombinedName': 'NZ - New Zealand',
        'PayoutDetails': [
          {
            'Id': 'e54da13b-11a6-4e6b-9809-06974cb4d355',
            'ParentPayAgentCd': 'NZ0001',
            'ParentPayAgentName': 'Orbit NZ',
            'CombinedName': 'NZ0001 - Orbit NZ'
          }
        ]
      },
      {
        'CountryCd': 'PH',
        'CountryName': 'Philippines',
        'CombinedName': 'PH - Philippines',
        'PayoutDetails': [
          {
            'Id': '2540bbd5-ad6d-4b0a-aca6-15a70debb2d3',
            'ParentPayAgentCd': 'PH0010',
            'ParentPayAgentName': 'BDO Bank',
            'CombinedName': 'PH0010 - BDO Bank'
          },
          {
            'Id': 'c0afd0b8-12b3-4059-b5d3-82169e135b3d',
            'ParentPayAgentCd': 'PH0001',
            'ParentPayAgentName': 'IREMIT INC',
            'CombinedName': 'PH0001 - IREMIT INC'
          },
          {
            'Id': 'e5a00c27-e213-4af8-8253-ae8c4474ee83',
            'ParentPayAgentCd': 'PH0003',
            'ParentPayAgentName': 'Metro Bank',
            'CombinedName': 'PH0003 - Metro Bank'
          },
          {
            'Id': '03dc14d3-37c9-4010-8a60-bb6ac281c3c6',
            'ParentPayAgentCd': 'PH0006',
            'ParentPayAgentName': 'EEC',
            'CombinedName': 'PH0006 - EEC'
          },
          {
            'Id': 'c6f69ea8-9544-4c3e-9522-d2f6e172d58b',
            'ParentPayAgentCd': 'PH0008',
            'ParentPayAgentName': 'BC Remit',
            'CombinedName': 'PH0008 - BC Remit'
          }
        ]
      },
      {
        'CountryCd': 'PK',
        'CountryName': 'Pakistan',
        'CombinedName': 'PK - Pakistan',
        'PayoutDetails': [
          {
            'Id': '1ab61177-486a-442f-9032-3ceec20047c4',
            'ParentPayAgentCd': 'PK0004',
            'ParentPayAgentName': 'BANK OF PUNJAB',
            'CombinedName': 'PK0004 - BANK OF PUNJAB'
          },
          {
            'Id': '2cd4c278-c0c8-4039-8965-4b16bae8eb20',
            'ParentPayAgentCd': 'PK0006',
            'ParentPayAgentName': 'BANK AL HABIB',
            'CombinedName': 'PK0006 - BANK AL HABIB'
          },
          {
            'Id': '58ee4bb8-9cd9-47e8-97fa-4d58fc14e810',
            'ParentPayAgentCd': 'PK0005',
            'ParentPayAgentName': 'UBL',
            'CombinedName': 'PK0005 - UBL'
          },
          {
            'Id': 'ff378128-b6a8-40ab-a809-8a13d5901167',
            'ParentPayAgentCd': 'PK0002',
            'ParentPayAgentName': 'MCBPakistan',
            'CombinedName': 'PK0002 - MCBPakistan'
          }
        ]
      },
      {
        'CountryCd': 'SG',
        'CountryName': 'Singapore',
        'CombinedName': 'SG - Singapore',
        'PayoutDetails': [
          {
            'Id': 'df0dc20b-e6fa-4a27-8306-3ac4ab15924c',
            'ParentPayAgentCd': 'SG0008',
            'ParentPayAgentName': 'AliPay Student',
            'CombinedName': 'SG0008 - AliPay Student'
          },
          {
            'Id': 'd331f450-ecdd-4be1-bd9e-834f355fccf9',
            'ParentPayAgentCd': 'SG0005',
            'ParentPayAgentName': 'BRDGEPAY PTE LTD ',
            'CombinedName': 'SG0005 - BRDGEPAY PTE LTD '
          },
          {
            'Id': 'd7aa6700-0307-4a42-b4e8-abe3261e0a59',
            'ParentPayAgentCd': 'SG0002',
            'ParentPayAgentName': 'KLIQ',
            'CombinedName': 'SG0002 - KLIQ'
          }
        ]
      },
      {
        'CountryCd': 'TH',
        'CountryName': 'Thailand',
        'CombinedName': 'TH - Thailand',
        'PayoutDetails': [
          {
            'Id': 'c5ab5922-1fe4-44ee-958c-6a95c8ba0fad',
            'ParentPayAgentCd': 'TH0002',
            'ParentPayAgentName': 'SawasdeeShop',
            'CombinedName': 'TH0002 - SawasdeeShop'
          },
          {
            'Id': '6097d6cb-4680-46e9-b347-d88de92e8075',
            'ParentPayAgentCd': 'TH0003',
            'ParentPayAgentName': 'ThunesTH',
            'CombinedName': 'TH0003 - ThunesTH'
          }
        ]
      },
      {
        'CountryCd': 'UK',
        'CountryName': null,
        'CombinedName': 'UK - ',
        'PayoutDetails': [
          {
            'Id': '47c723d5-0bae-4c6d-9325-383ed86cd164',
            'ParentPayAgentCd': 'UK0014',
            'ParentPayAgentName': 'ThunesEuroCorridor',
            'CombinedName': 'UK0014 - ThunesEuroCorridor'
          },
          {
            'Id': 'e49c9d12-185b-4b96-a38c-5f12f787d64e',
            'ParentPayAgentCd': 'UK0003',
            'ParentPayAgentName': 'Orbit UK',
            'CombinedName': 'UK0003 - Orbit UK'
          },
          {
            'Id': 'beabcab6-4f6a-4cbb-a3ac-7ab7e0475cc5',
            'ParentPayAgentCd': 'UK0011',
            'ParentPayAgentName': 'TerraPay Payment UK',
            'CombinedName': 'UK0011 - TerraPay Payment UK'
          },
          {
            'Id': 'c03d541c-3831-4574-bce4-7e1ebae07526',
            'ParentPayAgentCd': 'UK0004',
            'ParentPayAgentName': 'Small World',
            'CombinedName': 'UK0004 - Small World'
          },
          {
            'Id': '32ebe3b8-3c6d-47db-ba47-c785269fd02a',
            'ParentPayAgentCd': 'UK0009',
            'ParentPayAgentName': 'Thunes',
            'CombinedName': 'UK0009 - Thunes'
          }
        ]
      },
      {
        'CountryCd': 'US',
        'CountryName': 'United States',
        'CombinedName': 'US - United States',
        'PayoutDetails': [
          {
            'Id': '94d28a15-0b1f-47cd-baf7-868bb4d3ca3b',
            'ParentPayAgentCd': 'US0005',
            'ParentPayAgentName': 'Thunes',
            'CombinedName': 'US0005 - Thunes'
          },
          {
            'Id': '89bac0a3-5f53-4b40-8581-99f49861efe1',
            'ParentPayAgentCd': 'US0002',
            'ParentPayAgentName': 'Orbit US',
            'CombinedName': 'US0002 - Orbit US'
          }
        ]
      },
      {
        'CountryCd': 'VN',
        'CountryName': 'Viet Nam',
        'CombinedName': 'VN - Viet Nam',
        'PayoutDetails': [
          {
            'Id': '826fe1d4-097f-4435-a162-32174ecae0dc',
            'ParentPayAgentCd': 'VN0004',
            'ParentPayAgentName': 'SACOM BANK',
            'CombinedName': 'VN0004 - SACOM BANK'
          }
        ]
      },
      {
        'CountryCd': 'WU',
        'CountryName': null,
        'CombinedName': 'WU - ',
        'PayoutDetails': [
          {
            'Id': '71958987-17f2-4a1c-9f03-9a158172dcc2',
            'ParentPayAgentCd': 'WU0001',
            'ParentPayAgentName': 'Western Union',
            'CombinedName': 'WU0001 - Western Union'
          }
        ]
      }
    ]
  },
  'Succeeded': true,
  'Error': null
})
const initialData = ref({})
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
    let url = '/configmapping/init'
    const response = await useApi(url)
    initialData.value = response;
 
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
}

const generateFieldMapping = function () {
fields.value={...fields.value,FieldMappingConfigs: flattenObject(JSON.parse(jsonFields.value))}
  fields.value.selectedTab = 1
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
const handleCountryChange = function (value) {
  console.log('initPayoutData',this.initPayoutData)
  this.payoutCountryList = [];
  if (value)
    this.payoutCountryList = this.initPayoutData.Data.CountryDetails.find(item => item['CombinedName'] === value).PayoutDetails
}


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

