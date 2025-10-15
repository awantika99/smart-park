<template>
    <DetailBox title="User Role">
        <form @submit.prevent="handleSubmit()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                    <div>
                        <ALabel for="role-name" :required="true">Name</ALabel>
                        <input type="text" class="input-primary mt-1" v-model="fields.name" id="role-name" />
                        <ValidationMessage>{{ v$.name?.$errors[0]?.$message }}</ValidationMessage>
                    </div>
                    <p class="text-xs text-red-500 mt-1" v-if="errors.name">{{ errors.name.message }}</p>
                </div>
                <div></div>
                <div>
                    <div>
                        <ALabel for="role-description">Description <span class="text-red-500"></span></ALabel>
                        <textarea type="text" rows="2" class="resize input-primary mt-1" v-model="fields.description"
                            id="role-description" />
                    </div>
                    <p class="text-xs text-red-500 mt-1" v-if="errors.description">{{ errors.description.message }}</p>
                </div>
                <div></div>
                <div>
                    <div>
                        <ALabel for="role-is-active">Active <span class="text-red-500"></span></ALabel> <br />
                        <!-- <input type="checkbox"  role="switch" class="" v-model="fields.call_for_action" /> -->
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fields.is_active" class="sr-only peer" id="role-is-active" />
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                        </label>
                    </div>
                    <p class="text-xs text-red-500 mt-1" v-if="errors.is_active">{{ errors.is_active.message }}</p>
                </div>
            </div>
            <div class="">
                <div class="mt-3">
                    <UCard>
                        <template #header>
                            <div class="custom-header">
                                <ALabel>User Access Right </ALabel>
                            </div>
                        </template>
                        <UCheckbox v-model="selected" :indeterminate="indeterminate" color="primary"
                            @click.stop="updateAllPermission()" :label="selected ? 'Uncheck All' : 'Check All'"
                            id="role-all-update" class="mb-5" :ui="{ label: 'text-base font-semibold ms-1' }" />
                        <hr />
                        <UAccordion color="promary" variant="outline" :items="menuGroup" multiple>
                            <template #default="{ item, index, open }">
                                <UButton color="gray" variant="ghost"
                                    class="border-b border-gray-200 dark:border-gray-700 disabled:cursor-pointer disabled:opacity-100"
                                    id="role-input" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                                    <template #leading>
                                        <UCheckbox v-model="item.selected" color="primary"
                                            @click.stop="updateModuleCheckUncheck(item, index)" :name="index.toString()"
                                            id="role-update" :indeterminate="item.indeterminate" />
                                    </template>
                                    <p class=" text-base font-semibold ms-1">{{ item.title }} </p>
                                    <template #trailing>
                                        <UIcon name="i-heroicons-chevron-right-20-solid"
                                            class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                            :class="[open && 'rotate-90']" />
                                    </template>
                                </UButton>
                            </template>
                            <template #item="{ item, index }">
                                <div class="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-4 ms-5">
                                    <UAccordion color="promary" variant="outline"
                                        :items="item.children.length > 0 ? item.children : item.pageActions" multiple>
                                        <template #default="{ item, index, open }">
                                            <UButton color="gray" variant="ghost"
                                                class="border-b border-gray-200 dark:border-gray-700 disabled:cursor-pointer disabled:opacity-100"
                                                id="role-input" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                                                <template #leading>
                                                    <UCheckbox v-model="item.selected" color="primary"
                                                        @click.stop="handleFeatureCheckUncheck(item, index)"
                                                        :indeterminate="item.indeterminate" :name="index.toString()"
                                                        id="role-update" />
                                                </template>
                                                <p class=" text-base font-semibold ms-1">{{ item.title || item.action }}
                                                </p>
                                                <template #trailing>
                                                    <UIcon name="i-heroicons-chevron-right-20-solid"
                                                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                                        :class="[open && 'rotate-90']" />
                                                </template>
                                            </UButton>
                                        </template>
                                        <template #item="{ item, index }">
                                            <div class="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-1">
                                                <div v-for="taskAction in item.pageActions" :key="taskAction.name"
                                                    class="ms-10">
                                                    <UButton color="gray" variant="ghost" class="" id="role-input"
                                                        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-1' } }">
                                                        <template #leading>
                                                            <UCheckbox color="primary" v-model="taskAction.selected"
                                                                @click="updateTaskActionCheckUncheck(taskAction, item)"
                                                                id="role-taskAction" />
                                                        </template>
                                                        <p class="text-base font-semibold ms-1"
                                                            @click="updateTaskActionCheckUncheck(taskAction, item)">{{
                                                                taskAction.action }} </p>
                                                    </UButton>
                                                </div>
                                            </div>
                                        </template>
                                    </UAccordion>
                                </div>
                            </template>
                        </UAccordion>
                    </UCard>
                    <div class="text-red-600 mt-1" v-if="submitted && fields.permissions?.length <= 0">Please select at
                        least one
                        checkbox </div>
                </div>

            </div>
            <div class="flex gap-2 mt-4 md:mt-6">
                <button class="btn" type="submit" id="role-save">Save</button>
                <NuxtLink to="/user-management/userrole" class="btn-secondary" id="role-cancel">Cancel
                </NuxtLink>
            </div>
        </form>
    </DetailBox>
