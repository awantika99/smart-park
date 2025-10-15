<template>
    <UModal v-model="isHistoryModelOpen" class="w-2/4" @close="closeModal()" :ui="{ width: 'w-5', padding: 'p-16 sm:p-32' }">
        <UCard class="card-primary">
            <template #header>
                <div class="custom-header">
                    <p class="text-lg font-bold">Rate History</p>
                    <Icon name="material-symbols:close" @click="closeModal()"
                        class="absolute float-right top-2 right-2 w-5 h-5" />
                </div>
            </template>
            <div>
                <div>
                    <!-- <DetailBox title="Banner: Create"> -->
                    <Table header="Rate History" :enableAdd="false" :hideDetailsBox="true" :titles="{
                        'currency.name': 'currency',
                        'currency.unit': 'Unit',
                        buy_rate: 'Buy Rate',
                        sell_rate: 'Sell Rate',
                        created_by: 'Created By',
                        created_at: 'Created Date',
                        approved_by: 'Approved By',
                        approved_at: 'Approved Date'
                    }" :enable-search="false" :enable-pagination="false" :data="history">
                        <template #created_at="{ datum }">
                            {{ formatDateTime(datum.created_at) }}
                        </template>
                        <template #approved_at="{ datum }">
                            {{ formatDateTime(datum.approved_at) }}
                        </template>
                    </Table>
                    <!-- </DetailBox> -->
                </div>
            </div>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
const isHistoryModelOpen = ref(false)
const config = useRuntimeConfig()
const emit = defineEmits(['close'])
const history= ref([])
const props = defineProps({
    titles: {
        type: Object,
        default: {},
    },
    isOpenModal: {
        type: Boolean,
        required: false,
        default: false
    },
    selectedCurrency:{
        type: String,
        required:false,

    }
})
watch(
    () => props.selectedCurrency,
    (newData) => {
        isHistoryModelOpen.value = props.isOpenModal
        // if(props.isOpenModal){
            showRateHistory()
        // }
    }
)
watch(
    () => props.isOpenModal,
    (newData) => {
        isHistoryModelOpen.value = props.isOpenModal
        // if(props.isOpenModal){
            showRateHistory()
        // }
    }
)
const showRateHistory = async() =>{
    console.log('selectedCurrency',props.selectedCurrency)
    $fetch(config.public.API_BASE_URL + '/manage/multi-currency/'+props.selectedCurrency+'/inactive/').then((data) => {
      history.value = data as Record<string, any>
    })
  }
const closeModal =()=>{
    emit('close')
    isHistoryModelOpen.value = false;
  }
</script>
