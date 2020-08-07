<template>
  <form class="form-login">
    <div class="card">
    <img src="../../assets/xpenses.png" alt="Xpenses">
      <div class="card-body">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" placeholder="Password">
        </div>
        <button class="btn btn-primary btn-block">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {

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
