<template>
  <div id="app">
    <BaseSpinner />
    <router-view />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'

export default {
  name: 'App',

  components: {
    BaseSpinner
  },

  methods: {
    showSpinner () {
      this.$root.$emit('Spinner::change')
    }
  },

  mounted () {
    console.log(this.$firebase)
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--dark);
  color: var(--light);
}
</style>
