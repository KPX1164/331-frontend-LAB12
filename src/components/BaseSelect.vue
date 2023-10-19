<template>
  <label v-if="label">{{ label }}</label>
  <select
    class="field"
    :value="modelValue"
    v-bind="{ ...$attrs, onChange: ($event) => $emit('update:modelValue', ($event.target as HTMLSelectElement)?.value) }"
  >
    <option
      v-for="option in options"
      :value="option.id"
      :key="option.id"
      :selected="option.id === modelValue"
    >{{ option.name }}</option>
  </select>
</template>

<script lang="ts">
import type { PropType } from 'vue';

interface Option {
  id: string | number;
  name: string;
}

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
  },
};
</script>
