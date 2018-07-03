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
    <div :class="['settings', 'container', { visible: settings }]">
      <Tabs>
        <Tab name="label">
          <p>Label</p>
        </Tab>
        <Tab name="color">
          <swatches v-model="node.color" :inline="true" show-fallback>
            <input slot="trigger" :value="node.color" class="form__input__element">
          </swatches>
        </Tab>
        <Tab name="shape" class="shapes">
          <button class="shape-btn" v-for="(shape, index) in shapes" :key="index" @click="updateNodeShape(shape)">{{ shape }}</button>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import 'vue-swatches/dist/vue-swatches.min.css'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import Swatches from 'vue-swatches'
import vis from 'vis'
import { mapState } from 'vuex'

export default {
  name: 'network',
  components: { Tabs, Tab, Swatches },
  computed: {
    ...mapState(['nodes', 'edges', 'name'])
  },
  data () {
    return {
      dataset: {
        nodes: undefined,
        edges: undefined
      },
      shapes: ['ellipse', 'circle', 'database', 'box', 'text', 'diamond', 'dot', 'star', 'triangle', 'hexagon', 'square'],
      node: {
        selected: undefined,
        color: '#D2E5FF',
        shape: 'ellipse'
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
      this.addNetworkListeners()
    },
    addNetworkListeners () {
      this.$network.on('selectNode', (event) => {
        const nodeId = event.nodes[0]
        this.settings = true
        this.node.selected = this.nodes.find(({ id }) => id === nodeId)
      })
      this.$network.on('deselectNode', () => {
        this.settings = false
      })
    },
    updateNodeShape (shape) {
      this.node.selected = { ...this.node.selected, shape }
      this.dataset.nodes.update(this.node.selected)
    }
  },
  watch: {
    'node.color': function () {
      this.node.selected = { ...this.node.selected, color: this.node.color }
      this.dataset.nodes.update(this.node.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #3498db;
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}
header .action:nth-of-type(1) {
  margin-right: 10px;
}
#canvas {
  height: 100vh;
}
.settings {
  bottom: 0;
  display: none;
  position: sticky;
  z-index: 100;
}
.settings.visible {
  display: block;
}
.shapes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 20px;
}
.shape-btn {
  background: #2e86ab;
  border-radius: 2px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  padding: 10px 15px;
}
</style>
