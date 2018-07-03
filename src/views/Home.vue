<template>
  <div id="home">
    <header class="column v-centered header">
      <div class="container">
        <h1 class="header__title">Parker</h1>
        <h3 class="header__subtitle">Build and share your own networks</h3>
      </div>
    </header>
    <div class="search">
      <input
        type="text"
        placeholder="Google spreadsheet URL"
        ref="search"
        @click="select"
        @keyup.enter="getData"
        v-model="key"
        autofocus
      />
      <div class="spinner" v-if="loading">
        <ball-clip-rotate-loader color="#f5f749" size="20" />
      </div>
    </div>
    <div class="container">
      <p>README</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import fetchSpreadsheet from '@/services'

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      key: ''
    }
  },
  methods: {
    ...mapMutations(['setNodes', 'setEdges']),
    select () {
      this.$refs.search.select()
    },
    async getData () {
      this.loading = true
      const spreadsheet = await fetchSpreadsheet(this.key)
      const nodes = spreadsheet.sheets('nodes').all()
      const edges = spreadsheet.sheets('edges').all()
      this.setNodes(nodes)
      this.setEdges(edges)
      this.loading = false
      this.$router.push('network')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #2c3e50;
  background: linear-gradient(to left, #3498db, #2c3e50);
  color: white;
  min-height: 25vh;
}

.header__title {
  font-weight: 300;
  margin: 0 0 15px;
}

.header__subtitle {
  font-weight: 300;
  margin: 0;
}

.search {
  margin: 25px auto;
  position: relative;
  width: 90%;
}

.search input {
  border-radius: 2px;
  border: none;
  box-shadow: 0 0 5px;
  display: block;
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  padding: 15px 10px;
  transition: box-shadow .25s;
  width: 100%;
}

.search input:focus {
  box-shadow: 0 0 8px;
}

.spinner {
  background: white;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

@media screen and (min-width: 76p8px) {
  .search {
    width: 80%;
  }
}
</style>
