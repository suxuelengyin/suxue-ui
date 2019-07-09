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
      default: () => [() => false, () => false]
    },
    data: {
      type: Array,
      default: () => []
    },
    cols: {
      type: Number,
      default: 3
    },
    val: {
      type: Array,
      default: () => ["暂无数"]
    }
  },
  data: function() {
    return {
      visible: false
    };
  },
  created() {},
  mounted() {
      console.log(this.$props)
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    }
  }
};
</script>