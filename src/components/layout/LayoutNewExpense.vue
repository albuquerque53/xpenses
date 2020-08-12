<template>
  <div class="w-100 d-flex justify-content-center">
    <button class="btn btn-lg btn-outline-primary w-75" @click="changeModal(true)">
      <i class="fa fa-plus"></i>
      New Expense
    </button>

    <!-- Modal Content -->
    <div class="modal fade"
      :style="{ display: modalDisplay }"
      :class="{ show: showModal }"
      style="display: block; padding-right: 17px;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="changeModal(false)">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Woohoo, you're reading this text in a modal!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="changeModal(false)">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
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
      modalDisplay: 'none'
    }
  },

  methods: {
    changeModal (value) {
      this.showModal = value
      this.modalDisplay = value ? 'block' : 'none'
    }
  }
}
</script>

<style>
</style>
