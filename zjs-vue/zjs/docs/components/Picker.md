# Picker（选择器）

> **Todo：**  
>
> - 优化底层逻辑和PickerList组件，以更好的实现其他功能，如：循环滚动。
>
> - 更好的设计 `dataEventsList` api 的作用，在级联选和非级联选下表现不同的功能。
>
> - 添加 head 插槽和 li 插槽。

## Attr（属性）

### `title`

选择器的标题，默认值 `"请选择"`

### `labelkey`

传递给每个列表展示的值可以是 `string|number|object`。当传递对象时，你需要指定哪个键的值作为展示用，该值指定了这个键名，默认值 `label`。

### `cols`

选择器的列数。默认值 `1`，即单列。

### `cascade`

是否开启级联选，默认`false`。

### `data`

选择器需要的数据。根据是否开启级联选，数据结构也有所不同。  

> 注意，你的列数不能比数据的级数多。  

若开启级联选，结构至少应满足 `Array<label:string,children:Array<>>`，`children` 定义了它下一级的数据。  

若不开启级联选，结构应为 `Array<Array<string|number|object>>`，数组的每一项定义了每一列的数据。

### `dataEventsList`

开启异步加载数据模式。每一项函数都定义了如何获取对应列数据，同时函数接收上一列选中的值。函数的返回值 是符合条件的列数据，也可以是一个 `promise`。

## Events（事件）

### `onOK(value)`

点击确定时，触发的回调函数，该函数接受选中的值作为参数。

### `onChange(val,indexArr,deep)`

每一列选中的值发生变化时。该函数可能会触发多次。

## Slot（插槽）

### `default` 默认

触发选择器的元素。
