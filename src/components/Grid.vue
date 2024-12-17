<template>
    <div id="grid-container"></div>
    <div id="timer"></div>
    <div id="context"><p>You don't want to play with me?</p></div>
</template>

<script>
  import dom from './../logic/dom.mjs';

  export default {
    name: 'Grid-Component',
    mounted() {
      dom();
    }
  };
</script>

<style>
</style>