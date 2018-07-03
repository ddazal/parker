<template>
  <div class="tabs">
    <ul class="tabs-list line">
      <li v-for="(tab, index) in tabs" :key="index" :class="['tab', { 'is-active': selected === index }]">
        <a @click.prevent="selectTab({ tab, index })">{{ tab.name | titleCase }}</a>
      </li>
    </ul>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      tabs: [],
      selected: 0
    }
  },
  methods: {
    selectTab (info) {
      const { tab, index } = info
      this.selected = index
      this.tabs.forEach(t => {
        t.selected = t.name === tab.name
      })
    }
  },
  created () {
    this.tabs = this.$children
    this.selected = this.active
  },
  filters: {
    titleCase (str) {
      if (!str) return
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #ffffff;
  box-shadow: 0 0 2px;
}

.tabs-list {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.tabs-content {
  border-top: 1px solid #f0f0f0;
  padding: 10px 20px;
}

.tab {
  background: white;
  border-top: 2px solid transparent;
  transition: all .25s;
}

.tab a {
  color: #2c3e50;
  cursor: pointer;
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  transition: all .25s;
}

.tab:hover {
  background: #f0f0f0;
}

.tab.is-active {
  background: #f0f0f0;
  border-top-color: #2c3e50;
}

.tab.is-active a {
  cursor: not-allowed;
}
</style>
