<script setup lang="ts">
const model = defineModel<string | number>();
</script>

<template>
  <input v-model="model" data-slot="input" class="form-control">
</template>
