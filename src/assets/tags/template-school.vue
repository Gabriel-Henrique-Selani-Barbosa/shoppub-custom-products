<template>
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="width" :height="height"
    viewBox="0, 0, 2260,946" version="1.1">
        <defs>
            <pattern id="school-pattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
                <image :href="urlImage" x="0" y="0" width="100%" height="100%" />
            </pattern>
        </defs>
        <image :style="{display: urlImage ? 'block' : 'none'}" :href="urlImage" x="0" y="0" width="100%" height="100%"/>
        <path id="clipPath" :fill="urlImage ? `transparent` : fillBackground"
            d="M 444.5,-0.5 C 463.5,-0.5 482.5,-0.5 501.5,-0.5C 595.719,5.96064 680.719,37.1273 756.5,93C 1241.17,93.3333 1725.83,93.6667 2210.5,94C 2228.4,97.5706 2242.24,107.071 2252,122.5C 2255.22,129.021 2257.72,135.688 2259.5,142.5C 2259.5,362.5 2259.5,582.5 2259.5,802.5C 2255.21,822.976 2243.54,837.809 2224.5,847C 2219.95,848.741 2215.28,850.074 2210.5,851C 1725.83,851.333 1241.17,851.667 756.5,852C 680.719,907.873 595.719,939.039 501.5,945.5C 482.5,945.5 463.5,945.5 444.5,945.5C 300.034,933.529 183.201,870.862 94,757.5C 37.5372,681.539 6.03718,596.206 -0.5,501.5C -0.5,482.167 -0.5,462.833 -0.5,443.5C 10.9987,301.649 71.9987,186.483 182.5,98C 259.87,39.1678 347.204,6.33446 444.5,-0.5 Z">
        </path>
    </svg>
</template>
  
<script setup lang="ts">
interface ITag {
    fillBackground?: string;
    urlImage?: string,
    width: string | number
    height: string | number
}

const props = defineProps<ITag>();
</script>
  