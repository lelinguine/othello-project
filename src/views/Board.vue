<template>
  <div class="container">
      <div class="title"><h1>Board</h1><p><mark class="alternative">{{ this.$route.name }}</mark></p></div>
      <a class="back" @click="goBack"><img src="../assets/icons/arrow.png" alt="" width="30">Back</a>

      <div class="view">

        <Grid/>
        
      </div>
  </div>
</template>

<script>
  import Grid from './../components/Grid.vue';

  export default {
    name: 'Board-View',
    components: {
      Grid
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>
</style>
