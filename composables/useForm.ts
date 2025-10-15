import {ComponentInternalInstance, SetupContext} from '@vue/runtime-dom'
import {Ref} from 'vue'
import * as pkg from 'vue-toastification'
import {withTrailingSlash, withoutTrailingSlash, joinURL} from 'ufo'
import {useVuelidate} from '@vuelidate/core'

interface FormOption {
    needFormData?: boolean
    needToFetch?: boolean
    needToRedirect?: boolean
    redirectURl?: string
    message?: string
    requestUrl?: string
    id?: any,
    hideToast: boolean
}

let defaultOption = {
    needFormData: false,
    needToFetch: false,
    needToRedirect: true,
    redirectURl: '',
    message: '',
    requestUrl: '',
    id: 0,
    hideToast: false
}

const parseError = (error: any) => {
    let dct: Record<string, Record<string, string>> = {}
    const errorData = error.data
    // parse pydantic error
    if (errorData.detail as Array<{ loc: [string, string]; msg: string; type: string }>) {
        errorData.detail.forEach((e: { loc: [string, string]; msg: string; type: string }) => {
            if (e.loc[0] === 'body') {
                if (e.msg === 'field required') {
                    dct[e.loc[1]] = {}
                    dct[e.loc[1]]['message'] = 'This field is required'
                } else {
                    dct[e.loc[1]] = {}
                    dct[e.loc[1]]['message'] = e.msg
                }
            }
        })
    }
    return dct
}


export const useForm = async (endpoint: string, options: FormOption = defaultOption) => {
    const root:
        | (ComponentInternalInstance & {
        setupContext?: { emit: (signal: string) => void }
    })
        | null = getCurrentInstance()
    const id = options.id ? options.id.toString() : (<number>root?.attrs['editing-id'])?.toString()
    const isEdit: boolean = !!id

    let baseEndpoint = endpoint
    if (options.needToFetch) {
        baseEndpoint = endpoint
    } else if (isEdit) {
        if (baseEndpoint.endsWith('/create')) {
            baseEndpoint = baseEndpoint.slice(0, -7)
        }
        baseEndpoint = withoutTrailingSlash(joinURL(baseEndpoint.replace('list', 'init'), id.toString()))
    }
    const saveLabel: string = isEdit ? 'Update' : 'Add'
    const {useToast} = pkg
    const toast = useToast()
    const fields: Ref<Record<string, any>> = ref({})
    const rules: Ref<Record<string, any>> = ref({})
    const errors: Ref<Record<string, any>> = ref({})
    const loading = ref(false)
    const formDefaults = ref({})
    const route = useRoute()
    const router = useRouter()
    const config = useRuntimeConfig()
    const v$ = useVuelidate(rules, fields)

    const loadInitialData = async () => {
        let response = await useApi(baseEndpoint) as Record<string, any>
        fields.value = response?.data?.applicationUser || response?.data?.applicationRole
        console.log('editdata', response)
    }
    if (isEdit || options.needToFetch) {
        await loadInitialData()
    }

    const prePayLoad: Ref<any> = ref({});


    const isVoidFunction = function (func: any) {
        return func() === undefined;
    }
    const formSubmit = async () => {
        console.log('Form submitted successfully!');
        console.log('url',options)
        loading.value = true
        errors.value = {}
        // form validation
        if (Object.keys(rules.value).length > 0) {
            v$.value.$validate()
            console.log('formsubmit error', v$.value)
            if (v$.value.$error) {
                loading.value = false
                return false
            }
        }

        // check if any field is a file
        let hasFile = Object.values(fields.value).some(
            (val) => val instanceof File || (Array.isArray(val) && val.length && val[0] instanceof File)
        )
        hasFile = options.needFormData || hasFile

        let requestData: Record<string, any>
        if (hasFile) {
            requestData = new FormData()
            for (var key in fields.value) {
                let field = fields.value[key]
                if (field === '') {
                    field = null
                }
                if (Array.isArray(field) && field.length && field[0] instanceof File) {
                    field.forEach((f, index) => {
                        requestData.append(`${key}[]`, f)
                    })
                } else {
                    requestData.append(key, field)
                }
            }
        } else {

            requestData = {}
            console.log('prr',prePayLoad.value)
            if (typeof prePayLoad.value == "object"  || isVoidFunction(prePayLoad.value)) {

                Object.keys(fields.value).map((key, index) => {
                    const val = fields.value[key]
                    if (val === '') {
                        requestData[key] = null
                    } else {
                        requestData[key] = val
                    }
                })
            } else {
                requestData = prePayLoad.value();
            }
         

        }
        try {
            if (baseEndpoint.endsWith(API.INITIAL_DATA)) {
                baseEndpoint = baseEndpoint.replace(API.INITIAL_DATA, '')
            }
            const url = options?.requestUrl || baseEndpoint
            const response = await useApi(url, {
                method: isEdit || options.needToFetch ? 'PATCH' : 'POST',
                body: requestData,
            })
            loading.value = false
            if (response) {
                if (!options.hideToast) {
                    if (options.message) {
                        toast.success(options.message, {
                            timeout: 2000,
                        })
                    } else {
                        toast.success(isEdit || options.needToFetch ? MESSAGE.UPDATE_SUCCESS : MESSAGE.ADD_SUCCESS, {
                            timeout: 2000,
                        })
                    }
                }
                if (!options.needToRedirect) {
                    return true
                }
                router.back()
            }
       } catch (error: any) {
            loading.value = false
            console.log('error',error.response.status)
            if (error.response.status == 400) {
                let message = error.response._data.detail
                message = Array.isArray(message) ? message[0]?.msg || message[0] : message
                if (message) {
                    toast.error(message, {
                        timeout: 2000,
                    })
                }
                return false
            }
            if (error.response.status == 422) {
                let message = error.response._data.detail
                message = Array.isArray(message) ? message[0]?.msg || message[0] : message
                if (message) {
                    toast.error(message, {
                        timeout: 2000,
                    })
                    return false
                } else {
                    toast.error(isEdit ? MESSAGE.UPDATE_FAIL : MESSAGE.ADD_FAIL, {
                        timeout: 2000,
                    })
                    return false
                }
            }

            // TODO Only parse for 400 and 406
            errors.value = parseError(error)
            return false
        }
   }
    const login = async () => {
        v$.value.$validate();
        if (v$.value.$error) {
            return false;
        }

        let requestData = {
            username: fields.value.username,
            password: fields.value.password,
        };

        try {
            let res = await $fetch('https://mirspecf.mtradeasia.com:8443/api/account/login', {
                method: isEdit || options.needToFetch ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(requestData),
            });

            return res;
        } catch (error: any) {
            console.error('API Error:', error);

            if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                let message = error.response._data.detail;
                message = Array.isArray(message) ? message[0]?.msg || message[0] : message;
                if (message) {
                    toast.error(message, {
                        timeout: 2000,
                    });
                    return;
                }
            }

            if (error.response && error.response.status === 422) {
                toast.error('Login failed. Please check your credentials.', {
                    timeout: 2000,
                });
                // You may want to handle additional error scenarios specific to your application.
            }

            // Handle other HTTP status codes as needed.

            return false;
        }

    };


    return {
        fields,
        errors,
        loading,
        formDefaults,
        isEdit,
        id,
        toast,
        formSubmit,
        route,
        router,
        saveLabel,
        login,
        v$,
        rules,
        prePayLoad
    }
}
