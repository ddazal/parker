<template>
  <div id="network">
    <header>
      <div class="container line justify-between v-centered">
        <p class="header-title column">
          <span>{{ name }}</span>
        </p>
        <div class="header-actions line">
          <a class="action column h-centered">
            <font-awesome-icon icon="cog"></font-awesome-icon>
            <small>Settings</small>
          </a>
          <a class="action column h-centered">
            <font-awesome-icon icon="share-alt"></font-awesome-icon>
            <small>Share</small>
          </a>
        </div>
      </div>
    </header>
    <div id="canvas"></div>
    <div class="settings container">
      <Tabs>
        <template slot-scope="scoped">
          <Tab name="label">
            <p>Label</p>
          </Tab>
          <Tab name="color">
            <p>Color</p>
          </Tab>
          <Tab name="shape">
            <p>Shape</p>
          </Tab>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tabs from '@/components/Tabs'
import Tab from '@/components/Tab'
import vis from 'vis'

export default {
  name: 'network',
  components: { Tabs, Tab },
  computed: {
    ...mapState(['nodes', 'edges', 'name'])
  },
  data () {
    return {
      dataset: {
        nodes: undefined,
        edges: undefined
      },
      settings: false
    }
  },
  created () {
    this.dataset.nodes = new vis.DataSet(this.nodes)
    this.dataset.edges = new vis.DataSet(this.edges)
  },
  mounted () {
    this.createNetwork()
  },
  methods: {
    createNetwork () {
      const data = {
        nodes: this.dataset.nodes,
        edges: this.dataset.edges
      }
      const canvas = document.getElementById('canvas')
      this.$network = new vis.Network(canvas, data, {})
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #3498db;
  color: #ffffff;
}
header .action:nth-of-type(1) {
  margin-right: 10px;
}
#canvas {
  height: 100vh;
}
.settings {
  bottom: 0;
  position: sticky;
  z-index: 100;
}
</style>
