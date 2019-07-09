<template>
  <div id="app">
    <Picker
      @onChange="onChange"
      labelKey="name"
      title="请选择地区"
      :cols="cols"
      :data="data"
      data-event-list="dataEventList"
    >
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
    let data = [];
    return {
      data,
      visible: false,
      cols: 1
    };
  },
  created() {
    fetch("https://dev.zijinshe.com/cms/weixin/zjs/getProvinces")
      .then(res => res.json())
      .then(data => {
        this.data = data;
        console.log(data);
      });
  },
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    onChange(val, index, deep) {
      const value = val[deep];
      if (deep === 0 && !this.data[index].children) {
        fetch(
          `https://dev.zijinshe.com/cms/weixin/zjs/getCity?cityNum=${value.regionCode}`
        )
          .then(res => res.json())
          .then(data => {
            const list = this.data[index];
            list.children = data;
            this.$set(this.data, index, list);
            this.cols = 2;
          });
      }
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
