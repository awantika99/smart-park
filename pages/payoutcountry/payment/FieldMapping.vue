<template>
  <tr>
    <td class="align-top border px-4 py-2 fixed-td-width"><label
      :for="'toggle-' + innerIndex">{{ fieldMap.PartnerFieldName }}</label>
    </td>
    <td class="border px-4 py-2 align-top">
      <div class="flex items-center">
        <input v-model="fieldMap.IsDefaultValue" type="checkbox" :id="'toggle-' + innerIndex" class="hidden"
               @change="handleIsDefaultValueChange(fieldMap)">
        <label :for="'toggle-' + innerIndex" class="flex items-center cursor-pointer">
          <div class="relative">
            <div class="w-12 h-6 bg-gray-300 rounded-full"></div>
            <div
              :class="{ 'translate-x-full bg-green-500': fieldMap.IsDefaultValue, 'translate-x-0 bg-white': !fieldMap.IsDefaultValue }"
              class="toggle__dot absolute w-6 h-6 rounded-full shadow-md inset-y-0 left-0 transform transition"></div>
          </div>
        </label>
      </div>
      <!--   <input v-model="fieldMap. IsDefaultValue" @change="handle IsDefaultValueChange(fieldMap)" type="checkbox" />-->
    </td>
    <td class="align-top border px-4 py-2">
      <select :disabled="fieldMap.DisableColumn || fieldMap.DisableMasterColumn"
              v-model="fieldMap.TableMappingConfigId"
              :class="{
      'input-error': v$.TableMappingConfigId?.$error,
      'w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500' : !(fieldMap.DisableMasterColumn || fieldMap.DisableColumn),
     'w-full bg-gray-200 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500': (fieldMap.DisableMasterColumn || fieldMap.DisableColumn)
      }"
              @change="handleTableChange(fieldMap)"
      >
        <option value="">Select</option>
        <option v-for="table in tables" :key="table.Id" :value="table.Id">
          {{ table.TableAliasName }}
        </option>
      </select>
      <ValidationMessage>{{ v$.TableMappingConfigId?.$errors[0]?.$message }}</ValidationMessage>
    </td>
    <td class="align-top border px-4 py-2">
      <select :disabled="fieldMap.DisableColumn || fieldMap.DisableMasterColumn"
              v-model="fieldMap.FieldMappingConfigId"
              :class="{
      'input-error': v$.FieldMappingConfigId?.$error,
      'w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500' : !(fieldMap.DisableMasterColumn || fieldMap.DisableColumn),
     'w-full bg-gray-200 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500': (fieldMap.DisableMasterColumn || fieldMap.DisableColumn)
      }">
        <option>select</option>
        <option v-for="column in fieldMap.FieldMappingConfigs" :key="column.Id" :value="column.Id">
          {{
            column.FieldName
          }}
        </option>
      </select>
      <ValidationMessage>{{ v$.FieldMappingConfigId?.$errors[0]?.$message }}</ValidationMessage>
    </td>
    <td class="border px-4 py-2 align-top">
      <div class="flex items-center" v-if="!fieldMap.IsDefaultValue">
        <input v-model="fieldMap.IsAdditionalConditionRequired" type="checkbox"
               :id="'toggle-SqlFunctionAdditionalCondition-' + innerIndex"
               :disabled="fieldMap?.DisableMasterColumn"
               class="hidden"
               @change="handleIsAdditionalConditionRequiredValueChange(fieldMap)">
        <label :for="'toggle-SqlFunctionAdditionalCondition-' + innerIndex" class="flex items-center cursor-pointer">
          <div class="relative">
            <div class="w-12 h-6 bg-gray-300 rounded-full"></div>
            <div
              :class="{ 'translate-x-full bg-green-500': fieldMap.IsAdditionalConditionRequired, 'translate-x-0 bg-white': !fieldMap.IsAdditionalConditionRequired }"
              class="toggle__dot absolute w-6 h-6 rounded-full shadow-md inset-y-0 left-0 transform transition"></div>
          </div>
        </label>
      </div>
      <!--   <input v-model="fieldMap. IsDefaultValue" @change="handle IsDefaultValueChange(fieldMap)" type="checkbox" />-->
    </td>
    <td class="align-top border px-4 py-2 tw-400">
      <select v-show="fieldMap.IsAdditionalConditionRequired"
              v-model="fieldMap.SqlFunction" @change="handleSqlFunctionChange(innerIndex,fieldMap)"
              class="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500">
        <option value="">Select</option>
        <option v-for="func in sqlFunctionDetails" :key="func.Function"
                :value="func.Function">{{
            func.Description
          }}
        </option>
      </select>
      
      <div class="w-full" v-if="fieldMap.SqlFunction == 3">
        <table class="w-full table-auto border-collapse mt-3">
          <tr v-for="(additionalfieldMap, additionalKey) in fieldMap.SqlFunctionAdditionalConditions"
              :key="'AdditionalKey'+additionalKey">
            <td class="border px-2 py-1 w-1/2">
              <select v-model="fieldMap.TableName"
                      @change="handleInnerTableChange(additionalfieldMap)"
                      class="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500">
                <option value="">Select</option>
                <option v-for="table in tables" :key="table.TableAliasName"
                        :value="table.TableAliasName">
                  {{ table.TableAliasName }}
                </option>
              </select>

            </td>
            <td class="border px-2 py-1 w-1/2">
              <select v-model="fieldMap.ColumnName"
                      class="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500">
                <option>Select</option>
                <option v-for="column in fieldMap.FieldMappingConfigs" :key="column.FieldName"
                        :value="column.FieldName">
                  {{ column.FieldName }}
                </option>
              </select>
            </td>
            <td class="border px-2 py-1 w-6">
              <!--{{ innerKey }}-->
              <div class="flex">
                <button
                  class="px-2 py-1 border border-red-500 text-red-500 rounded-md text-sm hover:bg-red-500 hover:text-white"
                  v-show="fieldMap.SqlFunctionAdditionalConditions.length > 1"
                  @click="handleDeleteAdditionalCondition(additionalKey,fieldMap)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
                <button
                  class="px-2 py-1 border border-blue-500 mx-2 text-blue-500 rounded-md text-sm hover:bg-blue-500 hover:text-white"
                  v-show="(fieldMap.SqlFunctionAdditionalConditions.length - 1) == additionalKey"
                  @click="handleAdditionalCondition(fieldMap)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="w-full" v-if="fieldMap.SqlFunction == 9">
        <table class="w-full table-auto border-collapse mt-3">

          <tr v-for="(additionalFieldMap, additionalKey) in fieldMap.SqlFunctionAdditionalConditions"
              :key="'SqlFunctionAdditionalCondition'+additionalKey">
            <td>
              <input type="checkbox" @click="handlerUseField(additionalFieldMap)"
                     v-model="additionalFieldMap.UserField" />
            </td>
            <td>
              <input
                v-model="additionalFieldMap.Condition"
                class="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500"
              />
            </td>
            <td>
              <input v-if="!additionalFieldMap.UserField"
                     v-model="additionalFieldMap.Result"
                     class="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500"

              >
              <select v-model="additionalFieldMap.TableName" v-if="additionalFieldMap.UserField"
                      @change="handleInnerTableChange(additionalFieldMap)"
                      class="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500">
                <option value="">Select</option>
                <option v-for="table in tables" :key="table.TableAliasName"
                        :value="table.TableAliasName">
                  {{ table.TableAliasName }}
                </option>
              </select>

              <select v-model="additionalFieldMap.ColumnName"
                      v-if="additionalFieldMap.UserField"
                      class="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500">
                <option>Select</option>
                <option v-for="column in additionalFieldMap.FieldMappingConfigs" :key="column.FieldName"
                        :value="column.FieldName">
                  {{ column.FieldName }}
                </option>
              </select></td>

            <td class="border px-2 py-1 w-6">
              <!--{{ innerKey }}-->
              <div class="flex">
                <button
                  class="px-2 py-1 border border-red-500 text-red-500 rounded-md text-sm hover:bg-red-500 hover:text-white"
                  v-show="fieldMap.SqlFunctionAdditionalConditions.length > 1"
                  @click="handleDeleteAdditionalCondition(additionalKey,fieldMap)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
                <button
                  class="px-2 py-1 border border-blue-500 mx-2 text-blue-500 rounded-md text-sm hover:bg-blue-500 hover:text-white"
                  v-show="(fieldMap.SqlFunctionAdditionalConditions.length - 1) == additionalKey"
                  @click="handleAdditionalCondition(fieldMap)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="w-full"
           v-if="fieldMap.SqlFunctionAdditionalCondition">
        <input
          v-model="fieldMap.SqlFunctionAdditionalCondition"
          class="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500" />

      </div>
    </td>
    <td class="align-top border px-4 py-2 ">
      <select v-show="fieldMap.IsAdditionalConditionRequired"
              v-model="fieldMap.SqlDataType" @change="handleSqlDataTypeChange(fieldMap)"
              :class="fieldMap.DisableColumn? 'w-full bg-gray-200 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500' : 'w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500'">
        <option value="">Select</option>
        <option v-for="func in sqlDataTypeDetails" :key="func.DataType"
                :value="func.Description">{{
            func.Description
          }}
        </option>
        
      </select>
      <div class="w-full"
           v-if="fieldMap.SqlDataType">
        <input
            v-model="fieldMap.SqlDataTypeAdditionalCondition"
            class="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500" />

      </div>
    </td>
    <td class="align-top border px-4 py-2">
      <input :disabled="!fieldMap.IsDefaultValue" v-if="fieldMap.IsDefaultValue"
             v-model="fieldMap.DefaultValue"
             :class="{
                  'input-error': v$.DefaultValue?.$error,
                }"


             class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0"


      >
      <ValidationMessage>{{ v$.DefaultValue?.$errors[0]?.$message }}</ValidationMessage>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {helpers, required} from '@vuelidate/validators'
