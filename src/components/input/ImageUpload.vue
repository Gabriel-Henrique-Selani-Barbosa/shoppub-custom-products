<script setup lang="ts">
import { IStep } from '@/models';
import { Cropper } from 'vue-advanced-cropper';
import VerticalButtons from '../VerticalButtons.vue';
import CustomBackgroundWrapper from './CustomBackgroundWrapper.vue';
import 'vue-advanced-cropper/dist/style.css';

import flipHorizontal from "@/assets/icons/flip-horizontal.svg";
import flipVertical from "@/assets/icons/flip-vertical.svg";
import rotateClockwise from "@/assets/icons/rotate-clockwise.svg";
import rotateCounterClockwise from "@/assets/icons/rotate-counter-clockwise.svg";
import zoomIn from "@/assets/icons/zoom-in.svg";
import zoomOut from "@/assets/icons/zoom-out.svg";

interface IImageSelect {
  step?: IStep<any, any, any>
}

const props = defineProps<IImageSelect>();
const options = {
  viewMode: 1,
  aspectRatio: 1,
  dragMode: 'move',
  guides: true,
  center: true,
  highlight: true,
  cropBoxMovable: true,
  cropBoxResizable: false,
  toggleDragModeOnDblclick: false,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
};
const resizeImage = {
  adjustStencil: false,
  touch: false,
  wheel: {
    ratio: 0.1
  },
}
const stencilProps = {
  aspectRatio: 1,
}
const change = ({ image, canvas }: any) => {
  if (props.step?.children) {
    props.step.children.find(item => item.category === 'image-upload').config.children = [
      {
        type: "image-updated",
        name: "custom image",
        config: {
          base64_original: image.src,
          base64_cropped: canvas.toDataURL(),
          views: []
        },
        children: []
      }
    ]
  }
}
const zoom = (factor: number) => {
  cropperRef.value?.zoom(factor);
}
const flip = (x: boolean, y: boolean) => {
  cropperRef.value?.flip(x, y);
}
const rotate = (angle: number) => {
  cropperRef.value?.rotate(angle)
}
const cropperRef = ref<typeof Cropper | null>(null);
const onFileChange = (event: any) => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (props.step?.children) {
        props.step.children.find(item => item.category === 'image-upload').config.uploaded_file_name = files[0].name;
        props.step.children.find(item => item.category === 'image-upload').config.uploaded_image = reader.result as string;
      }
    };
  }
};
</script>

<template>
  <div>
    <div class="file-drop-area">
      <span class="fake-btn">Choose files</span>
      <span class="file-msg">{{ props.step?.children?.find(item => item.category === 'image-upload').config.uploaded_file_name || 'or drag and drop files here.' }}</span>
      <input class="file-input" type="file" accept="image/*" @change="onFileChange">
    </div>
    <div v-if="props.step?.children?.find(item => item.category === 'image-upload').config.uploaded_image" class="image-update-cropper">
      <cropper class="cropper" :options="options" @change="change" :zoom="zoom" :transitions="true" :src="props.step?.children?.find(item => item.category === 'image-upload').config.uploaded_image"
        :resize-image="resizeImage" :stencil-props="stencilProps" :background-wrapper-component="CustomBackgroundWrapper"
        image-restriction="stencil" ref="cropperRef" />
      <vertical-buttons>
        <square-button title="Flip Horizontal" @click="flip(true, false)">
          <img :src="flipHorizontal" alt="flip-horizontal" />
        </square-button>
        <square-button title="Flip Vertical" @click="flip(false, true)">
          <img :src="flipVertical" alt="flip-vertical" />
        </square-button>
        <square-button title="Rotate Clockwise" @click="rotate(90)">
          <img :src="rotateClockwise" alt="rotate-clockwise" />
        </square-button>
        <square-button title="Rotate Counter-Clockwise" @click="rotate(-90)">
          <img :src="rotateCounterClockwise" alt="rotate-counter-clockwise" />
        </square-button>
      </vertical-buttons>
      <vertical-buttons position="right">
        <square-button title="Flip Horizontal" @click="zoom(2)">
          <img :src="zoomIn" alt="flip-horizontal" />
        </square-button>
        <square-button title="Flip Vertical" @click="zoom(0.5)">
          <img :src="zoomOut" alt="flip-vertical" />
        </square-button>
      </vertical-buttons>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-update-cropper {
  position: relative;
}

.cropper {
  height: 280px;
}

.file-drop-area {
  margin-bottom: 10px;
  ;
  background: #eeeeee;
  font-family: 'Lato', sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  width: 450px;
  max-width: 100%;
  padding: 25px;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  transition: 0.2s;

  &.is-active {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

.fake-btn {
  flex-shrink: 0;
  background-color: var(--color-tertiary);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  padding: 8px 15px;
  margin-right: 10px;
  font-size: 12px;
  text-transform: uppercase;
}

.file-msg {
  color: rgba(0, 0, 0, 0.6);
  font-size: small;
  font-weight: 300;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;

  &:focus {
    outline: none;
  }
}

footer {
  margin-top: 50px;

  a {
    color: rgba(255, 255, 255, 0.4);
    font-weight: 300;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
}
</style>