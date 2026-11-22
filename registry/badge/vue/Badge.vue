<script setup lang="ts">
import { badgeVariants, type BadgeVariant } from ".";

const props = withDefaults(defineProps<{ variant?: BadgeVariant; as?: string }>(), { variant: "default", as: "span" });
</script>

<template>
  <component :is="props.as" data-slot="badge" :class="badgeVariants({ variant: props.variant })">
    <slot />
  </component>
</template>
