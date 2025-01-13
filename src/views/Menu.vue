<template>
    <div class="container">
        <div class="title"><h1>Othello</h1><p><mark class="alternative">{{ version }}</mark></p></div>
        <p class="rules">How to play? <mark class="default">Each player takes turns placing a piece of their color on the board with the aim of surrounding the opponent's tokens to capture them. The objective is to end the game with the majority of visible pieces of your own color.</mark></p>

        <div class="view">
            <router-link to="/player"><button class="default">Player<img src="../assets/icons/player.png" alt="" width="30"/></button></router-link>
            <router-link to="/multiplayer"><button class="alternative">Multiplayer<img src="../assets/icons/multiplayer.png" alt="" width="30"/></button></router-link>
            <router-link to="/spectator"><button class="alternative">Spectator<img src="../assets/icons/spectator.png" alt="" width="30"/></button></router-link>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'Menu-View',
    data() {
            return {
                version: process.env.VUE_APP_VERSION
            };
        }
    };
</script>

<style scoped>
</style>