<template>
  <div class="w-100 d-flex justify-content-center">
    <button class="btn btn-lg btn-outline-primary w-75" @click="changeModal(true)">
      <i class="fa fa-plus"></i>
      New Expense
    </button>

    <form @submit.prevent="submit()">
      <!-- Modal Content -->
      <div class="modal fade"
        :style="{ display: modalDisplay }"
        :class="{ show: showModal }"
        style="display: block; padding-right: 17px;"
        >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add a new expense</h5>
              <button type="button" class="close" @click="changeModal(false)">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="">Description</label>
                  <input class="form-control" type="text" v-model="form.description" required>
                </div>
                <div class="form-group col-4">
                  <label for="">Value</label>
                  <input class="form-control" type="text" v-model="form.value" required>
                </div>
            </div>
              <p class="text text-muted">Add a brief description accompained by the expense value</p>
            </div>
            <div class="modal-footer">
              <button type="button"
                class="btn btn-secondary"
                @click="changeModal(false)"
                >
                  Close
              </button>
              <button class="btn btn-primary">
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- Background fade -->
    <div
      class="modal-backdrop fade"
      :style="{ display: modalDisplay }"
      :class="{ show: showModal }"
    ></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      modalDisplay: 'none',

      form: {
        description: '',
        value: ''
      }
    }
  },

  methods: {
    changeModal (value) {
      this.showModal = value
      this.modalDisplay = value ? 'block' : 'none'
    },

    submit () {
      this.$root.$emit('Spinner::show')

      const ref = this.$firebase.database().ref(window.uid)
      const id = ref.push().key

      const payload = {
        id,
        receipt: null,
        value: this.form.value,
        createdAt: new Date().getTime(),
        description: this.form.description
      }

      ref.child(id).set(payload, err => {
        this.$root.$emit('Spinner::hide')

        if (err) {
          console.error(err)
        } else {
          this.changeModal(false)
        }
      })

      this.form.description = ''
      this.form.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
