<template>
    <div class="title"><h1>Board</h1><p><mark class="alternative">{{ this.$route.name }}</mark></p></div>
    <a class="back" @click="goBack"><img src="../assets/icons/arrow.png" alt="" width="30">Back</a>
</template>

<script>
    export default {
    name: 'Board-View',
    methods: {
        goBack() {
        this.$router.go(-1);
        },
    },
    };
</script>

<style scoped>
</style>