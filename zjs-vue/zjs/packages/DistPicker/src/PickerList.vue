<template>
  <div class="su-list" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="su-picker-mask"></div>
    <div class="su-picker-select"></div>
    <ul
      class="su-list-ul"
      :style="{
        transform: 'translate3d(0px,'+moveHeight + 'px,0px)',
        transition: isScroll?'all .3s cubic-bezier(0,0,0.2,1.15)':''
        }"
    >
      <li
        v-for="(list,index) in lists"
        :key="index"
      >{{typeof list === "string"?list:list[labelKey]}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "zjs-pickerlist",
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    deep: {
      type: Number,
      default: 0
    },
    labelKey: {
      type: String,
      default: "label"
    },
    value: {
      type: Array,
      default: () => []
    },
    indexArr: {
      type: Array,
      default: () => []
    },
    whoIsZero: {
      type: Number,
      default: -1
    }
  },
  data() {
    let liHeight = 36;
    let moveHeight = 0;
    const valIndex = this.lists.indexOf(this.value[this.deep]);
    if (valIndex > -1) {
      moveHeight = -this.lists.indexOf(this.value[this.deep]) * liHeight;
    }
    return {
      liHeight,
      start: 0,
      end: true,
      preHeight: moveHeight,
      moveHeight,
      isScroll: false
    };
  },
  computed: {
    index() {
      return Math.abs(parseInt(this.moveHeight / this.liHeight, 10));
    }
  },
  watch: {
    moveHeight: function(val) {},
    // lists 变化时，滚动归零
    lists(newval, oldval) {
      // this.emitChange();
    },
    indexArr(val) {
      // this.emitChange();
    },
    index(newval, oldval) {
      // 触发change事件
      this.emitChange();
    },
    // 监听自己需不要滚动到0
    whoIsZero(val) {
      if (this.deep === val) {
        this.moveHeight = 0;
        this.preHeight = 0;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.emitChange();
    });
  },
  methods: {
    initChange() {},
    emitChange() {
      // 选中的值列表
      let val = [...this.value];
      // 选中的值的索引列表
      let IndexArr = [...this.indexArr];
      val[this.deep] = this.lists[this.index];
      IndexArr[this.deep] = this.index || 0;
      this.$emit("update:value", val);
      this.$emit("update:indexArr", IndexArr);
      this.$emit(
        "change",
        JSON.parse(JSON.stringify(val)),
        IndexArr,
        this.deep
      );
    },
    getPageY(e) {
      if (
        status !== "11" &&
        this.direction === "vertical" &&
        !(parseInt(status, 2) & parseInt(direction, 2)) &&
        e.cancelable
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
      let y = e.changedTouches[0].pageY;
      let x = e.changedTouches[0].pageX;
      return { y, x };
    },
    touchstart(e) {
      let { y } = this.getPageY(e);
      this.start = y;
      this.end = false;
    },
    touchmove(e) {
      let { y } = this.getPageY(e);
      this.moveHeight = y - this.start + this.preHeight;
    },
    touchend(e) {
      if (this.moveHeight > 0) {
        this.moveHeight = 0;
      }
      if (this.moveHeight < -(this.lists.length - 1) * this.liHeight) {
        this.moveHeight = -(this.lists.length - 1) * this.liHeight;
      }
      this.scroll();
      this.end = true;
      this.preHeight = this.moveHeight;
    },
    // 滚动调整
    scroll(e) {
      let res = Math.abs(this.moveHeight % this.liHeight);
      // 添加滚动调整动画
      this.isScroll = true;
      // 计算需要调整的滚动距离
      if (res !== 0 && res > this.liHeight / 2) {
        this.moveHeight = this.moveHeight - (this.liHeight - res);
      } else if (res !== 0) {
        this.moveHeight = this.moveHeight + res;
      }
      setTimeout(() => {
        this.isScroll = false;
      }, 300);
    }
  }
};
</script>
<style>
.su-list {
  height: 258px;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  flex-basis: 1;
}
.su-list ul {
}

.su-list li {
  text-align: center;
  height: 36px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.su-list-ul {
  padding: 111px 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  position: absolute;
}
.su-picker-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.95),
      hsla(0, 0%, 100%, 0.6)
    ),
    linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
  background-repeat: no-repeat;
  background-position: top, bottom;
  background-size: 100% 110px;
  z-index: 3;
}
.su-picker-select {
  position: absolute;
  height: 34px;
  width: 100%;
  top: 111px;
  z-index: 3;
  border-bottom: 1px #ededed solid;
  border-top: 1px #ededed solid;
}
</style>
