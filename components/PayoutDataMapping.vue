<template>
    <div>
        <form @submit.prevent="submitPayout(fields)">
            <div class="grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>ComboType</ALabel>
                        <ASelect :options="comboTypeOption" label="ComboType" value="ComboType" v-model="comboType"
                            placeholder="Select option" class="bg-white" id="amlmatchconfig-type" />
                    </div>
                    <ValidationMessage>{{ v$.ComboType?.$errors[0]?.$message }}</ValidationMessage>
                    <p class="text-xs text-red-500 mt-1" v-if="errors.ComboType">{{ errors.ComboType.message }}</p>
                </div>
            </div>
            <div class="flex gap-2 mt-4 md:mt-6">
                <loader v-if="loading"></loader>
                <button v-else type="submit" class="btn">Search</button>

            </div>
        </form>

        <div class="mt-8" v-if="showComboTypeDetail">


            <div>

                <div>
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 bg-gray-100 tw-100" rowspan="2">MTA Field Value</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200" rowspan="2">Data Mapping</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="comboType in comboTypeDetail" :key="comboType.MtaFieldId">
                                    <td class="align-top border px-4 py-2">{{ comboType.MtaFieldValue }}</td>
                                    <td class="align-top border px-4 py-2">
                                        <div class="flex flex-row">
                                            <input type="text" class="input-primary m-1" placeholder="Partner Field Value"
                                                v-model="comboType.PartnerFieldValue" />
                                            {{ comboType.PartnerFieldValue }}
                                            <input type="text" class="input-primary m-1" placeholder="Additional Info 1"
                                                v-model="comboType.AdditionalInfo1" />
                                            {{ comboType.AdditionalInfo1 }}
                                            <input type="text" class="input-primary m-1" placeholder="Additional Info 2"
                                                v-model="comboType.AdditionalInfo2" />
                                            <input type="text" class="input-primary m-1" placeholder="Additional Info 3"
                                                v-model="comboType.AdditionalInfo3" />
                                        </div>

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div class="flex gap-2 mt-4 md:mt-6">
                            <loader v-if="loading"></loader>
                            <button v-else type="submit" class="btn" @click="updateHandler()">Update</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { helpers, required, } from '@vuelidate/validators'
let { fields, errors, v$, rules, loading } = await useForm("")
console.log('fields', fields.value)
const showComboTypeDetail = ref(false)
const comboTypeOption = ref([]);
const selectedCountry = ref([]);
const comboType = ref(null)
const comboTypeDetail = ref([])
const props = defineProps({
    countryDetail: {
        type: Object,
        default: {}
    }
})
const submitPayout = async (fields: any) => {
    comboTypeDetail.value = [];
    showComboTypeDetail.value = false;
    loading.value = true;
    let url = `/payoutdatamapping/getpayoutdatabycombotype`;
    const response = await useApi(url, {
        method: 'POST',
        body: {
            "ParentPayAgentCd": props.countryDetail.ParentPayAgentCd,
            "ComboType": comboType.value
        }
    });
    comboTypeDetail.value = response.Data;
    loading.value = false;
    showComboTypeDetail.value = true;

};
const updateHandler = async () => {
    console.log('comboTypeDetail.value ', comboTypeDetail.value);
    let url = '/payoutdatamapping/add';
    const response = await useApi(url, {
        method: 'POST',
        body: {
            "ParentPayAgentCd": props.countryDetail.ParentPayAgentCd,
            "ComboType": comboType.value,
            PayoutDataMappingRequests: comboTypeDetail.value
        }
    });
    showSuccessMessage("Data updated successfully!")
};
const showSuccessMessage = (message) => {
    window.alert(message);
    // You might want to use a more sophisticated pop-up solution here
};


const loadInitialData = async () => {
    let url = '/payoutdatamapping/init'
    const response: any = await useApi(`${url}`)
    comboTypeOption.value = response.Data
    console.log('Country', comboTypeOption.value)
}
await loadInitialData()
rules.value = {
    ComboType: { required: helpers.withMessage("ComboType is required", required), $autodirty: true },
}



</script>
      