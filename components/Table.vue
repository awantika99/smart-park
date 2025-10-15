<template>
  <div>
    <DetailBox :title="header" :hideDetailsBox="hideDetailsBox" :isCompleteTitle="true">
      <form :class="customFilterStyling ? customFilterStyling : 'flex flex-wrap items-center'" class="mb-8 gap-x-8"
        @submit.prevent="performFilter" @reset="performReset">
        <input v-if="enableSearch" :type="searchType" class="input-primary flex-1" :placeholder="searchLabel"
          v-model="searchQuery" />
        <slot name="filters"></slot>
        <slot v-if="filterData" name="computedFilters">
          <div v-for="(val, key) in filterData" :key="key">
            <div class="h-full computed-filter">
              <ASelect :options="val.data" :label="val.optionLabel" v-model="filters[key]" :placeholder="val.label"
                class="bg-white dark:bg-gray-900 h-full"
                :custom-drop-down-width="customDropDownWidth ? customDropDownWidth : 'w-64 xl:w-96'" />
            </div>
          </div>
        </slot>
        <div class="flex items-center gap-3 ml-auto">
          <button v-if="enableSearch" type="submit" size="lg" class="btn " color="blue" variant="solid">Search</button>
          <UButton v-if="enableSearch" type="reset" size="lg" color="gray">Reset</UButton>
          <slot name="add-button">
            <NuxtLink v-if="enableAdd" :to="addURL" class="flex items-center text-sm btn ml-auto">
              <Icon name="mdi:plus" />
              <span>Add</span>
            </NuxtLink>
          </slot>
          <slot name="additional-button">
            <UButton v-if="hasExport" type="reset" size="lg" color="green">
              <Icon name="material-symbols:download" size="16px" class="me-0 pe-0" />Export
            </UButton>
          </slot>
        </div>
      </form>

      <div class="overflow-x-auto scrollbar-secondary shadow-sm">
        <table class="border border-gray-400 dark:border-gray-600 w-full table-auto">
          <thead class="bg-gray-600 dark:bg-gray-600 text-sm text-white text-left whitespace-nowrap">
            <tr>
              <th scope="col" class="p-1 md:p-2 border border-gray-400 dark:border-gray-600" v-if="props.autoNumbering">
                SI No.
              </th>
              <th scope="col" class="p-1 md:p-2 border border-gray-400 dark:border-gray-600" v-for="title in props.titles"
                :key="title">
                <div v-if="title.titleType && title.titleType === 'html'">
                  <div v-html="title.name"></div>
                </div>
                <div v-else>
                  {{ title?.name || title }}
                </div>
              </th>
              <th scope="col" class="p-1 md:p-2 border border-gray-400 dark:border-gray-600" v-if="props.actions.length">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-sm dark:text-gray-200" v-if="rows.length && !loading">
            <tr v-for="(datum, i) in rows || []" :key="i" :class="{
              'border-b-2': data && i < data?.length - 1,
              'bg-white dark:bg-gray-900': i % 2 === 0,
              'bg-gray-200 dark:bg-gray-800': i % 2 !== 0,
            }">
              <td class="p-1 md:p-2 border border-gray-400 dark:border-gray-600" v-if="props.autoNumbering">
                <span v-if="pagination?.page && pagination.size">{{ (pagination.page - 1) * pagination.size + i + 1 }}
                </span>
                <span v-else>
                  {{ i + 1 }}
                </span>
              </td>
              <td class="p-1 md:p-2 border border-gray-400 dark:border-gray-600 break-words max-w-sm"
                v-for="(title, key) in props.titles" :key="title">
                <slot v-if="slots[key]" :name="key" :datum="datum"></slot>
                <div v-else-if="title.type && title.type === 'boolean'">
                  {{ datum[key] ? title.trueLabel || 'Active' : title.falseLabel || 'Inactive' }}
                </div>
                <div v-else-if="title.type && title.type === 'image'">
                  <img v-if="datum[key]" :src="datum[key]" :alt="key"
                    :class="customStyling[key] ? customStyling[key] : 'w-16 h-16 object-contain'" />

                </div>
                <NuxtLink class="text-blue-700 underline" v-else-if="title.type && title.type === 'link'"
                  :href="datum[key]" target="_blank" :class="customStyling[key]">{{ datum[key] }}</NuxtLink>
                <span v-else-if="key.includes('.')" :class="customStyling[key]">{{ getProperty(datum, key) }}</span>
                <span v-else :class="customStyling[key]">{{ datum[key] }}</span>
              </td>
              <td class="p-1 md:p-2 border border-gray-400 dark:border-gray-600" v-if="props.actions.length">
                <div class="flex gap-2 items-center">
                  <div v-if="props.actions.includes('edit')" class="cursor-pointer">
                    <UButton :to="joinURL(route.path, `${datum.id}`, 'edit')" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Edit" name="edit" square color="white">
                      <Icon name="material-symbols:edit-square-outline-rounded" class="h-4 w-4" />
                    </UButton>
                  </div>
                  <div v-if="props.actions.includes('view')" class="cursor-pointer">
                    <UButton :to="joinURL(route.path, `${datum.id}`)" data-bs-toggle="tooltip" data-bs-placement="top"
                      title="View" square color="white">
                      <Icon name="mdi:eye" class="h-4 w-4" />
                    </UButton>
                  </div>
                  <div v-if="props.actions.includes('delete')" @click="onDelete(datum.id)">
                    <UButton color="white" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" square>
                      <slot name="delete" :datum="datum">
                        <div class="cursor-pointer text-red-600 dark:text-blue-600">
                          <Icon name="mdi:delete-outline" class="h-4 w-4" />
                        </div>
                      </slot>
                    </UButton>
                  </div>
                  <div v-if="props.actions.includes('edit-modal')" class="cursor-pointer">
                    <UButton @click="editHandler(datum)" square color="white">
                      <Icon name="material-symbols:edit-square-outline-rounded" class="h-4 w-4" />
                    </UButton>
                  </div>

                  <slot name="additional-action" :datum="datum" :index="i"></slot>

                </div>
              </td>
            </tr>
          </tbody>
          <tbody class="text-sm" v-else>
            <tr class="text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
              <td colspan="100" class="text-center col-span-full">
                <div class="flex items-center justify-center">
                  <loader v-if="loading"></loader>
                  <span v-else>No data found.</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="pagination?.pages && enablePagination" v-model="page" :totalPages="pagination.pages"
        :totalRecords="pagination.count" v-on:update:modelValue="pageChanged" />
      <div></div>
    </DetailBox>
  </div>
