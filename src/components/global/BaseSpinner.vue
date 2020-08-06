<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: 'BaseSpinner',

  data () {
    return {
      visible: false
    }
  },

  created () {
    this.$root.$on('Spinner::change', this.changeSpinner)
  },

  methods: {
    changeSpinner () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/app.scss';

.base-spinner {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 1000000;

  position: absolute;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: $dark;
  color: $featured;
}
</style>
