<template>
    <div id="grid-container"></div>
    <div id="timer"></div>
    <div id="context"><p>You don't want to play with me?</p></div>
</template>

<script>
  import { board, unboard } from '../logic/board.mjs';

  export default {
    name: 'Grid-Component',
    mounted() {
      board(this.$route.name);
    },
    beforeUnmount() {
      unboard();
    }
  };
</script>

<style>
</style>