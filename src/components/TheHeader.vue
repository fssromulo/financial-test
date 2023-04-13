<template>
    <header>
        <nav>
            <h1><router-link to="/discovery">App</router-link></h1>
            <ul>
                <li @click="logout">Logout</li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
function logout() {
    store.dispatch('logout');
    router.replace('/auth');
}
</script>

<style scoped>
header {
    width: 100%;
    height: 5rem;
    background-color: #5e7de9;
    display: flex;
    justify-content: center;
    align-items: center;
}

header a {
    text-decoration: none;
    color: #3854b8;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
    border: 1px solid #3854b8;
}

h1 {
    margin: 0;
}

h1 a {
    color: white;
    margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
    border-color: transparent;

}

header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

ul>li {
    margin: 0 0.5rem;
    cursor: pointer;
    color: white
}
</style>
