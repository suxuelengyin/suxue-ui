import DistPicker from './DistPicker'

const components = [
    DistPicker
]

function install(Vue) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}

export {
    install,
    DistPicker,
}
export default {
    install,
    DistPicker,
}