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
      cols: 3
    };
  },
  created() {
    fetch("https://dev.zijinshe.com/cms/weixin/zjs/getProvinces")
      .then(res => res.json())
      .then(data => {
        this.data = data;
      });
  },
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    onChange(val, indexArr, deep) {
      console.log(val, indexArr, deep);
      let value = val
      let datas = [...this.data]
    //   for (let i = 0; i < this.cols; i++) {
    //     if (!this.data[indexArr[i]].children) {
    //       fetch(
    //         `https://dev.zijinshe.com/cms/weixin/zjs/getCity?cityNum=${val[i].regionCode}`
    //       )
    //         .then(res => res.json())
    //         .then(data => {
    //           const list = this.data[indexArr[0]];
    //           list.children = data;
    //           this.$set(this.data, indexArr[0], list);
    //           this.cols = 2;
    //         });
    //     }
    //   }
      //   if (!this.data[indexArr[0]].children) {
      //     fetch(
      //       `https://dev.zijinshe.com/cms/weixin/zjs/getCity?cityNum=${value.regionCode}`
      //     )
      //       .then(res => res.json())
      //       .then(data => {
      //         const list = this.data[indexArr[0]];
      //         list.children = data;
      //         this.$set(this.data, indexArr[0], list);
      //         this.cols = 2;
      //       });
      //   }
      //   console.log(!this.data[indexArr[0]].children[indexArr[1]].children)
      //   if (
      //     !this.data[indexArr[0]].children[indexArr[1]].children
      //   ) {
      //     fetch(
      //       `https://dev.zijinshe.com/cms/weixin/zjs/getArea?areaNum=${val[1].regionCode}`
      //     )
      //       .then(res => res.json())
      //       .then(data => {
      //         const list = this.data[indexArr[0]];
      //         list.children[indexArr[1]].children = data;
      //         console.log(list);
      //         this.$set(this.data, indexArr[0], list);
      //         this.cols = 3;
      //       });
      //   }
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
