<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/gh/ddazal/align.css/dist/align.min.css');
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:300,400');

*,
*:before,
*:after {
  box-sizing: inherit;
  outline: none;
}

html,
body {
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

input {
  border-radius: 2px;
  border: none;
  box-shadow: 0 0 5px;
  font-family: 'Fira Sans', sans-serif;
}

#app {
  min-height: 100%;
}

.container {
  margin: 0 auto;
  width: 90%;
}
</style>
