<template>
  <div id="app">
    <BaseSpinner />
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
  }
}
</script>

<style lang="scss">

</style>
