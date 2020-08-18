<template>
  <div id="app">
    <base-spinner />
    <layout-notification />

    <div class="container-fluid" v-if="islogged">
      <div class="row">

        <div class="col-2 navigation-sidebar">
          <h2 class="app-title">Xpenses</h2>
          <layout-navigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutNotification from './components/layout/LayoutNotification'

export default {
  name: 'App',

  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification
  },

  data () {
    return {
      islogged: false
    }
  },

  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.islogged = !!user

      this.$router.push({
        name: window.uid ? 'home' : 'login'
      })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--dark);
  color: var(--light);
  .navigation-sidebar {
    background-color: var(--darker);
    .app-title {
      font-size: 20px;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
