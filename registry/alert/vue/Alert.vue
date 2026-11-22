<script setup lang="ts">
const props = withDefaults(defineProps<{ variant?: "default" | "destructive" }>(), { variant: "default" });
</script>

<template>
  <div data-slot="alert" role="alert" :class="['alert', { 'theme-danger': props.variant === 'destructive' }]">
    <slot />
  </div>
</template>
