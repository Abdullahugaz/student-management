declare module '@/components/ui/GlobalForm.vue' {
  export interface GlobalFormProps {
    formId?: string
    submitButtonId?: string
    novalidate?: boolean
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    action?: string
    formClass?: string
    loading?: boolean
    disabled?: boolean
  }

  export interface GlobalFormEmits {
    handleSubmit: (event?: Event) => void
    submitStart: () => void
    submitEnd: () => void
    validationError: (errors: any[]) => void
  }

  export interface GlobalFormExposed {
    submit: () => void
    reset: () => void
    setLoading: (loading: boolean) => void
    setDisabled: (disabled: boolean) => void
    isLoading: boolean
    isDisabled: boolean
  }

  export default class GlobalForm {
    $props: GlobalFormProps
    $emit: GlobalFormEmits
    $expose: GlobalFormExposed
  }
} 