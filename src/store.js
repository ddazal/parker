import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    edges: [],
    name: ''
  },
  mutations: {
    setNodes (state, nodes) {
      state.nodes = nodes
    },
    setEdges (state, edges) {
      state.edges = edges
    },
    setName (state, name) {
      state.name = name
    }
  }
})
