<script setup lang="ts">
const props = defineProps<{ position?: 'right' | 'left' }>();


</script>

<template>
	<div class="vertical-buttons" :class="`vertical-buttons-${position || 'left'}`">
		<slot />
	</div>
</template>

<style lang="scss">
.vertical-buttons {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	&-left {
		left: 10px;
	}
	&-right {
		right: 10px;
	}
}
</style>