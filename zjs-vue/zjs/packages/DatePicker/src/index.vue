<template>
  <Picker
    @onChange="onChange"
    @onOk="ok"
    labelKey="name"
    title="请选择"
    :cols="cols"
    :cascade="false"
    :data.sync="dateData"
  >
    <button>{{val}}</button>
  </Picker>
</template>
<script>
import Picker from "../../DistPicker";
export default {
  name: "datepicker",
  components: {
    Picker
  },
  data: function() {
    let data = [];
    return {
      data,
      visible: false,
      cols: 6,
      month: 1,
      isLeap: false,
      dataEventList: [
        () => {
          const start = 1960;
          var date = new Date();
          var year = date.getFullYear();
          const length = year - start + 1;
          return new Array(length)
            .fill(start)
            .map((item, index) => item + index + "年");
        },
        value => new Array(12).fill(1).map((item, index) => 1 + index + "月"),
        value => {
          console.log(month);
        },
        value => new Array(24).fill(1).map((item, index) => 1 + index + "时"),
        value => new Array(60).fill(1).map((item, index) => 1 + index + "分")
      ],
      val: "时间选择器"
    };
  },
  watch: {},
  computed: {
    dateData() {
      const date = new Date();
      const start = 1960;
      const year = date.getFullYear();
      const length = year - start + 1;
      const years = new Array(length)
        .fill(start)
        .map((item, index) => item + index + "年");
      const months = new Array(12)
        .fill(1)
        .map((item, index) => 1 + index + "月");
      const days = () => {
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(Number(this.month)) > -1) {
          return new Array(31).fill(1).map((item, index) => 1 + index + "日");
        }
        switch (Number(this.month)) {
          case 2:
            return new Array(this.isLeap ? 29 : 28)
              .fill(1)
              .map((item, index) => 1 + index + "日");
          default:
            return new Array(30).fill(1).map((item, index) => 1 + index + "日");
        }
      };
      const hours = new Array(24)
        .fill(1)
        .map((item, index) => 1 + index + "时");
      const miuntes = new Array(60)
        .fill(1)
        .map((item, index) => 1 + index + "分");
      const seconds = new Array(60)
        .fill(1)
        .map((item, index) => 1 + index + "秒");
      return [years, months, days(), hours, miuntes, seconds];
    }
  },
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    ok(value) {
      this.val = value.join("");
    },
    onChange(val, indexArr, deep) {
      const month = Number(val[1].split("月")[0]);
      const isLeap = Number(val[0].split("年")[0]) % 4 === 0;
      this.month = month;
      this.isLeap = isLeap;
    }
  }
};
</script>
<style scope>
</style>
