<script setup>
import Nav from '@/views/Nav/index.vue'
import Footer from '@/views/Footer/index.vue'
import { RouterView } from 'vue-router';
</script>

<template>
    <Nav></Nav>
    <RouterView />
    <Footer></Footer>
</template>

<style scoped></style>
