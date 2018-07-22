<template>
  <div class="colors">
    <div
      v-for="(color, index) in colors[theme]"
      :key="index"
      :class="['color', { bordered: theme === 'shades' }]"
      :style="{ background: color }"
      @click="onclick(color)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    onclick: {
      type: Function,
      required: true
    },
    theme: {
      type: String,
      default: 'material'
    }
  },
  data () {
    return {
      colors: {
        material: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
        shades: ['#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FAFAFA']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  grid-gap: 5px;
}

.color {
  border-radius: 20px;
  cursor: pointer;
  height: 40px;
  width: 40px;
}

input {
  box-shadow: 0 0 2px;
  margin: 10px 0 0;
  width: 50%;
  padding: 5px 5px;
}
</style>
