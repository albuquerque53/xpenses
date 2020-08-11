<template>
  <div>
    <nav class="nav flex-column">
      <router-link
        exact
        exact-active-class="active"
        class="nav-link"
        v-for="(route, index) in routerLinks"
        :key="index"
        :to="{ name: route.name }"
      >
        <i class="fa" :class="`fa-${route.meta.icon}`"></i>
        {{ route.meta.title }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(route => route.name !== 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh - 49px);
  .nav-link {
    color: var(--white);
    transition: .2s;
    &.active {
      color: var(--featured);
      font-weight: bold;
      background-color: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}
</style>
