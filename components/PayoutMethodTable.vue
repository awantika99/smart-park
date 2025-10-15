<template>
    <ContentBox Contenttitle="Payout Method">
        <div v-if="hasPaymentMethod" class="space-y-3">
                <Modal v-model="isModalOpen" @close="isModalOpen = false">
                    <PayoutSqlBuilder :modalContent="modalContent">
                    </PayoutSqlBuilder>
                </Modal>
                <div class="space-y-3">
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 bg-gray-100 tw-300">ParentPayAgentCd</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-100">MethodName</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">MethodType</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">MethodUrl</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">RemitType</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">IsHeaderRequired</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">HeaderDetail</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-400">SqlQueryBuilder</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-200">IsSignatureRequired</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-400">SignatureQueryBuilder</th>
                                    <th class="px-4 py-2 bg-gray-100 tw-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(payoutMethod, index) in props.countryDetail.PayoutMethods"
                                    :key="index">
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.ParentPayAgentCd }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.MethodName }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.MethodTypeName }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.MethodUrl }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.RemitTypeName }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.IsHeaderRequired }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.HeaderDetail }}</td>
                                    <td class="align-top border px-4 py-2">
                                        <button @click="openModal(payoutMethod.SqlQueryBuilder)"
                                            class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                                            <Icon name="tabler:eye" class="h-4 w-4" />
                                        </button>
                                    </td>

                                    <td class="align-top border px-4 py-2">{{ payoutMethod.IsSignatureRequired }}</td>
                                    <td class="align-top border px-4 py-2">{{ payoutMethod.SignatureQueryBuilder }}</td>
                                    <td class="align-top border px-4 py-2">
                                        <div class="space-y-3 px-4 py-2">
                                            <button  @click="editHandler(payoutMethod.Id)"
                                                class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                                                <Icon name="tabler:edit" size="20" class="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div class="space-y-3 px-4 py-2">
                                            <button  @click="deleteHandler(payoutMethod.Id)"
                                                class="btn bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                                                <Icon name="mingcute:delete-fill" size="20" class="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>  
        </div>
    </ContentBox>
</template>
<script setup lang="ts">
const emit = defineEmits(['deleteEvent'])
    const router = useRouter()
    const isModalOpen = ref(false);
    const modalContent = ref(null)
    const props = defineProps({
       
        countryDetail: {
            type: Object,
            default: {}
        }
    })
    const hasPaymentMethod = computed(() => {
        console.log('props.countryDetail.Data.PayoutMethods', props.countryDetail.PayoutMethods)
        return props.countryDetail.PayoutMethods.length != 0
    })
    const editHandler = (value) => {
  router.push({ path: "/payout/edit/"+value })
}
const deleteHandler=async(value) =>{
  let url = `/payoutmethoddetail/delete/`+value;
  const response = await useApi(url, {
    method: 'POST',
  });
  console.log(response)
  emit('deleteEvent');
}
const openModal = function (content) {
    isModalOpen.value = true;
    modalContent.value = content
}
</script>
