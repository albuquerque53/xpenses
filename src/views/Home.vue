<template>
  <div class="home">
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

        this.expenses = values
        console.log(this.expenses)
      })
    }
  }
}
</script>
