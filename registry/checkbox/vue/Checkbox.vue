<script setup lang="ts">
// v-model for a controlled checkbox, or default-checked for an uncontrolled one.
const props = defineProps<{ defaultChecked?: boolean; indeterminate?: boolean }>();
const checked = defineModel<boolean>();
if (checked.value === undefined) checked.value = props.defaultChecked ?? false;
</script>

<template>
  <input
    v-model="checked"
    type="checkbox"
    data-slot="checkbox"
    class="check"
    :indeterminate="props.indeterminate"
  >
</template>
