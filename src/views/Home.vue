<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>You Spent:</small>
        <div class="money">R$ 120,00</div>
        <small>In purchases</small>
      </div>
      <div class="col-6 home-box">
        <small>The average expenditure is:</small>
        <div class="money">R$ 12,00</div>
      </div>
      <div class="col-6 home-box">
        <small>The largest expense was:</small>
        <div class="money">R$ 90,00</div>
        <small>On 12/07/2020</small>
      </div>
      <div class="col-6 home-box">
        <small>The lowest expense was:</small>
        <div class="money">R$ 4,00</div>
        <small>On 10/07/2020</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      expenses: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()

        console.log(Object.keys(values).map(i => values[i]))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .home-box {
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30pt;
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
      margin: 8px;
    }
    border: 1px solid var(--dark-medium);
    &:nth-child(2), &:nth-child(4) {
      border-left: none;
    }
    &:nth-child(3), &:nth-child(4) {
      border-top: none;
    }
  }
}
</style>
