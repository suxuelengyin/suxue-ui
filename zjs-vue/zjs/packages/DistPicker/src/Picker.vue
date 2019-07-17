<template>
  <transition name="zjs-distpicker">
    <div class="su-distPicker" v-if="opened" v-show="visible">
      <div class="su-pickerWrap" @click="close"></div>
      <div class="su-picker">
        <div class="su-banner">
          <span class="su-pre" @click="close">取消</span>
          <span>{{title}}</span>
          <span class="su-cancel" @click="ok">确认</span>
        </div>
        <div class="su-listDiv">
          <PickerList
            @change="change"
            v-for="(item, index) in new Array(cols)"
            :key="index"
            :deep="index"
            :indexArr.sync="indexArr"
            v-bind="$props"
            :data="data"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import PickerList from "./PickerList";
export default {
  name: "zjs-pickerpop",
  components: { PickerList },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: "label"
    },
    title: {
      type: String,
      default: "请选择"
    },
    dataEventsList: {
      type: Array,
      default: () => []
    },
    cols: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      default: () => ["暂无数"]
    },
    data: {
      type: Array,
      default: () => []
    },
    cascade: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      step: 0,
      val: this.value || [],
      opened: false,
      indexArr: new Array(this.cols).fill(0)
    };
  },
  computed: {},
  methods: {
    init() {},
    ok() {
      this.$emit("onOk", this.value);
      this.close();
    },
    close() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    },
    change(val, index, selectIndex) {
      this.value.splice(0, this.value.length, ...this.val);
      this.$emit("onChange", val, index, selectIndex);
    }
  },
  created() {},
  watch: {
    visible(val) {
      if (val) {
        // 已经打开过，只需要隐藏，v-if不起作用
        this.opened = true;
        this.closed = false;
        this.$emit("open");
      } else {
      }
    },
    // 设置哪一列需要滚动到0
    indexArr(newVal, oldVal) {}
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  }
};
</script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.su-picker {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  height: 300px;
  background-color: #ffffff;
  transition: height 0.5s;
}

.su-distPicker {
}
.su-listDiv {
  display: flex;
  flex-flow: row nowrap;
}
.su-banner {
  position: relative;
  text-align: center;
  color: #576b95;
  background-color: #ffffff;
  padding: 10px 8px;
  border-bottom: 1px #ededed solid;
}
.su-pickerWrap {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
}

.su-pickerWrapIn {
  animation: fadeIn ease 0.3s forwards;
}

.su-pickerWrapOut {
  animation: fadeOut ease 0.3s forwards;
}

.su-pre {
  position: absolute;
  left: 8px;
}

.su-cancel {
  position: absolute;
  right: 8px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>