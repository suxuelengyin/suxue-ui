<template>
  <div>
    <div @click.stop="toggle">
      <slot></slot>
    </div>
    <Picker :visible.sync="visible" title="请选择" />
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
      
  },
  data: function() {
    return {
      visible: false
    };
  },
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    }
  }
};
</script>