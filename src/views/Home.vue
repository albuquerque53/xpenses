<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>You Spent:</small>
        <div class="money" v-currency-format="totals.totalSpent" />
        <small>In purchases</small>
      </div>
      <div class="col-6 home-box">
        <small>The average expenditure is:</small>
        <div class="money" v-currency-format="totals.average" />
      </div>
      <div class="col-6 home-box">
        <small>The largest expense was:</small>
        <div class="money" v-currency-format="totals.largest.value" />
        <small v-date-format="totals.largest.createdAt" />
      </div>
      <div class="col-6 home-box">
        <small>The lowest expense was:</small>
        <div class="money" v-currency-format="totals.lowest.value" />
        <small v-date-format="totals.lowest.createdAt" />
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

  computed: {
    totals () {
      const { expenses: exp } = this
      const values = {
        totalSpent: 0,
        average: 0,
        largest: {},
        lowest: {}
      }

      if (exp.length) {
        values.totalSpent = exp.map(e => +e.value)
          .reduce((acc, cur) => acc + cur, 0)

        values.average = values.totalSpent / exp.length

        values.largest = exp.sort((a, b) => +b.value - +a.value)[0]
        values.lowest = exp.sort((a, b) => +a.value - +b.value)[0]
      }

      return values
    }
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()

        this.expenses = Object.keys(values).map(i => values[i])
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
      font-size: 1.2rem;
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
