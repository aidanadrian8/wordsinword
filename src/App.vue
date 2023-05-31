<template>
  <NavBar @wordLength="setWordLength"/>
  <GamePage :wordLength="this.wordLength"/>
</template>

<script>
import GamePage from './components/GamePage.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    GamePage,
    NavBar
  },
  data() {
    return {
      wordLength: "default"
    }
  },
  methods: {
    setWordLength(value){
      this.wordLength = Number(value);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
