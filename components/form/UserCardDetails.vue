<template>
     <DetailBox title="Customer Card Detail"  :isCompleteTitle="true">
            <div class="mt-1 mb-3 text-2xl ...">
                <h2><b>{{ fields.name }}</b></h2>
            </div>
            <hr/>
            <form @submit.prevent="submitForm()">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5">
                    <div v-if="fields.card">
                        <label>Card Type</label>
                        <input type="text" class="input-primary mt-1" id="input-name-embossed" v-model="fields.card.type" />
                    </div>
                    <div>
                        <label>URN</label>
                        <input type="text" class="input-primary mt-1" id="input-name-embossed" v-model="fields.urn" />
                    </div>
                    <div >
                        <label>CRN</label>
                        <input type="text" class="input-primary mt-1" id="input-name-embossed" v-model="fields.crn" />
                    </div>
                    <div>
                        <label>4 Digit PAN <span class="text-red-500">*</span></label>
                        <input type="text" class="input-primary mt-1" id="input-name-embossed" v-model="fields.card_pan_last4" />
                    </div>
                    <div>
                        <label>Is Blocked ?<span class="text-red-500">*</span></label><br/>
                        <UToggle v-model="fields.enable_id_number_validation" class="mt-1" />
                    </div>
                </div>
                <div class="flex gap-2 mt-4 md:mt-6">
                        <button class="btn" type="submit">Save</button>
                <NuxtLink to="/user-management/customer" class="btn btn-secondary"
                    >Cancel</NuxtLink
                >
                </div>
            </form>
     </DetailBox>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
const { fields, errors, formSubmit } = useForm('/manage/customer/',{needToRedirect:true,needToFetch:false})
</script>