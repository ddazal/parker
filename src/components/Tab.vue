<template>
  <div v-show="selected">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    },
    active: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      selected: false
    }
  },
  created () {
    this.selected = this.active
  }
}
</script>
