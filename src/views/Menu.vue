<template>
    <div class="absolute">
        <router-link to="/player"><button class="default">Player<img src="../assets/icons/player.png" alt="" width="30"></button></router-link>
        <router-link to="/multiplayer"><button class="alternative">Multiplayer<img src="../assets/icons/multiplayer.png" alt="" width="30"></button></router-link>
        <router-link to="/spectator"><button class="alternative">Spectator<img src="../assets/icons/spectator.png" alt="" width="30"></button></router-link>
    </div>

    <div class="title"><h1>Othello</h1><p><mark class="alternative">{{ version }}</mark></p></div>
    <p class="rules">How to play? <mark class="default">{{ rules }}</mark></p>
</template>

<script>
    export default {
    name: 'Menu-View',
    data() {
            return {
                version: process.env.VUE_APP_VERSION,
                rules: process.env.VUE_APP_RULES
            };
        }
    };
</script>

<style scoped>
</style>