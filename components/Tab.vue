<template>
  <div class="">
    <TabGroup>
      <TabList class="custom-tab-list">
        <Tab
          v-for="tab in tabMenus"
          as="template"
          :key="tab"
          class=""
          v-slot="{ selected }"
        >
          <button
            @click="ChangeTab(tab)"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="mt-2">
        <TabPanel
          v-for="tabMenus in props.tabMenus"
          :key="tabMenus"
          :class="[
            'rounded-xl bg-white dark:bg-gray-900 p-3',
            'ring-white dark:ring-gray-900 ring-opacity-60 ring-offset-2 ring-offset-blue-400 dark:ring-offset-red-400 focus:outline-none focus:ring-2',
          ]"
        >
          <slot name="tab-content" :activeTab="tabMenus"></slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  tabMenus: {
    type: Object,
    default: {},
  },
  selectedTab:{
    type: String,
    default: '',
  },

})
const   currentTab = ref(props.selectedTab)
watch(
  () => props.selectedTab,
  (newData) => {
    console.log('new',newData)
    currentTab.value = newData
  }
)

const ChangeTab = (tab:string) =>{
  currentTab.value = tab
  emit('update:modelValue', tab)
}
</script>
