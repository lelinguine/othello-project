<template>
    <h1>{{ msg }}</h1>
    <slot></slot>
</template>

<script setup>
export default {
  name: 'test',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>