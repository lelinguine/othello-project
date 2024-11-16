<template>
    <div id="grid-container"></div>
</template>

<script>
  import dom from './../logic/dom.mjs';

  export default {
    name: 'Grid-Component',
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    mounted() {
      dom();
    }
  };
</script>

<style>
</style>