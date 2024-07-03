<template>
  <div class="app-input">
    <label class="app-input__label" :for="id">{{ label }}</label>
    <input class="app-input__input" :type="type" v-model="localModelValue" :id="id" />
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  id: { type: String, default: '' }
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const localModelValue: Ref<string | number> = ref(props.modelValue)

watch(localModelValue, (newValue: string | number) => {
  emit('update:modelValue', newValue)
})
</script>

<style src="./AppInput.scss"></style>
