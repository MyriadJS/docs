<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    default: 50
  },
})

const percentage = computed(() => {
  return `${props.percentage}%`
})

const capTrick = computed(() => {
  return props.percentage > 90 ? "100px" : "0px"
})
</script>

<template>
  <div class="range">
    <SliderThumb :offset="percentage" />
  </div>
</template>

<style lang="scss" scoped>
.range-slider .track .range {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  --offset: calc(var(--size) - v-bind(percentage));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: calc(v-bind(percentage));
  height: 100%;

  border-top-right-radius: v-bind(capTrick);
  border-bottom-right-radius: v-bind(capTrick);
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}

.range-slider .track .range::after {
  content: "";
  position: absolute;
  z-index: 0;

  width: 100%;
  height: var(--trackSize, 5px);
  background-color: var(--rangeColor);

  border-top-right-radius: v-bind(capTrick);
  border-bottom-right-radius: v-bind(capTrick);

  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}
</style>