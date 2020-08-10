<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
    <img src="../../assets/xpenses.png" alt="Xpenses">
      <div class="card-body">
        <div class="form-group">
          <input
            class="form-control"
            type="email"
            placeholder="E-mail"
            required
            v-model="email"
          >
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="password"
            placeholder="Password"
            required
            v-model="password"
          >
        </div>
        <button class="btn btn-primary btn-block">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    doLogin () {
      console.log('Submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .card {
    width: 30%;
  }
}
</style>