</template>
<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import { useForm } from '~/composables/useForm'
let { fields, errors, rules, v$, formSubmit } = await useForm(API.BOROLE)
import { helpers, required } from '@vuelidate/validators'
import type action from '~/constants/action';
fields.value.permissions = fields.value.pages
const { id } = useRoute().params
const submitted = ref(false);
const selected: Ref<boolean> = ref(false)
const indeterminate: Ref<boolean> = ref(false)
const taskAction = ref({
})
const pageActions = ref([])
const menuGroup: any = ref([])
const pages: any = []
const loadInitialData = async () => {
    try {
        let url = '/api/roles/init';
        const response = await useApi(url);
        console.log('response', response)
        if (response && response.data && response.data.pages) {
            menuGroup.value = response.data.pages;
            console.log('taskAction', menuGroup.value);
            // prepareTaskAction(taskAction.value);
        } else {
            console.error('Invalid API response format');
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
};
onMounted(() => {
    loadInitialData();
});
const checkAllPermission = function () {
    let hasIndeterminate = menuGroup.value?.some((menu: any) => menu.indeterminate);
    if (hasIndeterminate) {
        selected.value = true;
        indeterminate.value = true;
        return;
    }

    let hasSelected = menuGroup.value?.some((menu: any) => menu.selected);
    let hasNotSelected = menuGroup.value?.some((menu: any) => !menu.selected);
    console.log('hasSelected', hasSelected)
    console.log('hasNotSelected', hasNotSelected)

    if (hasSelected && hasNotSelected) {
        selected.value = true;
        indeterminate.value = true;
    } else if (hasSelected) {
        selected.value = true;
        indeterminate.value = false;
    } else {
        selected.value = false;
        indeterminate.value = false;
    }
}
const checkForMenuGroupIndeterminate = (menuGroup: any) => {
    console.log('menuGroup of  checkForMenuGroupIndeterminate', menuGroup)
    let hasIndeterminate = menuGroup.pageActions || (menuGroup.children?.some(
        (feature: any) => feature.indeterminate
    ) ?? false);

    console.log('checkForMenuGroupIndeterminate hasIndeterminate', hasIndeterminate)

    if (hasIndeterminate) {
        menuGroup.selected = true;
        menuGroup.indeterminate = true;
        selected.value = true;
        indeterminate.value = true;
        return;
    }

    let hasSelected = menuGroup.pageActions || (menuGroup.children?.some(
        (feature: any) => feature.selected
    ) ?? false);

    let hasNotSelected = menuGroup.pageActions || (menuGroup.children?.some(
        (feature: any) => feature.selected
    ) ?? false);
    // let hasNotSelected = menuGroup.pageActions?.some(
    //     (feature: any) => !feature.selected
    // );
    console.log('hasSelected checkForMenuGroupIndeterminate', hasSelected)
    console.log('hasNotSelected checkForMenuGroupIndeterminate', hasNotSelected)
    if (hasSelected && hasNotSelected) {
        menuGroup.selected = true;
        menuGroup.indeterminate = true;
        selected.value = true;
        indeterminate.value = true;
    } else if (hasSelected) {
        menuGroup.selected = true;
        menuGroup.indeterminate = false;
        selected.value = false;
        indeterminate.value = false;
    } else {
        menuGroup.selected = false;
        menuGroup.indeterminate = false;
        selected.value = false;
        indeterminate.value = false;
    }
}
const updateFeaturesCheckUncheck = function (item: any,) {
    console.log('updateFeaturesCheckUncheck for item', item)
    console.log('updateFeaturesCheckUncheck for item.children', item.children)
    item.selected = !item.selected;
    console.log('selected of updateFeaturesCheckUncheck', item.selected)
    item.indeterminate = false;
    item.pageActions?.forEach((taskAction: any) => {
        taskAction.selected = item.selected;
        let featureWithTaskAction: [string, string] = [item.action, taskAction.action];

        // const permissionIndex = fields.value.permissions.findIndex(
        //     (permission: any) =>
        //         JSON.stringify(permission) ===
        //         JSON.stringify(featureWithTaskAction)
        // );

        // if (item.selected) {
        //     if (permissionIndex === -1) {
        //         fields.value.permissions.push([...featureWithTaskAction]);
        //     }
        // } else {
        //     if (permissionIndex !== -1) {
        //         fields.value.permissions.splice(permissionIndex, 1);
        //     }
        // }
    });
};

const handleFeatureCheckUncheck = function (item: any, menuGroup: any) {
    let selectedMenuGroup: any = {};
    menuGroup.children?.forEach((menu: any) => {
        let isSelectedMenuGroup = menuGroup.pageActions || (menuGroup.children?.some(
            (feature: any) => feature.action === item.action
        ) ?? false);
        // let isSelectedMenuGroup = menu.children?.some(
        //     (feature: any) => feature.action === item.action
        // );
        if (isSelectedMenuGroup) {
            selectedMenuGroup = menu;
            console.log('handleFeatureschildren', menuGroup.children)
        }
    });
    menuGroup.value?.forEach((menu: any) => {
        let isSelectedMenuGroup = menu.children?.some(
            (feature: any) => feature.action === item.action
        );
        if (isSelectedMenuGroup) {
            selectedMenuGroup = menu;
            console.log('handleFeaturesvalue', menuGroup.value)
        }
    });
    menuGroup.pageActions?.forEach((menu: any) => {
        let isSelectedMenuGroup = menu.children?.some(
            (feature: any) => feature.action === item.action
        );
        if (isSelectedMenuGroup) {
            selectedMenuGroup = menu;
            console.log('handleFeaturespageActions', menuGroup.pageActions)
        }
    });
    updateFeaturesCheckUncheck(item);
    checkForMenuGroupIndeterminate(selectedMenuGroup);
    checkAllPermission();
};

const updateModuleCheckUncheck = async function (item: any, index: any) {
    console.log('item of updateModuleCheckUncheck', item)
    console.log('children of item updateModuleCheckUnchesk ', item.children)
    console.log('index of updateModuleCheckUncheck', index)
    if (item.indeterminate) {
        item.indeterminate = false;
    }
    item.selected = !item.selected;
    item.children?.forEach(async (feature: any) => {
        feature.selected = !item.selected;
        await updateFeaturesCheckUncheck(feature);
        console.log('item.children', item.children)
    });


}
const updateTaskActionCheckUncheck = async function (taskAction: any, item: any) {
    console.log('item', item)
    let selectedMenuGroup = {};
    console.log('menuGroup', menuGroup.value)
    menuGroup.value?.forEach((menu: any) => {
        let isSelectedMenuGroup = menu.children?.some(
            (feature: any) => feature.key === item.key
        );
        if (isSelectedMenuGroup) {
            selectedMenuGroup = menu;

        }
     })
    taskAction.selected = !taskAction.selected;
    let featureWithTaskAction = [item.key, taskAction.pageActionId.toString()];

    if (taskAction.selected) {
        item.selected = true;
        item.indeterminate = item.pageActions?.some((task: { selected: boolean }) => !task.selected);
        console.log('item.taskAction', item.pageActions)
        if (item.indeterminate) {
            console.log('item.indeterminate', item.indeterminate)
            selectedMenuGroup.selected = true;
            selectedMenuGroup.indeterminate = true;
            selected.value = true;
            indeterminate.value = true;
        } else {
            checkForMenuGroupIndeterminate(selectedMenuGroup);
        }
        fields.value.permissions?.push(featureWithTaskAction)
    } else {
        item.selected = true;
        item.indeterminate = item.pageActions?.some((task: { selected: boolean }) => task.selected);

        if (!item.indeterminate) {
            selected.value = true;
            indeterminate.value = true;
            item.selected = false;
            checkForMenuGroupIndeterminate(selectedMenuGroup);
        } else {
            selectedMenuGroup.indeterminate = true;
        }
        const indexToRemove = fields.value.permissions.findIndex(
            (item: any) => JSON.stringify(item) === JSON.stringify(featureWithTaskAction)
        );
        if (indexToRemove !== -1) {
            fields.value.permissions.splice(indexToRemove, 1);
        }
    }
    checkAllPermission()
}


const updateAllPermission = function () {
    fields.value.permissions = [];
    menuGroup.value.forEach((menu: any) => {
        processMenu(menu);
        console.log('menuGroup.value', menuGroup.value)
    });
    menuGroup.children?.forEach((menu: any) => {
        processMenu(menu);
        console.log('menuGroup.children', menuGroup.children)
    });
    menuGroup.pageActions?.forEach((pageAction: any) => {
        if (selected) {
            fields.value.permissions.push([pageAction.featureKey, pageAction.pageActionId.toString()]);
        }
        pageAction.selected = selected;
    });
    console.log('permission', fields.value.permissions);
    function processMenu(menu: any) {
        menu.children?.forEach((feature: any) => {
            feature.pageActions.forEach((taskAction: any) => {
                if (selected) {
                    fields.value.permissions.push([feature.key, taskAction.pageActionId.toString()]);
                }
                taskAction.selected = selected;
            });
            feature.selected = selected;
            feature.indeterminate = false;
        });
        menu.selected = selected;
        menu.indeterminate = false;
        menu.children?.forEach((childMenu: any) => {
            processMenu(childMenu);
            console.log('menu.children', menu.children)
        });
        menu.pageActions?.forEach((childMenu: any) => {
            processMenu(childMenu);
            console.log('menu.pageActions', menu.pageActions)
        });
    }
    // indeterminate = false;
};





const handleSubmit = () => {
    submitted.value = true;
    v$.value.$validate();
    console.log('fields', fields.value.permissions);
    if (fields.value.permissions.length > 0) {
        formSubmit();
    }
};

// watch(() => fields.value.permissions, (newValue) => {
//   if (id && children.value.length == 0) {
//     loadInitialData()
//   }
// })
rules.value = {

    name: { required: helpers.withMessage("Name is required", required), $autodirty: true }
}

</script>
  