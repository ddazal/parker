<template>
  <div id="network">
    <header>
      <div class="container line justify-between v-centered">
        <p class="header-title column">
          <span>{{ name }}</span>
        </p>
        <div class="header-actions line">
          <a class="action column h-centered" title="Global settings">
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
    <!-- Node settings -->
    <div :class="['settings', 'container', { visible: settings.node }]">
      <Tabs>
        <Tab name="font">
          <ColorPicker :onclick="updateNodeFontColor" theme="shades"></ColorPicker>
        </Tab>
        <Tab name="color">
          <ColorPicker :onclick="updateNodeBackground"></ColorPicker>
        </Tab>
        <Tab name="shape" class="shapes">
          <button
            v-for="(shape, index) in shapes"
            :key="index"
            @click="updateNodeShape(shape)"
            :class="['shape-btn', { 'is-active': shape === node.selected.shape }]">
            {{ shape }}
          </button>
        </Tab>
      </Tabs>
    </div>
    <!-- Edge settings -->
    <div :class="['settings', 'container', { visible: settings.edge }]">
      <Tabs>
        <Tab name="label">
          <p>Label</p>
        </Tab>
        <Tab name="color">
          <ColorPicker :onclick="updateEdgeColor"></ColorPicker>
        </Tab>
        <Tab name="arrow">
          <div class="line v-centered">
            <p>Show arrow to</p>
            <toggle-button
              :value="edge.selected.arrows.to"
              :labels="{ checked: 'Yes', unchecked: 'No' }"
              @change="updateArrowTo"
            ></toggle-button>
          </div>
          <div class="line v-centered">
            <p>Show arrow from</p>
            <toggle-button
              :value="edge.selected.arrows.from"
              :labels="{ checked: 'Yes', unchecked: 'No' }"
              @change="updateArrowFrom"
            ></toggle-button>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import vis from 'vis'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'network',
  components: { Tabs, Tab, ColorPicker },
  computed: {
    ...mapState(['nodes', 'edges', 'name']),
    nodeSelectedFontColor () {
      return this.node.selected ? this.node.selected.font.color : '#343434'
    }
  },
  data () {
    return {
      dataset: {
        nodes: undefined,
        edges: undefined
      },
      shapes: ['ellipse', 'circle', 'database', 'box', 'text', 'diamond', 'dot', 'star', 'triangle', 'hexagon', 'square'],
      settings: {
        node: false,
        edge: false
      },
      node: {
        selected: undefined
      },
      edge: {
        selected: undefined
      }
    }
  },
  created () {
    if (!this.nodes.length || !this.edges.length) {
      this.$router.push('/')
    }
    this.dataset.nodes = new vis.DataSet(this.nodes)
    this.dataset.edges = new vis.DataSet(this.edges)
    this.node.selected = this.nodes[0] // Initialize selected node with any value
    this.edge.selected = this.edges[0] // Initialize selected edge with any value
  },
  mounted () {
    this.createNetwork()
  },
  methods: {
    ...mapMutations(['setNodes']),
    createNetwork () {
      const data = {
        nodes: this.dataset.nodes,
        edges: this.dataset.edges
      }
      const canvas = document.getElementById('canvas')
      window.$network = new vis.Network(canvas, data, {})
      this.addNetworkListeners()
    },
    addNetworkListeners () {
      window.$network.on('click', event => {
        const nodeId = event.nodes[0]
        const edgeId = event.edges[0]
        if (nodeId) {
          this.settings.edge = false
          this.settings.node = true
          this.node.selected = this.dataset.nodes.get(nodeId)
        } else if (edgeId) {
          this.settings.node = false
          this.settings.edge = true
          this.edge.selected = this.dataset.edges.get(edgeId)
        } else {
          this.settings.node = false
          this.settings.edge = false
        }
      })
    },
    updateNodeFontColor (color) {
      const node = Object.assign(this.node.selected, { font: { color } })
      this.dataset.nodes.update(node)
    },
    updateNodeBackground (color) {
      const node = Object.assign(this.node.selected, { color })
      this.dataset.nodes.update(node)
    },
    updateNodeShape (shape) {
      const node = Object.assign(this.node.selected, { shape })
      this.dataset.nodes.update(node)
    },
    updateEdgeColor (color) {
      const edge = Object.assign(this.edge.selected, { color: { color, highlight: color } })
      this.dataset.edges.update(edge)
    },
    updateArrowTo (state) {
      const edge = Object.assign(this.edge.selected, { arrows: { to: state.value } })
      this.dataset.edges.update(edge)
    },
    updateArrowFrom (state) {
      const edge = Object.assign(this.edge.selected, { arrows: { from: state.value } })
      this.dataset.edges.update(edge)
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

input {
  box-shadow: 0 0 2px;
  transition: box-shadow 0.25s;
  &:focus {
    box-shadow: 0 0 4px;
  }
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

.tab-field__label {
  margin: 5px 5px 5px 0;
}

.tab-field__input {
  box-shadow: 0 0 2px;
  font-size: 16px;
  margin: 5px 5px 5px 0;
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
  position: relative;
  transition: all .25s linear;
  &:hover {
    background: rgb(66, 154, 191);
  }
  &.is-active {
    background: #f6f5ae;
    color: #2c3e50;
  }
}
</style>
