import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    edges: [],
    name: '',
    defaults: {
      nodes: {
        color: '#D2E5FF',
        shape: 'circle',
        font: {
          color: '#343434',
          size: 14
        }
      },
      edges: {
        arrowStrikethrough: false,
        arrows: {
          from: false,
          to: true
        },
        color: {
          color: '#848484'
        }
      }
    }
  },
  mutations: {
    setNodes (state, nodes) {
      state.nodes = nodes.map(node => ({ ...state.defaults.nodes, ...node }))
    },
    setEdges (state, edges) {
      state.edges = edges.map(edge => ({ ...state.defaults.edges, ...edge }))
    },
    setName (state, name) {
      state.name = name
    }
  }
})
