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
                <div class="form-group col-12 d-flex flex-column align-items-center">
                  <input type="file" class="d-none" accept="image/*" ref="input" @change="handleFile($event)">
                  <button type="button" class="btn w-50 btn-outline-secondary" @click="openFileDialog()">
                    Receipt
                  </button>
                  <div v-if="form.receipt" class="mt-2">
                    {{ form.receipt.name }}
                    <button class="btn badge badge-light" @click="form.receipt = ''">
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>
            </div>
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
        value: '',
        receipt: ''
      }
    }
  },

  computed: {
    fileName () {
      const { receipt } = this.form

      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },

  methods: {
    changeModal (value) {
      this.showModal = value
      this.modalDisplay = value ? 'block' : 'none'
    },

    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },

    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },

    async submit () {
      let url = ''

      try {
        this.$root.$emit('Spinner::show')

        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this
            .$firebase
            .storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(payload, err => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Oops! There was a problem, please try again'
            })
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Successfully added!'
            })
            this.changeModal(false)
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Oops! There was a problem, please try again'
        })
      } finally {
        this.$root.$emit('Spinner::hide')
      }

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