</template>  



<script setup lang="ts">
import { getProperty } from '~~/utils/helpers'
// import { PropType, Ref, useSlots } from 'vue'
import { useSlots } from 'vue'

import * as pkg from 'vue-toastification'
import { withQuery, } from 'ufo'
interface Pagination {
  count: number
  page: number
  pages: number
  size: number
}

const slots = useSlots()
const { useToast } = pkg
const toast = useToast()
const selectedId = ref(null)


const emit = defineEmits(['edit', 'delete'])

const props = defineProps({
  titles: {
    type: Object,
    default: {},
  },
  header: {
    type: String,
    required: false,
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: false,
  },
  endpoint: {
    type: String,
    required: false,
  },
  actions: {
    type: Array,
    default: [],
  },
  autoNumbering: {
    type: Boolean,
    default: false,
  },
  searchLabel: {
    type: String,
    default: 'Search ...',
  },
  searchType: {
    type: String,
    default: 'text',
  },
  customStyling: {
    type: Object,
    default: {},
  },
  customFilterStyling: {
    type: String,
  },
  customDropDownWidth: {
    type: String,
  },
  toggleKey: {
    type: String,
    default: null,
  },
  tickKey: {
    type: String,
    default: null,
  },
  formComponent: {
    type: Object,
    required: false,
  },
  enableAdd: {
    type: Boolean,
    default: true,
  },
  hasExport: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: false,
  },
  enableSearch: {
    type: Boolean,
    default: true,
  },
  enablePagination: {
    type: Boolean,
    default: true,
  },
  propagateActions: {
    type: Array,
    default: [],
  },
  isOpenModal: {
    type: Boolean,
    default: false,
  },
  hideDetailsBox: {
    type: Boolean,
    default: false,
  },
  editPageURL: {
    type: String,
    default: null,
  },
  needToReload: {
    type: Boolean,
    default: false
  }
})


// TODO Use single type decalation on backend and frontend
type filterDataType = Record<string, { label: string; optionLabel: string; data: object[] }>

// TODO Use single interface decalation on backend and frontend
interface ListResponse {
  results: Record<string, any>
  pagination: Pagination
  filterData?: filterDataType
}

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const { page: pageQueryValue, q: qQueryValue, search: searchQueryValue, ...filterQueryValues } = route.query

// Get page number from query
const pageParam: string = pageQueryValue?.toString() || '1'
let pageNum = +pageParam
if (isNaN(pageNum) || pageNum < 1) {
  pageNum = 1
}
const pagination: Ref<Pagination | {}> = ref(props.pagination || {})
const page: Ref<number> = ref(pageNum)

const searchQuery = ref(searchQueryValue || qQueryValue || '')
const loading = ref(false)
const initiallyLoaded = ref(false)
const filterData: Ref<filterDataType | null> = ref(null)
import { withoutTrailingSlash, withTrailingSlash, joinURL } from 'ufo'
// const rows: Ref<Array<Record<string, any>>> = ref(props.data)
const rows: Ref = ref(props.data || [])
console.log('rows', rows.value)

watch(
  () => props.data,
  (newData) => {
    console.log('newData')
    rows.value = newData
  }
)
watch(
  () => props.isOpenModal,
  (newData) => {
    if (!newData) loadData()
  }
)

