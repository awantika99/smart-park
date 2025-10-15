<template>
    <div>

        <form @submit.prevent="formSubmit()">
            <div class="grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>Agent Code</ALabel>
                        {{ errors.ParentPayAgentCd }}
                        <input type="text" class="input-primary mt-1" v-model="fields.ParentPayAgentCd"
                            :disabled="isEditMode" :class="{ 'error': errors.ParentPayAgentCd }" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.ParentPayAgentCd">{{
                            errors.ParentPayAgentCd.message }}</p> -->
                    <ValidationMessage>{{ v$.ParentPayAgentCd?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>Agent Name</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.ParentPayAgentName"
                            :disabled="isEditMode" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.ParentPayAgentName">{{
                            errors.ParentPayAgentName.message }}
                        </p> -->
                    <ValidationMessage>{{ v$.ParentPayAgentName?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>UserName</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.UserName" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.UserName">{{ errors.UserName.message }}</p> -->
                    <ValidationMessage>{{ v$.UserName?.$errors[0]?.$message }}</ValidationMessage>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>Password</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.Password" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.Password">{{ errors.Password.message }}</p> -->
                    <ValidationMessage>{{ v$.Password?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>BaseUrl</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.BaseUrl" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.BaseUrl">{{ errors.BaseUrl.message }}</p> -->
                    <ValidationMessage>{{ v$.BaseUrl?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>FetchUrl</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.FetchUrl" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.FetchUrl">{{ errors.FetchUrl.message }}</p> -->
                    <ValidationMessage>{{ v$.FetchUrl?.$errors[0]?.$message }}</ValidationMessage>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>SecretKey</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.SecretKey" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.SecretKey">{{ errors.SecretKey.message }}</p> -->
                    <ValidationMessage>{{ v$.SecretKey?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>Client Id</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.ClientId" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.ClientId">{{
                            errors.ClientId.message }}</p> -->
                    <ValidationMessage>{{ v$.ClientId?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>MTA PrivateKey</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.MTAPrivateKey" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.MTAPrivateKey">{{ errors.MTAPrivateKey.message }}
                        </p> -->
                    <ValidationMessage>{{ v$.MTAPrivateKey?.$errors[0]?.$message }}</ValidationMessage>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>Payout PublicKey</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.PayoutPublicKey" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.PayoutPublicKey">{{ errors.PayoutPublicKey.message
                        }}</p> -->
                    <ValidationMessage>{{ v$.PayoutPublicKey?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>Country Code</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.CountryCd" :disabled="isEditMode" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.CountryCd">{{
                            errors.CountryCd.message }}</p> -->
                    <ValidationMessage>{{ v$.CountryCd?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>Country Name</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.CountryName" :disabled="isEditMode" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.CountryName">{{ errors.CountryName.message }}
                        </p> -->
                    <ValidationMessage>{{ v$.CountryName?.$errors[0]?.$message }}</ValidationMessage>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>AdditionalField1</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.AdditionalField1" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.AdditionalField1">
                            {{ errors.AdditionalField1.message }}</p> -->
                    <ValidationMessage>{{ v$.AdditionalField1?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>AdditionalField2</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.AdditionalField1" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.AdditionalField1">{{
                            errors.AdditionalField1.message }}
                        </p> -->
                    <ValidationMessage>{{ v$.AdditionalField1?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>AdditionalField3</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.AdditionalField3" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.AdditionalField3">{{
                            errors.AdditionalField3.message }}</p> -->
                    <ValidationMessage>{{ v$.AdditionalField3?.$errors[0]?.$message }}</ValidationMessage>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel>PayoutSubAgentCd</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.PayoutSubAgentCd"
                            :disabled="isEditMode" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.PayoutSubAgentCd">{{
                            errors.PayoutSubAgentCd.message }}</p> -->
                    <ValidationMessage>{{ v$.PayoutSubAgentCd?.$errors[0]?.$message }}</ValidationMessage>
                </div>
                <div>
                    <div>
                        <ALabel>Payout UserCd</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.PayoutUserCd"
                            :disabled="isEditMode" />
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.PayoutUserCd">{{
                            errors.PayoutUserCd.message }}</p> -->
                    <ValidationMessage>{{ v$.PayoutUserCd?.$errors[0]?.$message }}</ValidationMessage>
                </div>

                <div>
                    <div>
                        <ALabel for="role-is-active">Balance Inquiry <span class="text-red-500"></span></ALabel>
                        <br />
                        <!-- <input type="checkbox"  role="switch" class="" v-model="fields.call_for_action" /> -->
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fields.SupportsBalanceInquiry" class="sr-only peer"
                                id="role-is-active" />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.SupportsBalanceInquiry">{{
                            errors.SupportsBalanceInquiry.message
                        }}</p> -->
                </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-4 content-start ...">
                <div>
                    <div>
                        <ALabel for="role-is-active">SupportsAccountValidation <span class="text-red-500"></span>
                        </ALabel>
                        <br />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fields.SupportsAccountValidation" class="sr-only peer"
                                id="role-is-active" />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.SupportsAccountValidation">{{
                            errors.SupportsAccountValidation.message
                        }}</p> -->
                </div>
                <div>
                    <div>
                        <ALabel for="role-is-active">RateEnabled <span class="text-red-500"></span></ALabel>
                        <br />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fields.RateEnabled" class="sr-only peer" id="role-is-active" />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.RateEnabled">{{ errors.RateEnabled.message }}</p> -->
                </div>
                <div>
                    <div>
                        <ALabel for="role-is-active">Active <span class="text-red-500"></span></ALabel>
                        <br />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fields.Active" class="sr-only peer" id="role-is-active" />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>
                    </div>
                    <!-- <p class="text-xs text-red-500 mt-1" v-if="errors.Active">{{ errors.Active.message }}</p> -->
                </div>
            </div>

            <div class="flex gap-2 mt-4 md:mt-6">
                <button class="btn" type="submit">Update</button>
                <!-- <Modal v-model="isModal" :isOpenModal="true">
                        <SuccessModal></SuccessModal>
                    </Modal> -->
                <NuxtLink :to="{ path: `/Payout/add/${fields.ParentPayAgentCd}` }"
                    class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100" type="submit">
                    Create Method
                </NuxtLink>
                <span class="text-red-500 ml-auto">*indicates mandatory fields</span>
            </div>
        </form>

    </div>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
let { fields, errors, v$, rules, formSubmit } = await useForm("", {
    needFormData: false,
    needToFetch: false,
    needToRedirect: true,
    // redirectURl: "/payout",
    message: "Data Saved SuccessFully",
    requestUrl: "/payoutdetail/update/",
    id: null,
    hideToast: false
})
// fields.value = {
//     ParentPayAgentCd: null,
//     ParentPayAgentName: null,
//     UserName: null,
//     Password: null,
//     BaseUrl: null,
//     FetchUrl: null,
//     SecretKey: null,
//     ClientId: null,
//     MTAPrivateKey: null,
//     PayoutPublicKey: null,
//     CountryCd: null,
//     CountryName: null,
//     PayoutSubAgentCd: null,
//     PayoutUserCd: null,
// };
rules.value = {
    // ParentPayAgentCd: { required: helpers.withMessage('ParentPayAgentCd is required', required), $autodirty: true },
    // ParentPayAgentName: { required: helpers.withMessage('PayAgent Name  is required', required), $autodirty: true },
    // UserName: { required: helpers.withMessage('UserName is required', required), $autodirty: true },
    // Password: { required: helpers.withMessage('Password is required', required), $autodirty: true },
    // BaseUrl: { required: helpers.withMessage('Base Url is required', required), $autodirty: true },
    // FetchUrl: { required: helpers.withMessage('Fetch Url is required', required), $autodirty: true },
    // SecretKey: { required: helpers.withMessage('Secret Key is required', required), $autodirty: true },
    // ClientId: { required: helpers.withMessage('Client Id is required', required), $autodirty: true },
    // MTAPrivateKey: { required: helpers.withMessage('Private Key is required', required), $autodirty: true },
    // PayoutPublicKey: { required: helpers.withMessage('Public Key is required', required), $autodirty: true },
    // CountryCd: { required: helpers.withMessage('Country Code is required', required), $autodirty: true },
    // CountryName: { required: helpers.withMessage('Base Url is required', required), $autodirty: true },
    // PayoutSubAgentCd: { required: helpers.withMessage('Payout SubAgent code is required', required), $autodirty: true },
    // PayoutUserCd: { required: helpers.withMessage('ParentPayAgentCd is required', required), $autodirty: true }
}
const emit = defineEmits(['deleteEvent'])
const isPayout = ref(false)
const { id } = useRoute().params
const router = useRouter()
const isModalOpen = ref(false);
const modalContent = ref(null)
const props = defineProps({
    tabMenus: {
        type: Object,
        default: {},
    },
    isPayout: {
        type: Boolean,
        default: false
    },
    countryDetail: {
        type: Object,
        default: {}
    }
})

watch(props, (value) => {
    fields.value = props.countryDetail
})
// const submitForm = async () => {
//     console.log('props.countryDetail in submitform', props.countryDetail)
//     if (props.countryDetail) {
//         let url = `/payoutdetail/update/`;
//         const response = await useApi(url, {
//             method: 'POST',
//             body: JSON.stringify(props.countryDetail)
//         });
//         if (response.Succeeded === true) {
//             console.log('response.succeeded', response.Succeeded);

//             //$nuxt.$router.go();
//         }
//         else {
//             console.log('API Error:', response.Error ? response.Error.Message : 'Unknown error');
//         }

//     }
// };
const isEditMode = computed(() => {
    return Boolean(fields.value)
})
onMounted(() => {
    fields.value = props.countryDetail
    //fields.value.CountryName = fields.value.CountryName.replace(/\s/g, '')
})
const loadInitialData = async () => {
    console.log('Received countryDetail prop:', props.countryDetail)
}
loadInitialData()


</script>
