<template>
  <div id="app">
    <Picker
      @onChange="onChange"
      @onOk="ok"
      labelKey="name"
      title="请选择"
      :cols="cols"
      :cascade="false"
      :data.sync="data"
    >
      <button>{{val}}</button>
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
    let data = [[1, 1, 1, 1], [2, 2, 2, , 2], [3, 3, 4, 3, 3]];
    return {
      data,
      visible: false,
      cols: 3,
      dataEventList: [
        () =>
          fetch("https://dev.zijinshe.com/cms/weixin/zjs/getProvinces")
            .then(res => res.json())
            .then(data => data),
        value =>
          fetch(
            `https://dev.zijinshe.com/cms/weixin/zjs/getCity?cityNum=${value.regionCode}`
          )
            .then(res => res.json())
            .then(data => data),
        value =>
          fetch(
            `https://dev.zijinshe.com/cms/weixin/zjs/getArea?areaNum=${value.regionCode}`
          )
            .then(res => res.json())
            .then(data => data),
        () => [1, 1, 1, 1, 1, 2, 1, 1, 1]
      ],
      val: "选择器"
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    ok(value) {
      this.val = value.join(',')
    },
    onChange(val, indexArr, deep) {
      console.log(val, indexArr, deep);
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