import {fi} from 'date-fns/locale'

const props = defineProps({
  innerIndex: Number,
  tables: [],
  sqlDataTypeDetails: [],
  sqlFunctionDetails: [],
  fieldMap: {
    PartnerFieldName: null,
    TableMappingConfigId: null,
    FieldMappingConfigId: null,
    DefaultValue: null,
    IsDefaultValue: false,
    SequenceOrder: 0,
    SqlDataType: null,
    SqlDataTypeAdditionalCondition:null,
    SqlFunction: null,
    SqlFunctionAdditionalCondition: null,
    SqlFunctionAdditionalConditions: [],
    MethodId: null,
    DisableColumn: false,
    DisableMasterColumn: false,
    IsAdditionalConditionRequired: false,
    FieldMappingConfigs: []
  }
})
const rules = ref({
  IsDefaultValue: {
    required: helpers.withMessage('*', required),
    $autodirty: true
  },
  DefaultValue: {
    required_if: helpers.withMessage('*', (value) => {
      // Assuming formData is your data object
      return !props.fieldMap.IsDefaultValue || !!value
    }),
    $autodirty: true
  },
  TableMappingConfigId: {
    required_if: helpers.withMessage('*', (value) => {

      if (!props.fieldMap.IsDefaultValue && !props.fieldMap.IsAdditionalConditionRequired) {
        return !!value
      } else if (!props.fieldMap.IsDefaultValue && props.fieldMap.IsAdditionalConditionRequired &&
        props.fieldMap.SqlFunction !==3) {
        return !!value
      } else

        return true


    }),
    $autodirty: true
  },
  FieldMappingConfigId: {
    required_if: helpers.withMessage('*', (value) => {
      // Assuming formData is your data object
      if (!props.fieldMap.IsDefaultValue && !props.fieldMap.IsAdditionalConditionRequired) {
        return !!value
      } else if (!props.fieldMap.IsDefaultValue && props.fieldMap.IsAdditionalConditionRequired &&
        props.fieldMap.SqlFunction !== 3) {
        return !!value
      } else

        return true

    }),
    $autodirty: true
  }
})
const errors: Ref<Record<string, any>> = ref({})


