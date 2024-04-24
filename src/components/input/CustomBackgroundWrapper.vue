<template>
    <div>
        <transformable-image :touch-move="touchMove" :touch-resize="touchResize" :mouse-move="mouseMove"
            :wheel-resize="wheelResize" :events-filter="eventsFilter" @move="handleMove" @resize="handleResize">
            <slot />
            <div class="cropper-event-notification" :class="{ 'cropper-event-notification--visible': notificationVisible }">
                {{
                    notificationType === "wheel"
                    ? "Use ctrl + scroll to zoom the cropper"
                    : "Use two fingers to move the cropper"
                }}
            </div>
        </transformable-image>
    </div>
</template>
  
<script lang="ts">
import debounce from "debounce";
import { defineComponent, reactive } from 'vue';
import { TransformableImage } from "vue-advanced-cropper";

export default defineComponent({
    components: {
        TransformableImage,
    },
    props: ["touchMove", "mouseMove", "touchResize", "wheelResize"],
    setup(_props, { emit }) {
        const notificationVisible = ref(false)
        const notificationType = ref<string | null>(null)

        const state = reactive({
            notificationVisible,
            notificationType,
            hideNotifications: debounce(() => {
                state.notificationVisible = false;
            }, 1000),
        });

        function eventsFilter(nativeEvent: any, transforming: any) {
            if (
                nativeEvent.type === "touchstart" ||
                nativeEvent.type === "touchmove"
            ) {
                if (nativeEvent.touches.length === 1 && !transforming) {
                    state.notificationVisible = true;
                    state.notificationType = "touch";
                    state.hideNotifications();
                    return false;
                } else {
                    state.notificationVisible = false;
                }
            } else if (nativeEvent.type === "wheel") {
                if (!transforming && !nativeEvent.ctrlKey) {
                    state.notificationVisible = true;
                    state.notificationType = "wheel";
                    state.hideNotifications();
                    return false;
                } else {
                    state.notificationVisible = false;
                }
            }
            nativeEvent.preventDefault();
            nativeEvent.stopPropagation();
            return true
        }

        function handleMove(event: any) {
            emit('move', event);
        }

        function handleResize(event: any) {
            emit('resize', event);
        }

        return {
            notificationVisible,
            notificationType,
            eventsFilter,
            handleMove,
            handleResize,
        }
    }
});
</script>
  
<style lang="scss">
.cropper-event-notification {
    background: #00000066;
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    transition: opacity 0.5s;
    opacity: 0;
    pointer-events: none;
    padding-left: 50px;
    padding-right: 50px;

    &--visible {
        transition: opacity 0.25s;
        pointer-events: all;
        opacity: 1;
    }
}
</style>
  