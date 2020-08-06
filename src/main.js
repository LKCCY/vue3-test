import { createApp, ref, h  } from '../runtime-dom/src/index'

const mountApp = createApp({
  setup () {
    const count = ref(10)
    const add = () => { count.value++ }
    return () => h('button', {
      onclick: add
    }, count.value)
  }
})
mountApp.mount('#app')

// 基础`
// createApp({
//   data () {
//     return {
//       count: 1
//     }
//   },
//   render () {
//     return h('button', {
//       onclick: () => { this.count++ }
//     },this.count)
//   }
// }).mount('#app')

