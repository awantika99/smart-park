<template>
  <div class="flex items-center gap-2 pt-4 text-xs" v-if="totalPages != 0">
    <button @click="changePage(thisPage - 1)" class="rounded px-3 h-8 flex items-center" :disabled="thisPage === 1">
      <Icon
        name="material-symbols:arrow-back-ios-new"
        class="text-red-400 dark:text-blue-400"
        :class="{
          'text-red-200 dark:text-blue-200': thisPage === 1,
        }"
      />
    </button>
    <button @click="changePage(1)" class="p-3 h-8 flex items-center" :class="thisPage === 1 ? 'text-red-500 dark:text-blue-500 dark:text-blue-500' : ' '">
      1
    </button>
    <button
      v-if="totalPages >= 2"
      :disabled="(totalPages <= 7 ? 2 : thisPage > 4 ? '...' : 2) == '...'"
      @click="changePage(totalPages <= 7 ? 2 : thisPage > 4 ? '' : 2)"
      class="p-3 h-8 flex items-center"
      :class="thisPage === 2 ? 'text-red-500 dark:text-blue-500' : ' '"
    >
      {{ totalPages <= 7 ? 2 : thisPage > 4 ? '...' : 2 }}
    </button>
    <button
      v-if="totalPages >= 3"
      @click="
        changePage(totalPages <= 7 ? 3 : thisPage < 4 ? 3 : thisPage > totalPages - 4 ? totalPages - 4 : thisPage - 1)
      "
      class="p-3 h-8 flex items-center"
      :class="
        thisPage ===
        (totalPages <= 7 ? 3 : thisPage < 4 ? 3 : thisPage > totalPages - 4 ? totalPages - 4 : thisPage - 1)
          ? 'text-red-500 dark:text-blue-500'
          : ' '
      "
    >
      {{ totalPages <= 7 ? 3 : thisPage < 4 ? 3 : thisPage > totalPages - 4 ? totalPages - 4 : thisPage - 1 }}
    </button>
    <button
      v-if="totalPages >= 4"
      @click="
        changePage(
          totalPages <= 7 ? 4 : thisPage < 5 ? 4 : thisPage > 4 && thisPage < totalPages - 3 ? thisPage : totalPages - 3
        )
      "
      class="p-3 h-8 flex items-center"
      :class="
        thisPage ===
        (totalPages <= 7 ? 4 : thisPage < 5 ? 4 : thisPage > 4 && thisPage < totalPages - 3 ? thisPage : totalPages - 3)
          ? 'text-red-500 dark:text-blue-500'
          : ' '
      "
    >
      {{
        totalPages <= 7 ? 4 : thisPage < 5 ? 4 : thisPage > 4 && thisPage < totalPages - 3 ? thisPage : totalPages - 3
      }}
    </button>
    <button
      v-if="totalPages >= 5"
      @click="
        changePage(
          totalPages <= 7
            ? 5
            : thisPage < 5
            ? 5
            : thisPage > 4 && thisPage < totalPages - 3
            ? thisPage + 1
            : totalPages - 2
        )
      "
      class="border 0 rounded p-3 h-8 flex items-center"
      :class="
        thisPage ===
        (totalPages <= 7
          ? 5
          : thisPage < 5
          ? 5
          : thisPage > 4 && thisPage < totalPages - 3
          ? thisPage + 1
          : totalPages - 2)
          ? 'text-red-500 dark:text-blue-500'
          : ' '
      "
    >
      {{
        totalPages <= 7
          ? 5
          : thisPage < 5
          ? 5
          : thisPage > 4 && thisPage < totalPages - 3
          ? thisPage + 1
          : totalPages - 2
      }}
    </button>

    <button
      :disabled="(totalPages <= 7 ? 6 : thisPage < totalPages - 3 ? '...' : totalPages - 1) == '...'"
      v-if="totalPages >= 6"
      @click="changePage(totalPages <= 7 ? 6 : thisPage < totalPages - 3 ? '...' : totalPages - 1)"
      class="p-3 h-8 flex items-center"
      :class="
        thisPage === (totalPages <= 7 ? 6 : thisPage < totalPages - 3 ? '...' : totalPages - 1) ? 'text-red-500 dark:text-blue-500' : ' '
      "
    >
      {{ totalPages <= 7 ? 6 : thisPage < totalPages - 3 ? '...' : totalPages - 1 }}
    </button>

    <button
      v-if="totalPages >= 7"
      @click="changePage(totalPages)"
      :class="thisPage === totalPages ? 'text-red-500 dark:text-blue-500' : ' '"
      class="border rounded p-3 h-8 flex items-center"
    >
      {{ totalPages }}
    </button>

    <button
      @click="changePage(thisPage + 1)"
      class="rounded px-3 h-8 flex items-center"
      :class="thisPage !== totalPages ? 'border ' : ' '"
      :disabled="thisPage === totalPages"
    >
      <Icon
        name="ic:outline-arrow-forward-ios"
        class="text-red-400 dark:text-blue-400"
        :class="{
          'text-red-200 dark:text-blue-200': thisPage === totalPages,
        }"
      />
    </button>
    <p class="ml-auto">{{(thisPage-1)*20+1 }} - {{ totalRecords<(thisPage * 20)?totalRecords:thisPage * 20 }} of {{ totalRecords }} items</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  totalRecords:{
    type: Number,
    required: true,
  }
})

const thisPage = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    thisPage.value = props.modelValue
  }
)

const changePage = (p: number | string) => {
  if (typeof p !== 'number') return
  thisPage.value = p
  emit('update:modelValue', thisPage.value)
}
</script>