const v$ = useVuelidate(rules, props.fieldMap)


const handleSqlFunctionChange = function(key, value) {
  value.SqlFunctionAdditionalConditions = []
  if (value.SqlFunction == 3 || value.SqlFunction == 9) {
    value.TableMappingConfigId = null
    value.FieldMappingConfigId = null
    value.MethodId = null
    this.handleAdditionalCondition(value)
  } else {
    value.SqlFunctionAdditionalCondition = ''
  }
}
const handleTableChange = function(row) {

  if (row.TableMappingConfigId)
    row.FieldMappingConfigs = props.tables.find(item =>
      (item['Id'] === row.TableMappingConfigId)).FieldMappingModels
  else
    row.FieldMappingConfigs = []
}

const handleInnerTableChange = function(row) {

  if (row.TableName)
    row.FieldMappingConfigs = props.tables.find(item =>
      (item['TableAliasName'] === row.TableName)).FieldMappingModels
  else
    row.FieldMappingConfigs = []
}

const handleIsDefaultValueChange = function(row) {
  // Handle checkbox change event
  if (row.IsDefaultValue) {
    row.SqlFunctionAdditionalCondition = ''
    row.TableMappingConfigId = null
    row.FieldMappingConfigId = null
    row.Id = null
    row.SqlFunction = null
    row.SqlDataType = null
    row.SqlFunctionAdditionalConditions = []
    row.DisableMasterColumn = true
    row.IsAdditionalConditionRequired = false
  } else {
    row.DisableMasterColumn = false
  }
}
const handleIsAdditionalConditionRequiredValueChange = function(row) {
  row.SqlFunction = null
  row.SqlDataType = null
  row.SqlDataTypeAdditionalCondition = null
  row.SqlFunctionAdditionalCondition = null
  row.SqlFunctionAdditionalConditions = null
}

const handleSqlDataTypeChange = function (field){
  if(field.SqlDataType){
    
  }
  else{
    field.SqlDataTypeAdditionalCondition = null
  }
}

const handleAdditionalCondition = function(value) {
  value.SqlFunctionAdditionalConditions.push({
    Condition: '',
    Result: '',
    UserField: false,
    TableName: null,
    ColumnName: null,
    FieldMappingConfigs: []
  })
}
const handleDeleteAdditionalCondition = function(key, value) {
  value.SqlFunctionAdditionalConditions.splice(key, 1)
}

const handlerUseField = function(value) {
  if (value.UserField) {
    value.TableName = null
    value.ColumnName = null
  } else {

  }

}
</script>