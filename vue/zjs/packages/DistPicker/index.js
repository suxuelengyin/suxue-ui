import DistPicker from './src';

/* istanbul ignore next */
DistPicker.install = function(Vue) {
  Vue.component(DistPicker.name, DistPicker);
};

export default DistPicker;