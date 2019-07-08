<template>
  <div id="app">
    <Picker>
        <button>地区选择器</button>
    </Picker>
  </div>
</template>

<script>
import Picker from "../packages/DistPicker";

export default {
  name: "app",
  components: {
    Picker
  },
  data: function() {
    return {
      visible: false
    };
  },
  methods: {
    toggle() {
      console.log(111);
      this.visible = !this.visible;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
