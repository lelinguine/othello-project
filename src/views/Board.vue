<template>
  <div class="container">
      <div class="title">
        <h1>Board</h1>
        <p><mark class="alternative">{{ this.$route.name }}</mark></p>
      </div>
      <a class="back" @click="goBack"><img src="../assets/icons/arrow.png" alt="" width="30">Back</a>
      <div class="view">
        <Grid />
      </div>

      <div id="score" class="score-display">
        Noir : <span id="score-black">{{ scoreBlack }}</span> |
        Blanc : <span id="score-white">{{ scoreWhite }}</span>
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
    data() {
      return {
        scoreBlack: 0, // Score du joueur noir
        scoreWhite: 0, // Score du joueur blanc
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      // Met à jour le score à partir de l'événement émis
      updateScore(event) {
        const { black, white } = event.detail; // Récupérer les scores depuis l'événement
        this.scoreBlack = black;
        this.scoreWhite = white;
      },
    },
    mounted() {
      // Écouter l'événement global émis par Game.mjs
      window.addEventListener('score-update', this.updateScore);
    },
    beforeUnmount() {
    // Nettoyer l'écouteur pour éviter les fuites de mémoire
    window.removeEventListener('score-update', this.updateScore);
    },
  };
</script>

<style scoped>
.score-display {
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>

