<script setup lang="ts">
import { buttonVariants, type ButtonSize, type ButtonVariant } from ".";

const props = withDefaults(defineProps<{ variant?: ButtonVariant; size?: ButtonSize; as?: string }>(), {
  variant: "default",
  size: "default",
  as: "button",
});
</script>

<template>
  <component :is="props.as" data-slot="button" :class="buttonVariants({ variant: props.variant, size: props.size })">
    <slot />
  </component>
</template>
