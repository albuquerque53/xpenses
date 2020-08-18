<template>
  <div
    class="alert alert-warning alert-dismissible fade show"
    :class="`alert-${type}`"
    v-if="visible"
  >
    {{ message }}
    <button type="button" class="close">
      <span @click="closeNotification()">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: '',
      type: 'danger'
    }
  },

  created () {
    this.$root.$on('Notification::show', payload => {
      this.visible = true
      this.type = payload.type
      this.message = payload.message
      setTimeout(() => { this.closeNotification() }, payload.timeout || 4000)
    })
  },

  methods: {
    closeNotification () {
      this.visible = false
      this.message = ''
      this.type = 'danger'
    }
  }
}
</script>

<style scoped>
.alert {
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  position: absolute;
}
</style>
