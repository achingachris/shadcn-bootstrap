<script setup lang="ts">
// Attributes such as id, name, disabled and aria-label go to the <input>;
// class and style stay on the wrapper.
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

// v-model for a controlled switch, or default-checked for an uncontrolled one.
const props = withDefaults(defineProps<{ size?: "sm" | "default" | "lg"; defaultChecked?: boolean }>(), { size: "default" });
const checked = defineModel<boolean>();
if (checked.value === undefined) checked.value = props.defaultChecked ?? false;
const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    data-slot="switch"
    :class="['switch', { 'switch-sm': props.size === 'sm', 'switch-lg': props.size === 'lg' }, attrs.class]"
    :style="attrs.style as any"
  >
    <input v-model="checked" v-bind="inputAttrs" type="checkbox" role="switch">
  </div>
</template>
