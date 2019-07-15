<template>
  <div>
    <div @click.stop="toggle">
      <slot></slot>
    </div>
    <Picker v-bind="$props" v-on="$listeners" :visible.sync="visible" />
  </div>
</template>
<script>
import Picker from "./Picker";
import { promiseCallback } from "./utils";
export default {
  name: "zjs-picker",
  components: {
    Picker
  },
  props: {
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
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    cascade: {
      type: Boolean,
      default: true
    },
    cols: {
      type: Number,
      default: 3
    },
    value: {
      type: Array,
      default: function() {
        return new Array(this.cols).fill(0);
      }
    }
  },
  data: function() {
    return {
      visible: false
    };
  },
  created() {
    if (this.cascade) {
      promiseCallback(this.dataEventsList[0](), data => {
        this.$emit("update:data", data);
      });
    }
  },
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
  }
};
</script>