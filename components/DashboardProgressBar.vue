<template>
    <div class="grid grid-cols-8 gap-8">
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">0</text>
                    <p class="text-center...">Product & Services</p>

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">643</text>
                    <p class="text-center...">Maker</p>

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">110</text>
                    <p class="text-center...">Checker</p>

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">0</text>
                    <p class="text-center...">New</p>
                   

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">18</text>
                    <p class="text-center...">Inbound Process</p>

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">567</text>
                    <p class="text-center...">Outbound Process</p>

            </svg>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">56</text>
                </svg>
                <p class="text-center...">Reprocess</p>
        </div>
        <div class="">
            <svg class="w-20 h-20" viewBox="0 0 50 50">
                <circle class="text-gray-200 stroke-current" stroke-width="5" cx="25" cy="25" r="20" fill="transparent">
                </circle>
                <circle class="text-cyan-300 progress-ring__circle stroke-current" stroke-width="5" stroke-linecap="round"
                    cx="25" cy="25" r="20" fill="transparent" stroke-dashoffset="calc(200 - (200 * 25) / 50)"></circle>
                <text x="25" y="25" font-family="Verdana" font-size="8" text-anchor="middle"
                    alignment-baseline="middle">118</text>
                    <p class="text-center...">Refund</p>

            </svg>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    required: {
        type: Boolean,
        default: false,
    }
})
</script>