watch(
  () => props.pagination,
  (newPagination) => {
    if (newPagination) pagination.value = newPagination
  }
)
watch(
  () => props.needToReload,
  (newData) => {
    if (newData) loadData()
  }
)

const header = computed(() => {
  if (props.header) {
    return props.header
  }
  const routeSections = route.path.split('/');
  const lastSection = routeSections[routeSections.length - 1];
  let routename = lastSection ? lastSection.toString() : '';
  routename = routename.replace(new RegExp('-', 'g'), ' ')
  return toCapitalCase(routename)
})
const addURL = computed(() => {
  return route.path + '/add/'
})

let cleanedFilterValues = Object.fromEntries(
  Object.entries(filterQueryValues).map(([k, v]) => {
    if (v === 'true') {
      return [k, true]
    } else if (v === 'false') {
      return [k, false]
    }
    return [k, v]
  })
)
const filters = ref(cleanedFilterValues)


// const loadData = async (endpoint:string='') => {
//   try {
//     if (!props.endpoint || props.data) return
//     loading.value = true    
//     let url = withQuery(withoutTrailingSlash(endpoint || props.endpoint),) 
//     // {page: page.value.toString()}
//     if (searchQuery.value) {
//       url = withQuery(url, {search: searchQuery.value})
//     }
//     if (filters.value) {
//       url = withQuery(url, filters.value)
//     }
//     // TODO Handle errors
//     const res = await useApi(url)
//     const response = <ListResponse>res
//     if (response.pagination) {
//       rows.value = response.results
//       pagination.value = response.pagination
//     } else {
//       rows.value = response
//     }

//     if (response.filterData) {
//       filterData.value = response.filterData
//     }
//     initiallyLoaded.value = true
//     loading.value = false
//   } catch (e) {
//     loading.value = false
//   }
// }
const loadData = async (endpoint: string = '') => {

  try {
    const { $auth } = useNuxtApp()
    console.log('$auth?.user.value?.token:', $auth?.user.value?.token);

    if (!props.endpoint || props.data) return;

    const requestBody = {
      take: 10,
      skip: 0,
      externalFilter: {},

    };
    loading.value = true;
    let url = withoutTrailingSlash(endpoint || props.endpoint);
    if (searchQuery.value) {
      url = withQuery(url, { search: searchQuery.value })
    }
    if (filters.value) {
      url = withQuery(url, filters.value)
    }
    const res = await useApi(url, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$auth?.user.value?.token || ''}`

      },
      body: JSON.stringify(requestBody),
    });
    const responseData = res.data.data;
    const response = <ListResponse>responseData;
    console.log('response for table', res)

    if (response.pagination) {
      rows.value = response.results;
      pagination.value = response.pagination;
    } else {
      rows.value = response;
    }

    if (response.filterData) {
      filterData.value = response.filterData;
    }

    initiallyLoaded.value = true;
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }


  //let url = withQuery(withoutTrailingSlash(endpoint || props.endpoint),)
  // {page: page.value.toString()}



};

const editHandler = async (row: any) => {
  emit('edit', row.id || row)
  selectedId.value = row.id
  //isOpenModal.value = true
}
loadData()

const pageChanged = (newVal: number) => {
  let url = route.fullPath
  loading.value = true
  rows.value = []
  if (page.value == 1) {
    url = withQuery(url, { page: undefined })
  } else {
    url = withQuery(url, { page: page.value.toString() })
  }
  router.push(url)
  loadData()
}

const performFilter = () => {
  let url = route.fullPath
  url = withQuery(url, { page: undefined })
  if (searchQuery.value) {
    url = withQuery(url, { search: searchQuery.value })
  } else {
    url = withQuery(url, { search: undefined })
  }
  // TODO Check filters
  router.push(url)
  page.value = 1
  loadData()
}

const performReset = () => {
  page.value = 1
  searchQuery.value = ''
  filters.value = {}
  let url = route.path
  router.push(url)
  loadData()
}

interface EventData {
  action: string
  obj: Record<string, any>
  el: HTMLInputElement
  change?: Record<string, any>
  callback?: () => void
}

function onDelete(id: number) {
  emit('delete')
  if (props.endpoint) {
    useModal()
      .confirmAction('delete')
      .then(() => {
        useApi(`${withTrailingSlash(props.endpoint)}${id}`, { method: 'DELETE' })
          .then(() => {
            toast.success('Deleted successfully')
            loadData()
          })
          .catch((error: any) => {
            if (error.response.status == 400) {
              console.log('error', error.response._)
              let message = error.response._data.detail[0]?.msg || error.response._data.detail
              if (message) {
                toast.error(message, {
                  timeout: 2000,
                })
                return
              }
            }
          })
      })
  }
}
defineExpose({
  loadData,
});
</script>

<style lang="scss">
.computed-filter {
  .v-select {
    height: 100%;
  }

  .v-select.input-primary {
    padding-top: 1rem;
  }
}
</style>
