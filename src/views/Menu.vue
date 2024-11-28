<template>
    <div class="container">
        <div class="title"><h1>Othello</h1><p><mark class="alternative">{{ version }}</mark></p></div>
        <p class="rules">How to play? <mark class="default">Each player, black and white, takes turns placing a piece of their color on the board following specific rules. The game ends when neither player can place a piece, and the player with the most pieces of their color on the board wins.</mark></p>

        <div class="view">
            <router-link to="/player"><button class="default" disabled="true">Player<img src="../assets/icons/player.png" alt="" width="30"></button></router-link>
            <router-link to="/multiplayer"><button class="alternative">Multiplayer<img src="../assets/icons/multiplayer.png" alt="" width="30"></button></router-link>
            <router-link to="/spectator"><button class="alternative" disabled="true">Spectator<img src="../assets/icons/spectator.png" alt="" width="30"></button></router-link>
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